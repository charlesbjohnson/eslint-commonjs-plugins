# eslint-module-plugins

[![Build Status][travis-img]][travis-url]
[![Test Coverage][codecov-img]][codecov-url]
[![License][license-img]][license-url]

Lint and enforce conventions for module statements.

## Contents

* [Packages](#packages)
* [Install](#install)
* [License](#license)

## Packages

See the [list of available packages][packages-url] that can be installed.

## Install

To add a plugin to your project (`commonjs-require-name`, for example):

1. Ensure that you have `eslint` installed already, since it is a `peerDependency` for every plugin in this repo.
2. Install the plugin using your package manager of choice:

    ```sh
    $ npm install --save-dev eslint-plugin-commonjs-require-name
    ```
3. Configure the plugin to use the recommended settings:

    ```json
    {
      "extends": [
        "plugin:commonjs-require-name/recommended"
      ]
    }
    ```

Using recommended settings will automatically enable the plugin and extend the plugin's recommended configuration.
If you need more flexibility with the plugin configuration then you can override the rule configuration:

```json
{
  "rules": {
    "commonjs-require-name/rule": "warn"
  }
}
```

## License

[MIT][license-url]

[travis-img]: https://img.shields.io/travis/charlesbjohnson/eslint-module-plugins.svg
[travis-url]: https://travis-ci.org/charlesbjohnson/eslint-module-plugins
[codecov-img]: https://img.shields.io/codecov/c/github/charlesbjohnson/eslint-module-plugins.svg
[codecov-url]: https://codecov.io/github/charlesbjohnson/eslint-module-plugins?branch=master
[packages-url]: ./packages/README.md
[license-img]: https://img.shields.io/github/license/charlesbjohnson/eslint-module-plugins.svg
[license-url]: ./LICENSE
