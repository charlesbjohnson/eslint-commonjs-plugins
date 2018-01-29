# `eslint-plugin-commonjs-require-name`

## Contents

- [Install](#install)
- [Summary](#summary)
- [Options](#options)

## Install

1. Ensure that `eslint` is installed already.
2. Install the plugin:

    ```sh
    $ npm install --save-dev eslint-plugin-commonjs-require-name
    ```

3. Configure the plugin...
    - The recommended way, with default settings:

        ```json
        {
          "extends": [
            "plugin:commonjs-require-name/recommended"
          ]
        }
        ```

    - Or override the configuration options as needed:

        ```json
        {
          "plugins": ["commonjs-require-name"],
          "rules": {
            "commonjs-require-name/rule": ["warn", {"strict": {"size": true}}, {"order": "any"}]
          }
        }
        ```

## Summary

This plugin contains a single rule, `commonjs-require-name/rule`, that enforces a naming convention for `require` module assignments.
The rule checks that the name of the *module assignment* reflects the *module name* that is `require`d.

#### `require` Types

Any given `require` is categorized into one of two buckets:

1. A **local** module `require`.
2. A **node** module `require`.

A **local** module `require` refers to files that exist only within the project.
Generally this is a `require` string that is a relative filepath, like so:

```js
const model = require("./model");          // a local index file
const user = require("./model/user");      // a local file
const data = require("./model/data.json"); // a local json file
```

A **node** module `require` refers to builtin modules or those that were installed in `node_modules/`, such as:

```js
const fs = require("fs");           // a node module that is builtin
const request = require("request"); // a node module installed in node_modules/
```

Naming conventions for each type of `require` can be configured independently since it is common for projects to use different conventions depending on the type of module being `require`d.

See [options](#options) for more information.

#### Token Types

When the `require` string argument is parsed it is tokenized such that each token is categorized as either a **namespace** token or a **name** token.
The *name* tokens are usually the last token(s) to appear and are preceeded by a variable number of *namespace* tokens.

Here are some examples of how module names are parsed:

```js
// app/server.js

require("lodash/findBy")    // [lodash, find, by]
                            //  ^^^^^^  ^^^^  ^^
                            //  |       |     |
                            //  |       name  name
                            //  namespace

require("@babel/types")     // [babel, types]
                            //  ^^^^^  ^^^^^
                            //  |      |
                            //  |      name
                            //  namespace

require("./db/models")      // [db, models]
                            //  ^^  ^^^^^^
                            //  |   |
                            //  |   name
                            //  namespace

require("./db/models/user") // [db, models, user]
                            //  ^^  ^^^^^^  ^^^^
                            //  |   |       |
                            //  |   |       name
                            //  |   namespace
                            //  namespace

// app/controller/user.js

require("../models/user")   // [models, user]
                            //  ^^^^^^  ^^^^
                            //  |       |
                            //  |       name
                            //  namespace

require("../models")        // [models]
                            //  ^^^^^^
                            //  |
                            //  name

require("./")               // [controller]
                            //  ^^^
                            //  |
                            //  name

require("../")            // [app]
                            //  ^^^
                            //  |
                            //  name
```

Although there are other optional behaviors that depend on the type of token, the only **non-configurable behavior** is that a module assignment must always include the *name* token(s) parsed from the module name.
These examples conform to this behavior and would not be reported (although they could still be reported depending on how the other options are configured).

```js
const childProcess = require("child_process");
const hasKey = require("lodash/has");
const traverse = require("@babel/traverse")

const data = require("./model/data.json");
const userModel = require("./model/user");
```

These examples, meanwhile, would be reported for this rule:

```js
const child = require("child_process");
const key = require("lodash/has");
const babel = require("@babel/traverse");

const model = require("./model/data.json");
const foo = require("./model/user");
```

## Options

Three options arguments are accepted:

```js
"commonjs-require-name/rule": [
  "error"                     // the eslint error level,
  {"order": "any"},           // options for local requires
  {"order": "left-to-right"}  // options for node requires
]
```

The options for *local* and *node* `require`s use the same schema, which is the following:

- `null` - the rule will not be enforced for the type of `require`.
- An object with the following optional keys:
    - `disable` - a list of regex strings that, if matched against the module name, the rule will not run.
    - `namespace` - an object with the following optional keys:
        - `canonicalize` - when `true`, will attempt to match `namespace` tokens in either their singular or plural form.
        - `separators` - a list of strings that, if found in a module name, will be recognized as separators between `namespace` tokens.
    - `order` - the order in which module name tokens must appear.
    - `strict` - an object with the following optional keys:
        - `size` - when `true`, the module assignment must use the same number of tokens as the module name.
        - `tokens` - when `true`, the module assignment must use every token that appears in the module name.
    - `strip` - a list of regex strings that, if matched, will be stripped from the module name.

### `disable`

- `local` default: `[]`
- `node` default: `["^bluebird$", "^jquery$", "^lodash$", "^underscore$"]`

This option is useful for projects that typically use modules with assignment names that deliberately don't follow the enforced rules but are still common enough that they can't be disabled individually every time they are used.
This is typical for *node* `require` types where module names such as `jquery` `lodash`, or `underscore` are assigned to variables like `$` and `_`.

Instead of having to add an `eslint-disable` directive every time these appear, they can be globally disabled in the *node* configuration object, like so:

```json
"commonjs-require-name/rule": ["error", null, {"disable": ["^bluebird$", "^jquery$", "^lodash$"]}]
```

Projects with *local* modules that have a similar issue, meanwhile, can be disabled in the *local* configuration object with a flexible regex.

```json
"commonjs-require-name/rule": ["error", {"disable": ["vendor/(bluebird|jquery|lodash)/dist"]}, null]
```

This can be useful for projects that use vendored dependencies.

### `namespace`

These options configure how matches against the `namespace` tokens of a module name behave.

#### `namespace.canonicalize`

- `local` default: `true`
- `node` default: `false`

This option is useful for projects that group related files into plural namespaces, but still use the singular form in code at module assignment.
For example, a project that uses this directory structure:

```sh
$ tree
.
└── app
    ├── controllers
    │   └── user.js
    ├── index.js
    ├── models
    │   └── user.js
    └── views
        └── user.js
```

Might `require` each of the `user.js` modules like so:

```js
// in app/index.js

const controllerUser = require("./controllers/user");
const modelUser = require("./models/user");
const viewUser = require("./views/user");
```

Without any configuration, the rule would compare the singular token (`controller`, `model`, or `view`) against the corresponding plural token (`controllers`, `models`, or `views`) and report the mismatch.

With this option enabled in the *local* configuration options, though, the rule will attempt to match the singular token from the module assignment with the corresponding token from the module name in either a singular or plural form.
This means that `controller` on the left would be matched with either `controllers` *or* `controller` on the right, which will succeed.

To enable this rule for *local* `require`s:

```json
"commonjs-require-name/rule": ["error", {"namespace": {"canonicalize": true}}, {}]
```

Note, however, that this option **only** affects `namespace` tokens.
Even with the configuration enabled, this will still be reported:

```js
const thing = require("./things"); //reported
```

This is because `things` is parsed as a `name` token (since it is the name of the module), whereas `controllers`, `models`, and `views` are parsed as `namespace` tokens.

#### `namespace.separators`

- `local` default: `[]`
- `node` default: `["."]`

This option is useful for parsing `namespace` tokens that otherwise would be indistinguishable from `name` tokens.
This is typical for *node* modules that use a `.` to differentiate between a project name and the module name.

For example:

```js
const get = require("lodash.get"); // reported
```

This would be reported since the rule would not be able to differentiate that `lodash` is a `namespace` token instead of a `name` token.
With this option in the *node* configuration options, however, it would not be reported since `lodash` would be properly categorized as a `namespace` token.

```json
"commonjs-require-name/rule": ["error", {}, {"namespace": {"separators": ["."]}}]
```

### `order`

- `local` default: `"any"`
- `node` default: `"left-to-right"`

This option specifies the order in which module assignment tokens should appear relative to the module name.
Tokens can be omitted but the main requirement is that the tokens that the module assignment and the module name have in common must match in the configured order.

Here are some examples:

```js
// "commonjs-require-name/rule": ["error", {}, {"order": "left-to-right"}]
const childProcess = require("child_process");                // ok
const get = require("lodash/fp/get");                         // ok
const intersectionByFP = require("lodash/fp/intersectionBy"); // reported

// "commonjs-require-name/rule": ["error", {"order": "right-to-left"}, {}]
const userController = require("./controller/user"); // ok
const viewUser = require("./view/user");             // reported

// "commonjs-require-name/rule": ["error", {"order": "any"}, {}]
const follower = require("./db/model/follower"); // ok
const dbUserModel = require("./db/model/user");  // ok
const noMatches = require("./db/model");         // reported
```

### `strict`

These options configure how strictly module assignments are compared to module names.

#### `strict.size`

- `local` default: `false`
- `node` default: `false`

Enabling this option specifies that the module assignment must use the same number of tokens that were parsed in the module name.

Here are some examples:

```js
// "commonjs-require-name/rule": ["error", {}, {"strict": {"size": true}}]
const babelTraverse = require("@babel/traverse"); // ok
const types = require("@babel/types");            // reported


// "commonjs-require-name/rule": ["error", {"strict": {"size": true}}, {}]
const dbFollowerModel = require("./db/model/follower"); // ok
const user = require("./db/model/user");                // reported
```

#### `strict.tokens`

- `local` default: `true`
- `node` default: `true`

Enabling this option specifies that the module assignment must not use any additional tokens than those that appear in the module name.

Here are some examples:

```js
// "commonjs-require-name/rule": ["error", {}, {"strict": {"tokens": true}}]
const traverse = require("@babel/traverse"); // ok
const babbleTypes = require("@babel/types"); // reported

// "commonjs-require-name/rule": ["error", {"strict": {"tokens": true}}, {}]
const followerModel = require("./db/model/follower");      // ok
const companyNameDBUserModel = require("./db/model/user"); // reported
```

### `strip`

- `local` default: `[]`
- `node` default: `[".js", ".css", ".com", ".org", ".io"]`

This option can be used to strip unwanted text out of module names before they are parsed.
This is typically useful for module names that include file extensions or top-level domains that, if not included, would be a name that is otherwise already taken on the NPM registry.

Here are some examples:

```js
// "commonjs-require-name/rule": ["error", {}, {"strip": [".js", ".io"]}]
const decimal = require("decimal.js");      // ok
const socket = require("socket.io");        // ok
const normalize = require("normalize.css"); // reported
```

Note that file extensions **are not parsed** and do not need to be stripped.

```js
// "commonjs-require-name/rule": ["error", {"strip": [".js"]}, {"strip": [".js"]}]
const get = require("lodash/get.js"); // ok
const user = require("./user.js");    // ok

// "commonjs-require-name/rule": ["error", {}, {}]
const get = require("lodash/get.js"); // ok
const user = require("./user.js");    // ok
```
