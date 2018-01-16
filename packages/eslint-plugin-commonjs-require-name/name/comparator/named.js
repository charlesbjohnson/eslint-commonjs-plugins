const Named = exports;

function equals(fn) {
	return function(other) {
		const lefts = this.value.filter(item => !item.namespace);
		if (lefts.length === 0) {
			return false;
		}

		const rights = other.value.slice();
		for (const left of lefts) {
			const index = rights.findIndex(right => left.equals(right));
			if (index < 0) {
				return false;
			}

			rights.splice(index, 1);
		}

		return fn.call(this, other);
	};
}

function instance(collection) {
	collection.equals = equals(collection.equals);
	return collection;
}

Named.instance = instance;
