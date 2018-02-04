const Get = require('lodash.get');

const Behavior = require('./behavior');
const Collection = require('./collection');
const Comparator = require('./comparator');

const Configuration = exports;

class Config {
	constructor(type, instance) {
		this._types = new Set();

		if (instance) {
			this._types = new Set([...instance]);
		}

		if (type) {
			this._types.add(type);
		}
	}

	*[Symbol.iterator]() {
		yield* this._types;
	}
}

function canonicalize(configuration) {
	return new Config('Canonical', configuration);
}

function instance() {
	return new Config();
}

function name(configuration) {
	return new Config('Name', configuration);
}

function order(configuration, order) {
	const types = {
		any: 'Order.Any',
		'left-to-right': 'Order.LeftToRight',
		'right-to-left': 'Order.RightToLeft'
	};

	return new Config(Get(types, order, 'Order.LeftToRight'), configuration);
}

function size(configuration) {
	return new Config('Strict.Size', configuration);
}

function tokens(configuration) {
	return new Config('Strict.Tokens', configuration);
}

function validate(configuration, actual, expected) {
	actual = Collection.Items.instance(actual);
	expected = Collection.Items.instance(expected);

	for (const type of configuration) {
		expected = Get(Behavior, type, Behavior.Default).instance(expected);
	}

	for (const type of configuration) {
		const comparator = Get(Comparator, type, Comparator.Default).instance();

		if (!comparator.compare(actual, expected)) {
			return {equal: false, error: comparator.error()};
		}
	}

	return {equal: true, error: null};
}

Configuration.canonicalize = canonicalize;
Configuration.instance = instance;
Configuration.name = name;
Configuration.order = order;
Configuration.size = size;
Configuration.tokens = tokens;
Configuration.validate = validate;
