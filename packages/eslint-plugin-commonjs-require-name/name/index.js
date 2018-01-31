const EscapeRegExp = require('lodash.escaperegexp');

const Configuration = require('./configuration');

const Name = exports;

function validate(assignment, path, options) {
	if (options.disable.some(v => new RegExp(v).test(path))) {
		return {equal: true};
	}

	path = options.strip.reduce(
		(s, strip) => s.replace(new RegExp(strip, 'g'), ''),
		path
	);

	path = options.namespace.separators.reduce(
		(s, separator) => s.replace(new RegExp(EscapeRegExp(separator), 'g'), '/'),
		path
	);

	let configuration = Configuration.instance();

	configuration = Configuration.name(configuration);
	configuration = Configuration.order(configuration, options.order);

	if (options.strict.size) {
		configuration = Configuration.size(configuration);
	}

	if (options.strict.tokens) {
		configuration = Configuration.tokens(configuration);
	}

	if (options.namespace.canonicalize) {
		configuration = Configuration.canonicalize(configuration);
	}

	const equal = Configuration.comparator(configuration)(assignment, path);
	if (equal) {
		return {equal};
	}

	return {
		equal,
		value: {
			actual: Configuration.valuator()(assignment),
			expected: Configuration.valuator(configuration)(path)
		}
	};
}

Name.validate = validate;
