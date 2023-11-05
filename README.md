# In-Process Formatter of TAP Output

[![Latest version](https://img.shields.io/npm/v/untap-inprocess)
 ![Dependency status](https://img.shields.io/librariesio/release/npm/untap-inprocess)
](https://www.npmjs.com/package/untap-inprocess)
[![Test Coverage](https://codecov.io/gh/prantlf/untap-inprocess/branch/master/graph/badge.svg)](https://codecov.io/gh/prantlf/untap-inprocess)

**Warning:** THIS PACKAGE HAS BEEN DEPRECATED.

The `node:test` package in the latest releases of Node.js 18 includes a new reporter - `spec` - which is enabled by default and prints a readable report on the console very similar to the report printed by this package. You can just remove this package and enjoy the new default built-in reporter.

This package continues working, but you will have to enable the TAP format on the command line explicitly, for example:

    node --test-reporter tap test/index.js

The original documentation continues below.

----

Formats the [TAP] output from a test suite using [`node:test`] to a readable text within the same Node.js process.

Test harness [`node:test`] introduced to Node.js 18 can print only the [TAP] output. While being machine-parseable and to some extent human-readable, the test output can be inspected more efficiently, when it is formatted primarily for humans. This package ensures it by hooking in to the standard output stream and converting the test output to a more friendly format.

* Single process. No need to pipe the test output through another tool.
* Decently coloured. Texts are still clearly readable.
* Transparent. Console output from the test cases is preserved.
* Fluent. Prints the real-time output during the test execution.
* Short and fast. No dependencies.

**Attention:** Supports only simple test suites, which consist of a flat list of test cases in a file. Not nested test suites in a single file.

## Synopsis

A test suite for the ultimate answer:

```js
import test from 'node:test'
import { ok, strictEqual } from 'node:assert'
import 'untap-inprocess' // format the TAP output automatically

const answer = 42

test('has been obtained', () => ok(answer, 'not empty'))
test('is textual', () => strictEqual(typeof answer, 'string'))
test('is ultimate', () => strictEqual(answer, 42))
test('needs a question', t => t.todo())
```

Will produce the following output:

    ❯ npm run test:js

    > node "test/ultimate answer.js"

    ✔ has been obtained
    ✘ is textual

      error: |-
        Expected values to be strictly equal:
        + actual - expected

        + 'number'
        - 'string'
      expected: 'string'
      actual: 'number'
      operator: 'strictEqual'
      stack: |-
        TestContext.<anonymous> (test/ultimate answer.js:14:3)

    ✔ is ultimate
    ❢ needs a question (postponed)

    pass 2
    fail 1
    todo 1

## Installation

This module can be installed in your project using [NPM], [PNPM] or [Yarn]. Make sure, that you use [Node.js] version 18 or newer.

```sh
npm i -D untap-inprocess
pnpm i -D untap-inprocess
yarn add untap-inprocess
```

## Usage

This package replaces the standard output, when imported, either in an ES or CJS module:

```js
import 'untap-inprocess'
require('untap-inprocess')
```

You usually do it in a test suite together with importing the test harness:

```js
import test from 'node:test'
import { strictEqual } from 'node:assert'
import 'untap-inprocess'
```

If you run multiple test suites (files) on the same command line, you may want to print a title of the particular test suite before it runs. You can use a named export of `untap-inprocess` to print an emphasised text and if you use the path to the current test file, it will ll be trimmed automatically:

```js
import { suite } from 'untap-inprocess'

suite(import.meta.url) // print "test/ultimate answer"
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Lint and test your code.

## License

Copyright (c) 2023 Ferdinand Prantl

Licensed under the MIT license.

[TAP]: https://testanything.org/
[`node:test`]: https://nodejs.org/api/test.html
[Node.js]: http://nodejs.org/
[NPM]: https://www.npmjs.com/
[PNPM]: https://pnpm.io/
[Yarn]: https://yarnpkg.com/
