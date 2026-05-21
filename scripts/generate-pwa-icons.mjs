import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const svg = readFileSync(join(root, 'public', 'pwa-icon.svg'))

const sizes = [192, 512]

for (const size of sizes) {
  await sharp(svg)
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(join(root, 'public', `pwa-${size}x${size}.png`))
}

console.log('PWA icons generated:', sizes.map((s) => `pwa-${s}x${s}.png`).join(', '))
