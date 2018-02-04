const Item = require('./item');

const Canonical = exports;

function instance(collection) {
	collection = collection.clone();

	collection._value = collection._value.map(({value, namespace}) =>
		Item.instance(value, namespace)
	);

	return collection;
}

Canonical.instance = instance;
