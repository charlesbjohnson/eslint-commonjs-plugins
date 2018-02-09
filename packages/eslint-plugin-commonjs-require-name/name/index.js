const EscapeRegExp = require('lodash.escaperegexp');

const Configuration = require('./configuration');

const Name = exports;

function validate(assignment, name, options) {
	if (options.disable.some(v => new RegExp(v).test(name))) {
		return {equal: true, error: null};
	}

	name = options.strip.reduce(
		(s, strip) => s.replace(new RegExp(strip, 'g'), ''),
		name
	);

	name = options.namespace.separators.reduce(
		(s, separator) => s.replace(new RegExp(EscapeRegExp(separator), 'g'), '/'),
		name
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

	return Configuration.validate(configuration, assignment, name);
}

Name.validate = validate;
