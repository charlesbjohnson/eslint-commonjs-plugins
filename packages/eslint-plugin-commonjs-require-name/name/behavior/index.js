const Canonical = require('./canonical');

const Behavior = exports;

const Default = {
	instance(v) {
		return v;
	}
};

Behavior.Canonical = Canonical;
Behavior.Default = Default;
