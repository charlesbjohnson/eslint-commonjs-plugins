const ESLint = require('eslint');
const MergeWith = require('lodash.mergewith');

const Options = require('./options');
const Rule = require('./rule');

function valid(cases, options) {
	return cases.map(code => ({code, options}));
}

function invalid(cases, options) {
	return cases.map(code => ({code, errors: 1, options}));
}

function options(obj) {
	return MergeWith(Options.disabled(), obj);
}

describe('Rule', () => {
	const tester = new ESLint.RuleTester();

	describe('selectors', () => {
		tester.run('assignment expression', Rule, {
			valid: valid(['var path; path = require("path");'], [null, options()]),
			invalid: invalid(['var not; not = require("path");'], [null, options()])
		});

		tester.run('declared assignment', Rule, {
			valid: valid(['var path = require("path");'], [null, options()]),
			invalid: invalid(['var not = require("path");'], [null, options()])
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
				[null, options()]
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
				[null, options()]
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
					'var ignore = {}; ignore._ = require("ignore");',
					`
            var ignore;

            function lazy() {
              return require("ignore");
            }

            ignore = lazy();
          `
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
					'var not = require("child_process");',
					'var user = require("./test/fixture/models/user");'
				],
				[options(), null]
			),
			invalid: invalid(
				['var not = require("./test/fixture/models/user");'],
				[options(), null]
			)
		});

		tester.run('node', Rule, {
			valid: valid(
				[
					'var childProcess = require("child_process");',
					'var not = require("./test/fixture/models/user");'
				],
				[null, options()]
			),
			invalid: invalid(
				['var not = require("child_process");'],
				[null, options()]
			)
		});

		tester.run('none', Rule, {
			valid: [],
			invalid: invalid(
				[
					'var none = require("");',
					'var none = require(null);',
					'var none = require(false);'
				],
				[options(), options()]
			)
		});
	});

	tester.run('readme name', Rule, {
		valid: valid(
			[
				'var childProcess = require("child_process");',
				'var has = require("lodash/has");',
				'var traverse = require("@babel/traverse");',
				'var data = require("./app/models/data.json");',
				'var user = require("./app/models/user");'
			],
			[options(), options()]
		),
		invalid: invalid(
			[
				'var child = require("child_process");',
				'var babel = require("@babel/traverse");',
				'var key = require("lodash/has");',
				'var models = require("./app/models/data.json");',
				'var usr = require("./app/models/user");'
			],
			[options(), options()]
		)
	});

	tester.run('readme disable', Rule, {
		valid: valid(
			[
				'var Promise = require("bluebird");',
				'var Promise = require("./vendor/bluebird/dist");',
				'var $ = require("jquery");',
				'var $ = require("./vendor/jquery/dist");',
				'var _ = require("lodash");',
				'var _ = require("./vendor/lodash/dist");'
			],
			[
				options({disable: ['vendor/(bluebird|jquery|lodash)/dist']}),
				options({disable: ['^bluebird$', '^jquery$', '^lodash$']})
			]
		),
		invalid: invalid(
			[
				'var Promise = require("bluebird");',
				'var $ = require("jquery");',
				'var _ = require("lodash");'
			],
			[options(), options()]
		)
	});

	tester.run('readme namespace canonicalize', Rule, {
		valid: valid(
			[
				'var controllerUser = require("./controllers/user");',
				'var modelUser = require("./models/user");',
				'var viewUser = require("./views/user");'
			],
			[options({namespace: {canonicalize: true}, strict: {tokens: true}}), null]
		),
		invalid: [].concat(
			invalid(
				[
					'var controllerUser = require("./controllers/user");',
					'var modelUser = require("./models/user");',
					'var viewUser = require("./views/user");'
				],
				[options({strict: {tokens: true}}), null]
			),
			invalid(
				[
					'var otherThing = require("other-things");',
					'var thing = require("./things");'
				],
				[
					options({namespace: {canonicalize: true}, strict: {tokens: true}}),
					options({namespace: {canonicalize: true}, strict: {tokens: true}})
				]
			)
		)
	});

	tester.run('readme namespace separators', Rule, {
		valid: valid(
			['var get = require("lodash.get");'],
			[null, options({namespace: {separators: ['.']}})]
		),
		invalid: invalid(['var get = require("lodash.get");'], [null, options()])
	});

	tester.run('readme order', Rule, {
		valid: [].concat(
			valid(
				[
					'var childProcess = require("child_process");',
					'var get = require("lodash/fp/get");'
				],
				[null, options({order: 'left-to-right'})]
			),
			valid(
				[
					'var userControllers = require("./app/controllers/user");',
					'var userModels = require("./app/models/user");'
				],
				[options({order: 'right-to-left'}), null]
			),
			valid(
				[
					'var follower = require("./app/models/follower");',
					'var userAppModelsV3 = require("./app/models/user");'
				],
				[options({order: 'any'}), null]
			)
		),
		invalid: [].concat(
			invalid(
				['var intersectionByFP = require("lodash/fp/intersectionBy");'],
				[null, options({order: 'left-to-right'})]
			),
			invalid(
				['var viewsUser = require("./app/views/user");'],
				[options({order: 'right-to-left'}), null]
			),
			invalid(
				['var noMatch = require("./app/models");'],
				[options({order: 'any'})]
			)
		)
	});

	tester.run('readme strict size', Rule, {
		valid: [].concat(
			valid(
				['var babelTraverse = require("@babel/traverse");'],
				[null, options({strict: {size: true}})]
			),
			valid(
				['var followerAppModels = require("./app/models/follower");'],
				[{strict: {size: true}}, null]
			)
		),
		invalid: [].concat(
			invalid(
				['var types = require("@babel/types");'],
				[null, options({strict: {size: true}})]
			),
			invalid(
				['var user = require("./app/models/user");'],
				[options({strict: {size: true}}), null]
			)
		)
	});

	tester.run('readme strict tokens', Rule, {
		valid: [].concat(
			valid(
				['var traverse = require("@babel/traverse");'],
				[null, options({strict: {tokens: true}})]
			),
			valid(
				['var followerModels = require("./app/models/follower");'],
				[options({strict: {tokens: true}}), null]
			)
		),
		invalid: [].concat(
			invalid(
				['var babbleTypes = require("@babel/types");'],
				[null, options({strict: {tokens: true}})]
			),
			invalid(
				['var userModelsV2 = require("./app/models/user");'],
				[options({strict: {tokens: true}}), null]
			)
		)
	});

	tester.run('readme strip', Rule, {
		valid: [].concat(
			valid(
				[
					'var decimal = require("decimal.js");',
					'var socket = require("socket.io");'
				],
				[null, options({strip: ['.js', '.io']})]
			),
			valid(
				[
					'var get = require("lodash/get.js");',
					'var user = require("./user.js");',
					'var decimal = require("decimal.js");'
				],
				[options({strip: ['.js']}), options({strip: ['.js']})]
			),
			valid(
				[
					'var get = require("lodash/get.js");',
					'var user = require("./user.js");'
				],
				[options({strip: []}), options({strip: []})]
			)
		),
		invalid: [].concat(
			invalid(
				['var normalize = require("normalize.css");'],
				[null, options({strip: ['.js', '.io']})]
			),
			invalid(
				['var decimal = require("decimal.js");'],
				[options({strip: []}), options({strip: []})]
			)
		)
	});
});
