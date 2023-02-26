export { suite } from './suite.js'
import format from './format.js'

// Replace writing to stdout with a function using a human-readable format
const { stdout } = process
const { write } = stdout
stdout.write = function (buffer, encoding) {
  const msg = format(buffer.toString(encoding))
  if (msg) write.call(stdout, msg)
}
