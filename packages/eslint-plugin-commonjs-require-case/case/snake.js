const SnakeCase = require('snake-case');

const Snake = exports;

function instance() {
	return {
		check(string) {
			return SnakeCase(string) === string;
		},

		error() {
			return 'snake: unexpected case';
		}
	};
}

function register() {
	return {snake: Snake};
}

Snake.instance = instance;
Snake.register = register;
