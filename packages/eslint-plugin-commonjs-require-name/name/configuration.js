const Get = require('lodash.get');

const Collection = require('./collection');
const Comparator = require('./comparator');

const Configuration = exports;

class Config {
	constructor(type, types = []) {
		this.types = new Set(types);

		if (type) {
			this.types.add(type);
		}
	}

	get values() {
		return [...this.types.values()];
	}
}

function canonicalize(configuration) {
	return new Config('Canonicalized', configuration.types);
}

function comparator(configuration) {
	return (actual, expected) => {
		return configure(Collection.Items.instance(expected), configuration).equals(
			Collection.Items.instance(actual)
		);
	};
}

function configure(collection, configuration) {
	return configuration.values.reduce(
		(collection, type) => Get(Comparator, type).instance(collection),
		collection
	);
}

function instance() {
	return new Config();
}

function name(configuration) {
	return new Config('Named', configuration.types);
}

function order(configuration, order) {
	const types = {
		any: 'Ordered.Any',
		'left-to-right': 'Ordered.LeftToRight',
		'right-to-left': 'Ordered.RightToLeft'
	};

	return new Config(
		Get(types, order, 'Ordered.LeftToRight'),
		configuration.types
	);
}

function size(configuration) {
	return new Config('Strict.Size', configuration.values);
}

function tokens(configuration) {
	return new Config('Strict.Tokens', configuration.values);
}

function valuator(configuration) {
	return string => {
		let collection = Collection.Items.instance(string);

		if (configuration) {
			collection = configure(collection, configuration);
		}

		return collection.values();
	};
}

Configuration.canonicalize = canonicalize;
Configuration.comparator = comparator;
Configuration.instance = instance;
Configuration.name = name;
Configuration.order = order;
Configuration.size = size;
Configuration.tokens = tokens;
Configuration.valuator = valuator;
