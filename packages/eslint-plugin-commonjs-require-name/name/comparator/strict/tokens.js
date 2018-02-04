const Tokens = exports;

function instance() {
	return {
		compare(actual, expected) {
			actual = actual.sort();
			expected = expected.sort();

			for (const item of actual) {
				if (expected.indexOf({right: item}) < 0) {
					return false;
				}
			}

			return true;
		},

		error() {
			return 'strict tokens: unexpected additional token';
		}
	};
}

Tokens.instance = instance;
