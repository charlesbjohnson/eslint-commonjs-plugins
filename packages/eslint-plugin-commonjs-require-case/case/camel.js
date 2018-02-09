const CamelCase = require('camel-case');

const Camel = exports;

function instance() {
	return {
		check(string) {
			return CamelCase(string) === string;
		},

		error() {
			return 'camel: unexpected case';
		}
	};
}

function register() {
	return {camel: Camel};
}

Camel.instance = instance;
Camel.register = register;
