const Item = require('./item');

const Canonicalized = exports;

function instance(collection) {
	collection.value = collection.value.map(({value, namespace}) =>
		Item.instance(value, namespace)
	);

	return collection;
}

Canonicalized.instance = instance;
