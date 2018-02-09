# `eslint-plugin-commonjs-require-case`

## Contents

- [Install](#install)
- [Summary](#summary)
- [Options](#options)

## Install

1. Ensure that `eslint` is installed already.
2. Install the plugin:

    ```sh
    $ npm install --save-dev eslint-plugin-commonjs-require-case
    ```

3. Configure the plugin...
    - The recommended way, with default settings:

        ```json
        {
          "extends": [
            "plugin:commonjs-require-case/recommended"
          ]
        }
        ```

    - Or override the configuration options as needed:

        ```json
        {
          "plugins": ["commonjs-require-case"],
          "rules": {
            "commonjs-require-case/rule": ["warn", {"type": "camel"}]
          }
        }
        ```


## Summary

This plugin contains a single rule, `commonjs-require-case/rule`, that enforces a case convention for `require` module assignments.
The rule checks that the case of the *module assignment* matches the configured case.

## Options

Two options arguments are accepted:

```js
"commonjs-require-case/rule": [
  "error",          // the eslint error level
  {"type": "camel"} // options object
]
```

The options use the following schema:

- An object with the following keys:
    - `disable` - a list of regex strings that, if matched against the module name, the rule will not run.
    - `type` - the type of case that module assignments must use.

### `disable`

- Default: `["^jquery$", "^lodash$", "^underscore$"]`

This option is useful for projects that typically use modules with assignment names that deliberately don't follow the enforced rules but are still common enough that they can't be disabled individually every time they are used.
This is typical for module names such as `jquery`, `lodash`, `underscore` that are assigned to variables like `$` or `_`.

Instead of having to add an `eslint-disable` directive every time these appear, they can be globally disabled, like so:

```json
"commonjs-require-case": ["error", {"disable": ["^jquery$", "^lodash$", "^underscore$"]}]
```

Since `disable` uses regex strings, it can be configured for projects that use vendored dependencies:

```json
"commonjs-require-case": ["error", {"disable": ["vendor/(jquery|lodash)/dist"]}]
```

### `type`

- Default: `"camel"`
- Valid values: `camel`, `constant`, `cram`, `lower-first`, `pascal`, `snake`, `upper-first`

This option configures the type of case that module assignments must conform to.

Here are some examples:

```js
// "commonjs-require-case": ["error", {"type": "camel"}]

const hapi = require("hapi");                // ok
const goodConsole = require("good-console"); // ok
const Joi = require("joi");                  // reported


// "commonjs-require-case": ["error", {"type": "constant"}]

const CORS = require("cors");               // ok
const BODY_PARSER = require("body-parser"); // ok
const express = require("express");         // reported


// "commonjs-require-case": ["error", {"type": "cram"}]

const koa = require("koa");                    // ok
const trierouter = require("trie-router");     // ok
const responseTime = require("response-time"); // reported


// "commonjs-require-case": ["error", {"type": "lower-first"}]

const knex = require("knex");           // ok
const typeORM = require("typeorm");     // ok
const Objection = require("objection"); // reported


// "commonjs-require-case": ["error", {"type": "pascal"}]

const FindIndex = require("lodash/findIndex"); // ok
const Immutable = require("immutable");        // ok
const rxJS = require("rxjs");                  // reported


// "commonjs-require-case": ["error", {"type": "snake"}]

const got = require("got");               // ok
const node_fetch = require("node-fetch"); // ok
const superAgent = require("superagent"); // reported


// "commonjs-require-case": ["error", {"type": "upper-first"}]

const Sinon = require("sinon");           // ok
const ProxyQuire = require("proxyquire"); // ok
const testDouble = require("testdouble"); // reported
```
