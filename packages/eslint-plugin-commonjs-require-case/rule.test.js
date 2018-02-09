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
			valid: valid(['let path; path = require("path");'], [options()]),
			invalid: invalid(['let PATH; PATH = require("path");'], [options()])
		});

		tester.run('declared assignment', Rule, {
			valid: valid(['const path = require("path");'], [options()]),
			invalid: invalid(['const PATH = require("path");'], [options()])
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
				[options()]
			),
			invalid: invalid(
				[
					`
            let childProcess;
            const fs = require("fs");
            let URL;
            const path = require("path");

            childProcess = require("child_process");
            URL = require("url");
          `
				],
				[options()]
			)
		});

		tester.run('ignored', Rule, {
			valid: valid(
				[
					'const ignore = require();',
					'const ignore = require(null);',
					'let ignore; ignore = require();',
					'let ignore; ignore = require(null);',
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
				[options()]
			),
			invalid: []
		});
	});

	describe('readme', () => {
		tester.run('disable', Rule, {
			valid: valid(
				[
					'const $ = require("jquery");',
					'const $ = require("./vendor/jquery/dist");',
					'const _ = require("lodash");',
					'const _ = require("./vendor/lodash/dist");'
				],
				[
					options({
						disable: ['^jquery$', '^lodash$', 'vendor/(jquery|lodash)/dist']
					})
				]
			),
			invalid: invalid(
				['const $ = require("jquery");', 'const _ = require("lodash");'],
				[options()]
			)
		});

		tester.run('type', Rule, {
			valid: []
				.concat(
					valid(
						[
							'const hapi = require("hapi");',
							'const goodConsole = require("good-console");'
						],
						[options({type: 'camel'})]
					)
				)
				.concat(
					valid(
						[
							'const CORS = require("cors");',
							'const BODY_PARSER = require("body-parser");'
						],
						[options({type: 'constant'})]
					)
				)
				.concat(
					valid(
						[
							'const koa = require("koa");',
							'const trierouter = require("trie-router");'
						],
						[options({type: 'cram'})]
					)
				)
				.concat(
					valid(
						[
							'const knex = require("knex");',
							'const typeORM = require("typeorm");'
						],
						[options({type: 'lower-first'})]
					)
				)
				.concat(
					valid(
						[
							'const FindIndex = require("lodash/findIndex");',
							'const Immutable = require("immutable");'
						],
						[options({type: 'pascal'})]
					)
				)
				.concat(
					valid(
						[
							'const got = require("got");',
							'const node_fetch = require("node-fetch");'
						],
						[options({type: 'snake'})]
					)
				)
				.concat(
					valid(
						[
							'const Sinon = require("sinon");',
							'const ProxyQuire = require("proxyquire");'
						],
						[options({type: 'upper-first'})]
					)
				),
			invalid: []
				.concat(
					invalid(['const Joi = require("joi");'], [options({type: 'camel'})])
				)
				.concat(
					invalid(
						['const express = require("express");'],
						[options({type: 'constant'})]
					)
				)
				.concat(
					invalid(
						['const responseTime = require("response-time");'],
						[options({type: 'cram'})]
					)
				)
				.concat(
					invalid(
						['const Objection = require("objection");'],
						[options({type: 'lower-first'})]
					)
				)
				.concat(
					invalid(
						['const rxJS = require("rxjs");'],
						[options({type: 'pascal'})]
					)
				)
				.concat(
					invalid(
						['const superAgent = require("superagent");'],
						[options({type: 'snake'})]
					)
				)
				.concat(
					invalid(
						['const testDouble = require("testdouble");'],
						[options({type: 'upper-first'})]
					)
				)
		});
	});
});
