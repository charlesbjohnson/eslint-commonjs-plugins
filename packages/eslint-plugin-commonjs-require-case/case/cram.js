const SnakeCase = require('snake-case');

const Cram = exports;

function instance() {
	return {
		check(string) {
			return SnakeCase(string).replace(/_/g, '') === string;
		},

		error() {
			return 'cram: unexpected case';
		}
	};
}

function register() {
	return {cram: Cram};
}

Cram.instance = instance;
Cram.register = register;
