const PascalCase = require('pascal-case');

const Pascal = exports;

function instance() {
	return {
		check(string) {
			return PascalCase(string) === string;
		},

		error() {
			return 'pascal: unexpected case';
		}
	};
}

function register() {
	return {pascal: Pascal};
}

Pascal.instance = instance;
Pascal.register = register;
