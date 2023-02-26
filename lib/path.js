import { pathToFileURL } from 'url'

// Default explanations for skipped and todo test cases
const path = `${process.cwd()}/`
const url = pathToFileURL(path)
/* c8 ignore next */
const long = text => text.includes(url) || text.includes(path)
const shorten = text => {
  if (text.includes(url)) text = text.replaceAll(url, '')
  /* c8 ignore next */
  if (text.includes(path)) text = text.replaceAll(path, '')
  return text
}

export { long, shorten }
