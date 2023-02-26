import cleanup from 'rollup-plugin-cleanup'

export default {
  input: 'lib/index.js',
  output: [
    { file: 'lib/index.cjs', format: 'cjs', sourcemap: true },
    { file: 'lib/index.mjs', sourcemap: true }
  ],
  external: ['tty', 'url'],
  plugins: [cleanup()]
}
