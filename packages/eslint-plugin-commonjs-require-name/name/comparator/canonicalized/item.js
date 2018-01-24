const Pluralize = require('pluralize');
const Collection = require('../../collection');

class Item extends Collection.Item {
	equals(other) {
		if (!this.namespace) {
			return super.equals(other);
		}

		const singular = Pluralize.singular(this.value);
		const plural = Pluralize.plural(this.value);

		return singular === other.value || plural === other.value;
	}
}

module.exports = Item;
