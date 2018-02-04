const LeftToRight = require('./left-to-right');

const RightToLeft = exports;

function instance() {
	return {
		compare(actual, expected) {
			return LeftToRight.instance().compare(actual, expected.reverse());
		},

		error() {
			return 'order right-to-left: out of order token matches';
		}
	};
}

RightToLeft.instance = instance;
