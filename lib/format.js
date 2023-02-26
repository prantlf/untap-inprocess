import { bold, dim, green, red, yellow } from './color.js'
import { long, shorten } from './path.js'

const plan = /^1\.\.\d+/
const duration = /^#\s+duration_ms\s+[.0-9]+/
const footer = /^#\s+(tests|pass|fail|cancelled|skipped|todo)\s+(\d+)/
const comment = /^#\s+/
const progress = /(?:^\s+---\n)|(?:\s+duration_ms:\s+[.0-9]+\n)|(?:\s+\.\.\.\n)/g
const internal = /\s+[^(]+\s+\(node:[^:]+:\d+:\d+\)/
const local = /(\s+[^(]+\s+\()([^:]+:\d+:\d+\))/
const failure = /(?:^\s+failureType: '[^']+')|(?:\s+code: '[^']+'\n)/g
const ok = /^ok\s+\d+\s+-/
const notOk = /^not ok\s+\d+\s+-/
const skip = /# (SKIP|TODO)\s*([^\n]*)\n/

// Colours for the passed and failed counts in the footer
const performed = {
  pass: bold(green('pass')),
  fail: bold(red('fail'))
}
// Colour for the skipped and todo counts in the footer
const skipped = bold(yellow('$1'))

// Default explanations for skipped and todo test cases
const ignored = {
  SKIP: 'skipped',
  TODO: 'postponed'
}

// Replace writing to stdout with a function using a human-readable format
export default function (msg) {
  let match

  if (msg === 'TAP version 13\n' || plan.test(msg) || duration.test(msg)) return

  if ((match = footer.exec(msg))) {
    const [, type, count] = match
    if (count === '0') return
    if (type === 'tests') msg = '\n'
    else msg = msg.replace(comment, '').replace(/^(\w+)/, performed[type] || skipped)
  }
  else if (comment.test(msg)) return
  else if (progress.test(msg)) {
    msg = msg.replace(progress, '')
    if (failure.test(msg)) {
      if (long(msg)) msg = shorten(msg)
      msg = msg.split('\n').map(line => {
        if (internal.test(line)) line = line.replace(internal, '')
        if (local.test(line)) {
          line = line.replace(local, (_match, start, end) =>
            `${start}${decodeURIComponent(end)}`)
        }
        return line
      }).filter(line => line).join('\n')
      msg = `${msg.replace(failure, '')}\n\n`
    }
    msg = dim(msg)
  }
  else if (ok.test(msg)) {
    let tick, color
    if ((match = skip.exec(msg))) {
      const [, type, reason] = match
      tick = '❢'
      color = yellow
      msg = msg.replace(skip, `(${reason || ignored[type]})\n`)
    } else {
      tick = '✔'
      color = green
    }
    msg = msg.replace(ok, color(tick))
  }
  else if (notOk.test(msg)) msg = msg.replace(notOk, red('✘'))

  return msg
}
