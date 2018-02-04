const NoCase = require('no-case');

const Item = require('./item');

class Items {
	static instance(string) {
		return new this(string);
	}

	constructor(string) {
		this._value = [];

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

		this._value = namespaces
			.reduce(
				(accumulator, namespace) =>
					accumulator.concat(itemize(namespace, true)),
				[]
			)
			.concat(itemize(name, false));
	}

	*[Symbol.iterator]() {
		yield* this._value;
	}

	clone() {
		const result = new this.constructor();
		result._value = this._value.slice();
		return result;
	}

	indexOf(options) {
		const {left, right} = Object.assign(
			{
				left: null,
				right: null
			},
			options
		);

		if (!left && !right) {
			return -1;
		}

		return this._value.findIndex(v => {
			if (right) {
				return v.equals(right);
			}

			return left.equals(v);
		});
	}

	index(i) {
		return this._value[i];
	}

	length() {
		return this._value.length;
	}

	names() {
		const result = this.clone();
		result._value = this._value.filter(item => !item.namespace);
		return result;
	}

	pullAt(i) {
		const result = this.clone();
		result._value.splice(i, 1);
		return result;
	}

	reverse() {
		const result = this.clone();
		result._value.reverse();
		return result;
	}

	sort() {
		const result = this.clone();
		result._value.sort((a, b) => a.compare(b));
		return result;
	}
}

module.exports = Items;
