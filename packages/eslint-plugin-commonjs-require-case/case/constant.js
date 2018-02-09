const ConstantCase = require('constant-case');

const Constant = exports;

function instance() {
	return {
		check(string) {
			return ConstantCase(string) === string;
		},

		error() {
			return 'constant: unexpected case';
		}
	};
}

function register() {
	return {constant: Constant};
}

Constant.instance = instance;
Constant.register = register;
