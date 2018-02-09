# Plugins

## Contents

* [Packages](#packages)
* [Rules](#rules)

Every rule defined here exists as an independently installable NPM package for maximum flexibility to pick which rules to include and enforce in your own projects.

## Packages

| Rule                                                | Package                                                                 | Version                                                                                        | Dependencies                                                                                      |
| --------------------------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [`commonjs-require-case`](#commonjs-require-case)   | [`eslint-plugin-commonjs-require-case`][gh-url-commonjs-require-case]   | [![npm commonjs-require-case][npm-img-commonjs-require-case]][npm-url-commonjs-require-case]   | [![deps commonjs-require-case][deps-img-commonjs-require-case]][deps-url-commonjs-require-case]   |
| [`commonjs-require-name`](#commonjs-require-name)   | [`eslint-plugin-commonjs-require-name`][gh-url-commonjs-require-name]   | [![npm commonjs-require-name][npm-img-commonjs-require-name]][npm-url-commonjs-require-name]   | [![deps commonjs-require-name][deps-img-commonjs-require-name]][deps-url-commonjs-require-name]   |


[gh-url-commonjs-require-case]: ./eslint-plugin-commonjs-require-case/README.md
[npm-img-commonjs-require-case]: https://img.shields.io/npm/v/eslint-plugin-commonjs-require-case.svg
[npm-url-commonjs-require-case]: https://npmjs.com/package/eslint-plugin-commonjs-require-case
[deps-img-commonjs-require-case]: https://david-dm.org/charlesbjohnson/eslint-module-plugins.svg?path=packages/eslint-plugin-commonjs-require-case
[deps-url-commonjs-require-case]: https://david-dm.org/charlesbjohnson/eslint-module-plugins?path=packages/eslint-plugin-commonjs-require-case

[gh-url-commonjs-require-name]: ./eslint-plugin-commonjs-require-name/README.md
[npm-img-commonjs-require-name]: https://img.shields.io/npm/v/eslint-plugin-commonjs-require-name.svg
[npm-url-commonjs-require-name]: https://npmjs.com/package/eslint-plugin-commonjs-require-name
[deps-img-commonjs-require-name]: https://david-dm.org/charlesbjohnson/eslint-module-plugins.svg?path=packages/eslint-plugin-commonjs-require-name
[deps-url-commonjs-require-name]: https://david-dm.org/charlesbjohnson/eslint-module-plugins?path=packages/eslint-plugin-commonjs-require-name

## Rules

### `commonjs-require-case`

Enforce a variable casing convention for `require` module assignments.

### `commonjs-require-name`

Enforce a variable naming convention for `require` module assignments relative to the module name.
