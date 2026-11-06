import fs from 'node:fs'
import crypto from 'node:crypto'

const root = new URL('../public/models/carellas-kitchen/', import.meta.url)
const check = (ok, message) => { if (!ok) throw new Error(message) }
const manifest = JSON.parse(fs.readFileSync(new URL('model-manifest.json', root), 'utf8'))
const bytes = fs.readFileSync(new URL('model.glb', root))
check(manifest.schemaVersion === '1.0', 'Unsupported manifest schema')
check(manifest.dimensions.units === 'meters' && ['x', 'y', 'z'].every(k => Number.isFinite(manifest.dimensions[k]) && manifest.dimensions[k] > 0), 'Invalid dimensions or units')
check(['position', 'target'].every(k => manifest.preferredCamera[k]?.length === 3 && manifest.preferredCamera[k].every(Number.isFinite)), 'Invalid preferred camera')
check(bytes.toString('utf8', 0, 4) === 'glTF' && bytes.readUInt32LE(4) === 2 && bytes.readUInt32LE(8) === bytes.length, 'Invalid GLB header')
check(bytes.readUInt32LE(16) === 0x4e4f534a, 'Missing GLB JSON chunk')
check(manifest.integrity.algorithm === 'SHA-256' && manifest.integrity.bytes === bytes.length && crypto.createHash('sha256').update(bytes).digest('hex') === manifest.integrity.model, 'Model checksum mismatch')
const jsonLength = bytes.readUInt32LE(12)
const gltf = JSON.parse(bytes.toString('utf8', 20, 20 + jsonLength))
check(gltf.asset.version === '2.0' && gltf.meshes.length > 0, 'No valid model geometry')
check(gltf.buffers.every(b => !b.uri), 'External model buffers are not portable')
check((gltf.images || []).every(i => gltf.bufferViews[i.bufferView] && !i.uri), 'Model textures must be embedded')
for (const mesh of gltf.meshes) for (const part of mesh.primitives) {
  check(gltf.accessors[part.attributes.POSITION]?.count > 0, 'Invalid position accessor')
  check(part.material === undefined || !!gltf.materials[part.material], 'Missing material')
  check(part.indices === undefined || !!gltf.accessors[part.indices], 'Invalid index accessor')
}
check(fs.readFileSync(new URL('preview.png', root)).subarray(0, 8).toString('hex') === '89504e470d0a1a0a', 'Invalid preview PNG')
console.log(`Validated ${manifest.modelName}: ${gltf.meshes.length} meshes, ${gltf.images.length} embedded images, ${bytes.length} bytes, matching SHA-256.`)
