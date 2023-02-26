const test = require('node:test')
const { strictEqual } = require('node:assert')
require('../lib/index.cjs')

const answer = 42

test('answer is ultimate', () => strictEqual(answer, 42))
