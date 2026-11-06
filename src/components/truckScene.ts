import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

type Manifest = {
  schemaVersion: string
  modelName: string
  integrity: { algorithm: string; model: string; bytes: number }
  dimensions: { x: number; y: number; z: number; units: string }
  preferredCamera: { position: [number, number, number]; target: [number, number, number] }
  environment: { background: string; lighting: string }
}
export type TruckView = 'signature' | 'serving' | 'front'
export type TruckScene = { view: (v: TruckView) => void; zoom: (closer: boolean) => void; dispose: () => void }

/** The confirmed GLB remains unchanged; all presentation settings live in this scene. */
export async function createTruckScene(
  host: HTMLDivElement,
  signal: AbortSignal,
  reducedMotion: Pick<MediaQueryList, 'matches'>,
): Promise<TruckScene> {
  const root = `${import.meta.env.BASE_URL}models/carellas-kitchen/`
  const [manifestResponse, modelResponse] = await Promise.all([
    fetch(root + 'model-manifest.json', { signal }), fetch(root + 'model.glb', { signal }),
  ])
  if (!manifestResponse.ok || !modelResponse.ok) throw new Error('The truck could not be loaded.')
  const manifest: Manifest = await manifestResponse.json()
  const buffer = await modelResponse.arrayBuffer()
  if (manifest.schemaVersion !== '1.0' || manifest.dimensions.units !== 'meters') throw new Error('Unsupported model handoff.')
  const hash = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', buffer)), v => v.toString(16).padStart(2, '0')).join('')
  if (manifest.integrity.algorithm !== 'SHA-256' || hash !== manifest.integrity.model || buffer.byteLength !== manifest.integrity.bytes) throw new Error('Model integrity check failed.')
  const gltf = await new GLTFLoader().parseAsync(buffer, root)
  const model = gltf.scene
  const disposeModel = () => {
    const textures = new Set<THREE.Texture>()
    const materials = new Set<THREE.Material>()
    model.traverse(o => {
      if (!(o instanceof THREE.Mesh)) return
      o.geometry.dispose()
      for (const material of Array.isArray(o.material) ? o.material : [o.material]) {
        materials.add(material)
        for (const value of Object.values(material)) if (value instanceof THREE.Texture) textures.add(value)
      }
    })
    textures.forEach(t => t.dispose()); materials.forEach(m => m.dispose())
  }
  if (signal.aborted) { disposeModel(); throw new DOMException('Aborted', 'AbortError') }
  let renderer: THREE.WebGLRenderer
  try {
    // Development-only failure injection exercises the same no-WebGL fallback path.
    if (import.meta.env.DEV && new URLSearchParams(location.search).has('test-no-webgl')) throw new Error('WebGL unavailable')
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl2', { alpha: true, antialias: true, powerPreference: 'low-power' })
    if (!context) throw new Error('WebGL2 unavailable')
    renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: true })
  } catch { disposeModel(); throw new Error('Interactive 3D is unavailable on this device.') }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75))
  renderer.setClearColor(manifest.environment.background, 0) // Transparent canvas adopts the existing site's palette.
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.15
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  const canvas = renderer.domElement
  canvas.setAttribute('role', 'img')
  canvas.setAttribute('aria-label', 'Interactive Carellas Kitchen truck. Use the view and zoom buttons, or drag to rotate.')
  host.append(canvas)
  const scene = new THREE.Scene()
  scene.add(model)
  const box = new THREE.Box3().setFromObject(model)
  const center = box.getCenter(new THREE.Vector3())
  const size = box.getSize(new THREE.Vector3())
  if (box.isEmpty() || !Number.isFinite(size.length())) { renderer.dispose(); canvas.remove(); disposeModel(); throw new Error('The model contains no usable geometry.') }
  // Softbox lighting follows the confirmed presentation, warmed slightly for the brand.
  scene.add(new THREE.HemisphereLight('#fff8e9', '#617563', manifest.environment.lighting === 'Dramatic' ? 1.2 : 2.7))
  const key = new THREE.DirectionalLight('#fff2dc', 3.5)
  key.position.set(3, 9, 7); key.castShadow = true; key.shadow.mapSize.set(1024, 1024)
  Object.assign(key.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, near: .1, far: 30 })
  key.shadow.bias = -.001
  scene.add(key)
  const fill = new THREE.DirectionalLight('#d7e4e3', 2)
  fill.position.set(-5, 5, -4); scene.add(fill)
  model.traverse(o => { if (o instanceof THREE.Mesh) { o.castShadow = true; o.receiveShadow = true } })
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(35, 35), new THREE.ShadowMaterial({ opacity: .17 }))
  floor.rotation.x = -Math.PI / 2; floor.position.y = box.min.y - .018; floor.receiveShadow = true; scene.add(floor)
  const camera = new THREE.PerspectiveCamera(36, 1, .05, 150)
  const controls = new OrbitControls(camera, canvas)
  controls.enablePan = false
  controls.enableZoom = false // Zoom buttons leave page scrolling available over the presentation.
  controls.enableDamping = true; controls.dampingFactor = .085
  controls.minPolarAngle = .15; controls.maxPolarAngle = Math.PI * .49
  canvas.style.touchAction = 'pan-y'
  const preferredDirection = new THREE.Vector3().fromArray(manifest.preferredCamera.position).sub(new THREE.Vector3().fromArray(manifest.preferredCamera.target)).normalize()
  const directions: Record<TruckView, THREE.Vector3> = { signature: preferredDirection, serving: new THREE.Vector3(.12, .23, 1).normalize(), front: new THREE.Vector3(1, .18, .06).normalize() }
  const targetPosition = new THREE.Vector3()
  let activeView: TruckView = 'signature', baseDistance = 14, zoomFactor = 1
  let transition = false, visible = true, disposed = false, frame = 0
  const fitDistance = (direction: THREE.Vector3) => {
    const right = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), direction).normalize()
    const up = new THREE.Vector3().crossVectors(direction, right).normalize()
    let distance = 0
    const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
    for (const x of [box.min.x, box.max.x]) for (const y of [box.min.y, box.max.y]) for (const z of [box.min.z, box.max.z]) {
      const corner = new THREE.Vector3(x, y, z).sub(center)
      distance = Math.max(distance, Math.abs(corner.dot(right)) / (tan * camera.aspect) + corner.dot(direction), Math.abs(corner.dot(up)) / tan + corner.dot(direction))
    }
    return distance * 1.09
  }
  const render = () => { controls.update(); renderer.render(scene, camera) }
  const requestRender = () => { if (!frame && !disposed && visible && !document.hidden) frame = requestAnimationFrame(tick) }
  const tick = () => {
    frame = 0
    if (disposed || !visible || document.hidden) return
    if (transition) {
      if (reducedMotion.matches || camera.position.distanceTo(targetPosition) < .008) { camera.position.copy(targetPosition); transition = false }
      else camera.position.lerp(targetPosition, .12)
    }
    render()
    if (transition) requestRender()
  }
  const view = (v: TruckView, immediate = false) => {
    activeView = v; zoomFactor = 1; baseDistance = fitDistance(directions[v]); targetPosition.copy(center).addScaledVector(directions[v], baseDistance)
    controls.target.copy(center)
    if (immediate || reducedMotion.matches) { camera.position.copy(targetPosition); transition = false; render() }
    else { transition = true; requestRender() }
  }
  const resize = new ResizeObserver(() => {
    const { width, height } = host.getBoundingClientRect()
    if (!width || !height) return
    renderer.setSize(width, height); camera.aspect = width / height; camera.updateProjectionMatrix(); view(activeView, true)
  })
  resize.observe(host)
  const intersection = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; if (visible) requestRender(); else { cancelAnimationFrame(frame); frame = 0 } })
  intersection.observe(host)
  const onVisibility = () => { if (!document.hidden) requestRender() }
  const onStart = () => { transition = false }
  controls.addEventListener('start', onStart)
  controls.addEventListener('change', requestRender)
  document.addEventListener('visibilitychange', onVisibility)
  const contextLost = (e: Event) => { e.preventDefault(); host.dispatchEvent(new CustomEvent('truck-context-lost')) }
  canvas.addEventListener('webglcontextlost', contextLost)
  view('signature', true)
  return {
    view,
    zoom(closer) {
      zoomFactor = THREE.MathUtils.clamp(zoomFactor * (closer ? .85 : 1.18), .68, 1.5)
      const direction = camera.position.clone().sub(controls.target).normalize()
      targetPosition.copy(center).addScaledVector(direction, baseDistance * zoomFactor)
      if (reducedMotion.matches) { camera.position.copy(targetPosition); render() } else { transition = true; requestRender() }
    },
    dispose() {
      disposed = true; cancelAnimationFrame(frame); resize.disconnect(); intersection.disconnect()
      document.removeEventListener('visibilitychange', onVisibility); canvas.removeEventListener('webglcontextlost', contextLost)
      controls.removeEventListener('change', requestRender); controls.dispose(); disposeModel(); floor.geometry.dispose(); floor.material.dispose(); key.shadow.dispose(); renderer.dispose(); canvas.remove()
    },
  }
}
