const ESLint = require('eslint');

const Options = require('./options');
const Rule = require('./rule');

function valid(cases, options) {
	return cases.map(code => ({code, options}));
}

function invalid(cases, options) {
	return cases.map(code => ({code, errors: 1, options}));
}

function options(obj) {
	return Options.merge(Options.disabled(), obj);
}

describe('Rule', () => {
	const tester = new ESLint.RuleTester({parserOptions: {ecmaVersion: 2015}});

	describe('selectors', () => {
		tester.run('assignment expression', Rule, {
			valid: valid(['let path; path = require("path");'], [null, options()]),
			invalid: invalid(['let not; not = require("path");'], [null, options()])
		});

		tester.run('declared assignment', Rule, {
			valid: valid(['const path = require("path");'], [null, options()]),
			invalid: invalid(['const not = require("path");'], [null, options()])
		});

		tester.run('multiple', Rule, {
			valid: valid(
				[
					`
            let childProcess;
            const fs = require("fs");
            const path = require("path");
            let url;

            childProcess = require("child_process");
            url = require("url");
          `
				],
				[null, options()]
			),
			invalid: invalid(
				[
					`
            let childProcess;
            const fs = require("fs");
            let not;
            const path = require("path");

            childProcess = require("child_process");
            not = require("url");
          `
				],
				[null, options()]
			)
		});

		tester.run('ignored', Rule, {
			valid: valid(
				[
					'const ignore = require();',
					'const ignore = require("too", "many");',
					'const ignore = require(__filename + "dynamic");',
					'let ignore; ignore = require();',
					'let ignore; ignore = require("too", "many");',
					'let ignore; ignore = require(__filename + "dynamic");',
					'let ignore, Ignore = ignore = require("ignore");',
					'const ignore = { _: require("ignore") };',
					'const ignore = {}; ignore._ = require("ignore");',
					`
            let ignore;

            function lazy() {
              return require("ignore");
            }

            ignore = lazy();
          `,
					'const {ignore} = require("ignore");',
					'const [ignore] = require("ignore");',
					'let ignore; ({ignore} = require("ignore"));',
					'let ignore; ([ignore] = require("ignore"));'
				],
				[options(), options()]
			),
			invalid: []
		});
	});

	describe('path type', () => {
		tester.run('local', Rule, {
			valid: valid(
				[
					'const not = require("child_process");',
					'const user = require("./test/fixture/models/user");'
				],
				[options(), null]
			),
			invalid: invalid(
				['const not = require("./test/fixture/models/user");'],
				[options(), null]
			)
		});

		tester.run('node', Rule, {
			valid: valid(
				[
					'const childProcess = require("child_process");',
					'const not = require("./test/fixture/models/user");'
				],
				[null, options()]
			),
			invalid: invalid(
				['const not = require("child_process");'],
				[null, options()]
			)
		});

		tester.run('none', Rule, {
			valid: [],
			invalid: invalid(
				[
					'const none = require("");',
					'const none = require(null);',
					'const none = require(false);'
				],
				[options(), options()]
			)
		});
	});

	describe('readme', () => {
		tester.run('name', Rule, {
			valid: valid(
				[
					'const childProcess = require("child_process");',
					'const has = require("lodash/has");',
					'const traverse = require("@babel/traverse");',
					'const data = require("./app/models/data.json");',
					'const user = require("./app/models/user");'
				],
				[options(), options()]
			),
			invalid: invalid(
				[
					'const child = require("child_process");',
					'const babel = require("@babel/traverse");',
					'const key = require("lodash/has");',
					'const models = require("./app/models/data.json");',
					'const usr = require("./app/models/user");'
				],
				[options(), options()]
			)
		});

		tester.run('disable', Rule, {
			valid: valid(
				[
					'const Promise = require("bluebird");',
					'const Promise = require("./vendor/bluebird/dist");',
					'const $ = require("jquery");',
					'const $ = require("./vendor/jquery/dist");',
					'const _ = require("lodash");',
					'const _ = require("./vendor/lodash/dist");'
				],
				[
					options({disable: ['vendor/(bluebird|jquery|lodash)/dist']}),
					options({disable: ['^bluebird$', '^jquery$', '^lodash$']})
				]
			),
			invalid: invalid(
				[
					'const Promise = require("bluebird");',
					'const $ = require("jquery");',
					'const _ = require("lodash");'
				],
				[options(), options()]
			)
		});

		tester.run('namespace canonicalize', Rule, {
			valid: valid(
				[
					'const controllerUser = require("./controllers/user");',
					'const modelUser = require("./models/user");',
					'const viewUser = require("./views/user");'
				],
				[
					options({namespace: {canonicalize: true}, strict: {tokens: true}}),
					null
				]
			),
			invalid: [].concat(
				invalid(
					[
						'const controllerUser = require("./controllers/user");',
						'const modelUser = require("./models/user");',
						'const viewUser = require("./views/user");'
					],
					[options({strict: {tokens: true}}), null]
				),
				invalid(
					[
						'const otherThing = require("other-things");',
						'const thing = require("./things");'
					],
					[
						options({namespace: {canonicalize: true}, strict: {tokens: true}}),
						options({namespace: {canonicalize: true}, strict: {tokens: true}})
					]
				)
			)
		});

		tester.run('namespace separators', Rule, {
			valid: valid(
				['const get = require("lodash.get");'],
				[null, options({namespace: {separators: ['.']}})]
			),
			invalid: invalid(
				['const get = require("lodash.get");'],
				[null, options()]
			)
		});

		tester.run('order', Rule, {
			valid: [].concat(
				valid(
					[
						'const childProcess = require("child_process");',
						'const get = require("lodash/fp/get");'
					],
					[null, options({order: 'left-to-right'})]
				),
				valid(
					[
						'const userControllers = require("./app/controllers/user");',
						'const userModelsV2 = require("./app/models/user");'
					],
					[options({order: 'right-to-left'}), null]
				),
				valid(
					[
						'const follower = require("./app/models/follower");',
						'const userAppModelsV3 = require("./app/models/user");'
					],
					[options({order: 'any'}), null]
				)
			),
			invalid: [].concat(
				invalid(
					['const intersectionByFP = require("lodash/fp/intersectionBy");'],
					[null, options({order: 'left-to-right'})]
				),
				invalid(
					['const viewsUser = require("./app/views/user");'],
					[options({order: 'right-to-left'}), null]
				),
				invalid(
					['const noMatch = require("./app/models");'],
					[options({order: 'any'})]
				)
			)
		});

		tester.run('strict size', Rule, {
			valid: [].concat(
				valid(
					['const babelTraverse = require("@babel/traverse");'],
					[null, options({strict: {size: true}})]
				),
				valid(
					['const followerAppModels = require("./app/models/follower");'],
					[{strict: {size: true}}, null]
				)
			),
			invalid: [].concat(
				invalid(
					['const types = require("@babel/types");'],
					[null, options({strict: {size: true}})]
				),
				invalid(
					['const user = require("./app/models/user");'],
					[options({strict: {size: true}}), null]
				)
			)
		});

		tester.run('strict tokens', Rule, {
			valid: [].concat(
				valid(
					['const traverse = require("@babel/traverse");'],
					[null, options({strict: {tokens: true}})]
				),
				valid(
					['const followerModels = require("./app/models/follower");'],
					[options({strict: {tokens: true}}), null]
				)
			),
			invalid: [].concat(
				invalid(
					['const babbleTypes = require("@babel/types");'],
					[null, options({strict: {tokens: true}})]
				),
				invalid(
					['const userModelsV2 = require("./app/models/user");'],
					[options({strict: {tokens: true}}), null]
				)
			)
		});

		tester.run('strip', Rule, {
			valid: [].concat(
				valid(
					[
						'const decimal = require("decimal.js");',
						'const socket = require("socket.io");'
					],
					[null, options({strip: ['.js', '.io']})]
				),
				valid(
					[
						'const get = require("lodash/get.js");',
						'const user = require("./user.js");',
						'const decimal = require("decimal.js");'
					],
					[options({strip: ['.js']}), options({strip: ['.js']})]
				),
				valid(
					[
						'const get = require("lodash/get.js");',
						'const user = require("./user.js");'
					],
					[options({strip: []}), options({strip: []})]
				)
			),
			invalid: [].concat(
				invalid(
					['const normalize = require("normalize.css");'],
					[null, options({strip: ['.js', '.io']})]
				),
				invalid(
					['const decimal = require("decimal.js");'],
					[options({strip: []}), options({strip: []})]
				)
			)
		});
	});
});
