const LowerCaseFirst = require('lower-case-first');

const LowerFirst = exports;

function instance() {
	return {
		check(string) {
			return LowerCaseFirst(string) === string;
		},

		error() {
			return 'lower-first: unexpected case';
		}
	};
}

function register() {
	return {'lower-first': LowerFirst};
}

LowerFirst.instance = instance;
LowerFirst.register = register;
