# Plugins

## Contents

* [Packages](#packages)
* [Rules](#rules)

Every rule defined here exists as an independently installable NPM package for maximum flexibility to pick which rules to include and enforce in your own projects.

## Packages

| Rule                                                | Package                                                                 | Version                                                                                        | Dependencies                                                                                      |
| --------------------------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [`commonjs-require-name`](#commonjs-require-name)   | [`eslint-plugin-commonjs-require-name`][gh-url-commonjs-require-name]   | [![npm commonjs-require-name][npm-img-commonjs-require-name]][npm-url-commonjs-require-name]   | [![deps commonjs-require-name][deps-img-commonjs-require-name]][deps-url-commonjs-require-name]   |

[gh-url-commonjs-require-name]: ./eslint-plugin-commonjs-require-name/README.md
[npm-img-commonjs-require-name]: https://img.shields.io/npm/v/eslint-plugin-commonjs-require-name.svg
[npm-url-commonjs-require-name]: https://npmjs.com/package/eslint-plugin-commonjs-require-name
[deps-img-commonjs-require-name]: https://david-dm.org/charlesbjohnson/eslint-module-plugins.svg?path=packages/eslint-plugin-commonjs-require-name
[deps-url-commonjs-require-name]: https://david-dm.org/charlesbjohnson/eslint-module-plugins?path=packages/eslint-plugin-commonjs-require-name

## Rules

### `commonjs-require-name`

Enforce a variable name convention for `require` assignments relative to the name of the module.
