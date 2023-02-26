import { long, shorten } from './path.js'
import { bold } from './color.js'

const extension = /\.[^.]+$/

export function suite(text) {
  if (long(text)) {
    text = decodeURIComponent(shorten(text))
    if (extension.test(text)) text = text.replace(extension, '')
  }
  console.log(`${bold(text)}\n`)
}
