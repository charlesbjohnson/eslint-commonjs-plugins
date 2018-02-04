const Any = exports;

function instance() {
	return {
		compare(actual, expected) {
			actual = actual.sort();
			expected = expected.sort();

			for (const item of expected) {
				if (actual.indexOf({left: item}) >= 0) {
					return true;
				}
			}

			return false;
		},

		error() {
			return 'order any: no token matches';
		}
	};
}

Any.instance = instance;
