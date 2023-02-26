import { isatty } from 'tty'

const { argv, env, platform, stdout } = process

let bold, dim, green, red, yellow
const disabled = 'NO_COLOR' in env || argv.includes('--no-color')
const forced = 'FORCE_COLOR' in env || argv.includes('--color')
const ci = 'CI' in env
const windows = platform === 'win32'
const dumb = env.TERM === 'dumb'
const compatible = isatty(stdout.fd) && env.TERM && !dumb
/* c8 ignore next */
if (!disabled && (forced || !ci && (windows && !dumb || compatible))) {
  const wrap = (open, close, text) => `\x1b[${open}m${text}\x1b[${close}m`
  bold = text => wrap(1, 22, text)
  dim = text => wrap(2, 22, text)
  green = text => wrap(32, 39, text)
  red = text => wrap(31, 39, text)
  yellow = text => wrap(33, 39, text)
/* c8 ignore next 3 */
} else {
  bold = dim = green = red = yellow = text => text
}

export { bold, dim, green, red, yellow }
