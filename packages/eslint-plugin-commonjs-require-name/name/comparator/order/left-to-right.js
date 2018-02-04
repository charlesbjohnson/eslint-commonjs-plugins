const LeftToRight = exports;

function instance() {
	return {
		compare(actual, expected) {
			if (strict(actual, expected)) {
				return true;
			}

			return loose(actual, expected);
		},

		error() {
			return 'order left-to-right: out of order token matches';
		}
	};
}

function same(actual, expected) {
	for (let i = 0; i < expected.length(); i++) {
		if (!expected.index(i).equals(actual.index(i))) {
			return false;
		}
	}

	return true;
}

function strict(actual, expected) {
	if (expected.length() !== actual.length()) {
		return false;
	}

	if (same(expected.sort(), actual.sort())) {
		return same(actual, expected);
	}
}

function loose(actual, expected) {
	let start = -1;

	for (const item of expected) {
		const index = actual.indexOf({left: item});
		if (index < 0) {
			continue;
		}

		if (start < 0) {
			start = index;
		}

		if (index < start || index - start > 0) {
			return false;
		}

		actual = actual.pullAt(index);
	}

	return true;
}

LeftToRight.instance = instance;
