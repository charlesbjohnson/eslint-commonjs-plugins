const ESLint = require('eslint');
const Rule = require('./rule');

function valid(cases, options) {
	return cases.map(code => ({code, options}));
}

function invalid(cases, options) {
	return cases.map(code => ({code, errors: 1, options}));
}

describe('Rule', () => {
	const tester = new ESLint.RuleTester();

	describe('selectors', () => {
		tester.run('assignment expression', Rule, {
			valid: valid(['var path; path = require("path");'], [{}, {}]),
			invalid: invalid(['var not; not = require("path");'], [{}, {}])
		});

		tester.run('declared assignment', Rule, {
			valid: valid(['var path = require("path");'], [{}, {}]),
			invalid: invalid(['var not = require("path");'], [{}, {}])
		});

		tester.run('multiple', Rule, {
			valid: valid(
				[
					`
            var childProcess;
            var fs = require("fs");
            var path = require("path");
            var url;

            childProcess = require("child_process");
            url = require("url");
          `
				],
				[{}, {}]
			),
			invalid: invalid(
				[
					`
            var childProcess;
            var fs = require("fs");
            var not;
            var path = require("path");

            childProcess = require("child_process");
            not = require("url");
          `
				],
				[{}, {}]
			)
		});

		tester.run('ignored', Rule, {
			valid: valid(
				[
					'var ignore = require();',
					'var ignore = require("too", "many");',
					'var ignore = require(__filename + "dynamic");',
					'var ignore; ignore = require();',
					'var ignore; ignore = require("too", "many");',
					'var ignore; ignore = require(__filename + "dynamic");',
					'var ignore, Ignore = ignore = require("ignore");',
					'var ignore = { _: require("ignore") };',
					'var ignore = {}; ignore._ = require("ignore")',
					`
            var ignore;

            function lazy() {
            return require("ignore");
            }

            ignore = lazy();
          `
				],
				[{}, {}]
			),
			invalid: []
		});
	});

	describe('path type', () => {
		tester.run('local', Rule, {
			valid: valid(
				[
					'var not = require("child_process");',
					'var userModel = require("./test/fixture/models/user");'
				],
				[{}, null]
			),
			invalid: invalid(
				['var not = require("./test/fixture/models/user");'],
				[{}, null]
			)
		});

		tester.run('node', Rule, {
			valid: valid(
				[
					'var childProcess = require("child_process");',
					'var not = require("./test/fixture/models/user");'
				],
				[null, {}]
			),
			invalid: invalid(['var not = require("child_process");'], [null, {}])
		});

		tester.run('none', Rule, {
			valid: [],
			invalid: invalid(
				[
					'var none = require("");',
					'var none = require(null);',
					'var none = require(false);'
				],
				[{}, {}]
			)
		});
	});

	tester.run('examples', Rule, {
		valid: valid(
			[
				'var get = require("library/get");',
				'var get = require("library/fp/get");',
				'var get = require("library.get");',
				'var libraryGet = require("library/get");',
				'var libraryGet = require("library.get");',
				'var fpGet = require("library/fp/get");',
				'var libraryFPGet = require("library/fp/get");',
				'var traverse = require("@babel/traverse");',
				'var babelTraverse = require("@babel/traverse");',
				'var hls = require("@hola.org/hls.js");',
				'var holaHls = require("@hola.org/hls.js");'
			],
			[null, {}]
		),
		invalid: invalid(
			[
				'var library = require("library.get");',
				'var libraryGet = require("library/fp/get");',
				'var myGet = require("library/get");',
				'var babbelTraverse = require("@babel/traverse");',
				'var holaHlsJs = require("@hola.org/hls.js");'
			],
			[null, {}]
		)
	});
});
