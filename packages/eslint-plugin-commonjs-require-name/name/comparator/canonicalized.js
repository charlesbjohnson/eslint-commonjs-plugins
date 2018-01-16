const Pluralize = require('pluralize');
const Collection = require('../collection');

const Canonicalized = exports;

class Item extends Collection.Item {
	equals(other) {
		if (!this.namespace && !other.namespace) {
			return super.equals(other);
		}

		const singular = Pluralize.singular(this.value);
		const plural = Pluralize.plural(this.value);

		return singular === other.value || plural === other.value;
	}
}

function instance(collection) {
	collection.value = collection.value.map(
		({value, namespace}) => new Item(value, namespace)
	);

	return collection;
}

Canonicalized.instance = instance;
