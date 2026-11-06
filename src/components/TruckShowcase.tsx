import { useEffect, useRef, useState } from 'react'
import type { TruckScene, TruckView } from './truckScene'
import './TruckShowcase.css'

export default function TruckShowcase() {
  const forceReducedMotion = import.meta.env.DEV && new URLSearchParams(location.search).has('test-reduced-motion')
  const [staticPreview, setStaticPreview] = useState(() => new URLSearchParams(location.search).get('view') === 'static')
  const [status, setStatus] = useState<'loading' | 'ready' | 'fallback'>('loading')
  const [activeView, setActiveView] = useState<TruckView>('signature')
  const [attempt, setAttempt] = useState(0)
  const host = useRef<HTMLDivElement>(null)
  const engine = useRef<TruckScene | null>(null)
  const preview = `${import.meta.env.BASE_URL}models/carellas-kitchen/preview.png`
  useEffect(() => {
    const container = host.current
    if (!container || staticPreview) return
    const abort = new AbortController()
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    const reduced = { get matches() { return preference.matches || forceReducedMotion } }
    let started = false
    const failed = () => { if (!abort.signal.aborted) { engine.current?.dispose(); engine.current = null; setStatus('fallback') } }
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting) || started) return
      started = true; observer.disconnect()
      import('./truckScene').then(module => module.createTruckScene(container, abort.signal, reduced)).then(scene => {
        if (abort.signal.aborted) { scene.dispose(); return }
        engine.current = scene; setStatus('ready')
      }).catch(failed)
    }, { rootMargin: '160px' })
    observer.observe(container)
    container.addEventListener('truck-context-lost', failed)
    return () => { abort.abort(); observer.disconnect(); container.removeEventListener('truck-context-lost', failed); engine.current?.dispose(); engine.current = null }
  }, [staticPreview, attempt, forceReducedMotion])
  const isStatic = staticPreview || status === 'fallback'
  const ready = !isStatic && status === 'ready'
  const changeView = (v: TruckView) => { engine.current?.view(v); setActiveView(v) }
  return <figure className={`truck-showcase ${ready ? 'is-ready' : ''} ${isStatic ? 'is-static' : ''}`} data-reduced-motion={forceReducedMotion || undefined} aria-labelledby="truck-title">
    <div className="truck-topline"><span><i aria-hidden="true" /> THE KITCHEN, ON WHEELS</span><span>{isStatic ? 'STATIC PREVIEW' : 'EXPLORE IN 3D'} <b aria-hidden="true">↗</b></span></div>
    <div className="truck-stage">
      <div className="truck-backdrop" aria-hidden="true" /><span className="truck-watermark" aria-hidden="true">CK.</span>
      <img className="truck-poster" src={preview} alt="Confirmed navy and copper Carellas Kitchen truck concept, shown from the serving side" hidden={ready} />
      <div className="truck-canvas" ref={host} hidden={isStatic} />
      {!ready && !isStatic && <span className="truck-loading" role="status"><span aria-hidden="true" /> Bringing the kitchen around…</span>}
      {ready && <div className="truck-interaction-note" aria-hidden="true"><span>↔</span> Drag to explore <i /> A new angle on your next meal.</div>}
      {isStatic && <div className="truck-static-note" role="status">{staticPreview ? 'Static concept preview' : '3D unavailable · Showing the confirmed static preview'}</div>}
    </div>
    <div className="truck-controls" aria-label="Truck viewing controls">
      <div className="truck-view-options">{([['signature', 'Three-quarter view'], ['serving', 'Serving side'], ['front', 'Front']] as const).map(([v, label]) => <button key={v} type="button" aria-pressed={activeView === v} disabled={!ready} onClick={() => changeView(v)}>{label}</button>)}</div>
      <div className="truck-zoom"><button type="button" aria-label="Zoom out of truck" disabled={!ready} onClick={() => engine.current?.zoom(false)}>−</button><button type="button" aria-label="Zoom in on truck" disabled={!ready} onClick={() => engine.current?.zoom(true)}>+</button><button type="button" className="truck-reset" aria-label="Reset truck view" disabled={!ready} onClick={() => changeView('signature')}>↺ <span>Reset</span></button></div>
    </div>
    <figcaption className="truck-caption"><div><span>GOOD FOOD. LESS GUESSWORK.</span><strong id="truck-title">Your day, fueled.</strong></div><div className="truck-caption-end"><span>Truck concept · Fairfield, CT</span><button type="button" onClick={() => { setStatus('loading'); setActiveView('signature'); if (isStatic) { setStaticPreview(false); setAttempt(a => a + 1) } else setStaticPreview(true) }}>{isStatic ? 'Load interactive 3D' : 'View static preview'} <span aria-hidden="true">↗</span></button></div></figcaption>
  </figure>
}
