const UpperCaseFirst = require('upper-case-first');

const UpperFirst = exports;

function instance() {
	return {
		check(string) {
			return UpperCaseFirst(string) === string;
		},

		error() {
			return 'upper-first: unexpected case';
		}
	};
}

function register() {
	return {'upper-first': UpperFirst};
}

UpperFirst.instance = instance;
UpperFirst.register = register;
