const IntersectionWith = require('lodash.intersectionwith');

const Ordered = exports;

const Any = {
	instance(collection) {
		return instance(collection, this);
	}
};

const LeftToRight = {
	instance(collection) {
		return instance(collection, this);
	}
};

const RightToLeft = {
	instance(collection) {
		collection.value.reverse();
		return instance(collection, this);
	}
};

function equals(fn, type) {
	return function(other) {
		const kind = type === Any ? unordered : ordered;
		return kind.call(this, other) && fn.call(this, other);
	};
}
function instance(collection, type) {
	collection.equals = equals(collection.equals, type);
	return collection;
}

function ordered(other) {
	if (this.value.length === other.value.length) {
		return orderedFromLeft.call(this, other);
	}

	return (
		orderedFromLeft.call(this, other) || orderedFromRight.call(this, other)
	);
}

function orderedFromLeft(other) {
	const length = Math.min(this.value.length, other.value.length);

	for (let i = 0; i < length; i++) {
		if (!this.value[i].equals(other.value[i])) {
			return false;
		}
	}

	return true;
}

function orderedFromRight(other) {
	let i = this.value.length - 1;
	let j = other.value.length - 1;

	while (i >= 0 && j >= 0) {
		if (!this.value[i].equals(other.value[j])) {
			return false;
		}

		i--;
		j--;
	}

	return true;
}

function unordered(other) {
	return (
		IntersectionWith(this.value, other.value, (left, right) =>
			left.equals(right)
		).length > 0
	);
}

Ordered.Any = Any;
Ordered.LeftToRight = LeftToRight;
Ordered.RightToLeft = RightToLeft;
