import test from 'node:test'
import { ok, strictEqual } from 'node:assert'
import { suite } from '../lib/index.mjs'

const answer = 42

suite(import.meta.url)

test('has been obtained', () => ok(answer, 'not empty'))
test('is textual', () => strictEqual(typeof answer, 'string'))
test('is ultimate', () => strictEqual(answer, 42))
test('needs a question', t => t.todo())
