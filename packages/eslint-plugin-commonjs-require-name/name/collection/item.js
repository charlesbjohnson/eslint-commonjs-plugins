class Item {
	static instance(value, namespace) {
		return new this(value, namespace);
	}

	constructor(value, namespace) {
		this.value = value;
		this.namespace = namespace;
	}

	compare(other) {
		if (this.value < other.value) {
			return -1;
		}

		if (this.value > other.value) {
			return 1;
		}

		return 0;
	}

	equals(other) {
		return this.compare(other) === 0;
	}
}

module.exports = Item;
