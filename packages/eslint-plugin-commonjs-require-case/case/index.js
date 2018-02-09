const Camel = require('./camel');
const Constant = require('./constant');
const Cram = require('./cram');
const LowerFirst = require('./lower-first');
const Pascal = require('./pascal');
const Snake = require('./snake');
const UpperFirst = require('./upper-first');

const Case = exports;

const TYPES = Object.assign(
	Camel.register(),
	Constant.register(),
	Cram.register(),
	LowerFirst.register(),
	Pascal.register(),
	Snake.register(),
	UpperFirst.register()
);

function validate(assignment, name, options) {
	if (options.disable.some(v => new RegExp(v).test(name))) {
		return {equal: true, error: null};
	}

	const instance = TYPES[options.type].instance();
	if (!instance.check(assignment)) {
		return {equal: false, error: instance.error()};
	}

	return {equal: true, error: null};
}

Case.validate = validate;
