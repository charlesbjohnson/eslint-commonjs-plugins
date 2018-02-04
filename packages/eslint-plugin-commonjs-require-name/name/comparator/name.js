const Name = exports;

function instance() {
	return {
		compare(actual, expected) {
			expected = expected.names();

			if (expected.length() === 0 || expected.length() > actual.length()) {
				return false;
			}

			actual = actual.sort();
			expected = expected.sort();

			for (const item of expected) {
				const index = actual.indexOf({left: item});
				if (index < 0) {
					return false;
				}

				actual = actual.pullAt(index);
			}

			return true;
		},

		error() {
			return 'name: missing name token(s)';
		}
	};
}

Name.instance = instance;
