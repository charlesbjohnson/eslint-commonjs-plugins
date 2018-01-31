const NoCase = require('no-case');

const Item = require('./item');

class Items {
	static instance(string) {
		return new this(string);
	}

	constructor(string) {
		this.value = [];
		if (!string) {
			return;
		}

		const itemize = (s, namespace) => {
			return NoCase(s)
				.split(' ')
				.map(value => Item.instance(value, namespace));
		};

		const parts = string.split('/');
		const name = parts[parts.length - 1];
		const namespaces = parts.slice(0, -1);

		this.value = namespaces
			.reduce(
				(accumulator, namespace) =>
					accumulator.concat(itemize(namespace, true)),
				[]
			)
			.concat(itemize(name, false));
	}

	equals(other) {
		return other instanceof Items;
	}

	values() {
		return this.value.map(item => item.value);
	}
}

module.exports = Items;
