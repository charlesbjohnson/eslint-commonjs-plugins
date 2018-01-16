const DifferenceWith = require('lodash.differencewith');

const Strict = exports;

const Size = {
	instance(collection) {
		collection.equals = size(collection.equals);
		return collection;
	}
};

const Tokens = {
	instance(collection) {
		collection.equals = tokens(collection.equals);
		return collection;
	}
};

function size(fn) {
	return function(other) {
		return this.value.length === other.value.length && fn.call(this, other);
	};
}

function tokens(fn) {
	return function(other) {
		return (
			DifferenceWith(other.value, this.value, (left, right) =>
				right.equals(left)
			).length === 0 && fn.call(this, other)
		);
	};
}

Strict.Size = Size;
Strict.Tokens = Tokens;
