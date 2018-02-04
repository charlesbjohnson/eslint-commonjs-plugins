const Size = exports;

function instance() {
	return {
		compare(actual, expected) {
			return actual.length() === expected.length();
		},

		error() {
			return 'strict size: mismatched number of tokens';
		}
	};
}

Size.instance = instance;
