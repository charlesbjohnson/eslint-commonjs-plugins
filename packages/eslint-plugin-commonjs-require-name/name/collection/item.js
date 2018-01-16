class Item {
	static instance(value, namespace) {
		return new this(value, namespace);
	}

	constructor(value, namespace) {
		this.value = value;
		this.namespace = namespace;
	}

	equals(other) {
		return this.value === other.value;
	}
}

module.exports = Item;
