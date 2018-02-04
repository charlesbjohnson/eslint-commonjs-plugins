const Name = require('./name');
const Order = require('./order');
const Strict = require('./strict');

const Comparator = exports;

const Default = {
	instance() {
		return {
			compare() {
				return true;
			},

			error() {
				return null;
			}
		};
	}
};

Comparator.Default = Default;
Comparator.Name = Name;
Comparator.Order = Order;
Comparator.Strict = Strict;
