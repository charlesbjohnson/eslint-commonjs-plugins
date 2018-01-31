const IntersectionWith = require('lodash.intersectionwith');

const Collection = require('../collection');

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

function instance(collection, type) {
	collection.equals = equals(collection.equals, type);
	return collection;
}

function equals(fn, type) {
	return function(other) {
		const kind = type === Any ? unordered : ordered;
		return kind.call(this, other) && fn.call(this, other);
	};
}

function ordered(other) {
	if (strict.call(this, other)) {
		return true;
	}

	return loose.call(this, other);
}

function strict(other) {
	if (this.value.length !== other.value.length) {
		return false;
	}

	const sort = v => v.slice().sort((a, b) => a.compare(b));
	const same = (lefts, rights) => {
		for (let i = 0; i < lefts.length; i++) {
			if (!lefts[i].equals(rights[i])) {
				return false;
			}
		}

		return true;
	};

	if (same(sort(this.value), sort(other.value))) {
		return same(this.value, other.value);
	}
}

function loose(other) {
	const lefts = this.value;
	const rights = other.value.slice();

	let prev = -1;
	for (const left of lefts) {
		const index = rights.findIndex(right => left.equals(right));
		if (index < 0) {
			continue;
		}

		if (prev < 0) {
			prev = index;
			continue;
		}

		if (index < prev || index - prev > 1) {
			return false;
		}

		rights[index] = Collection.Item.instance('', false);
		prev = index;
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
