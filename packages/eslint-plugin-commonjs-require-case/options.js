const DeepExtend = require('deep-extend');
const Get = require('lodash.get');

const Options = exports;

const SCHEMA = [
	{
		type: 'object',
		additionalProperties: false,
		properties: {
			disable: {
				type: 'array',
				items: {
					type: 'string'
				}
			},
			type: {
				type: 'string',
				enum: [
					'camel',
					'constant',
					'cram',
					'lower-first',
					'pascal',
					'snake',
					'upper-first'
				]
			}
		}
	}
];

function disabled() {
	return {
		disable: [],
		type: 'camel'
	};
}

function merge(...args) {
	return DeepExtend(...args);
}

function instance(options) {
	options = Get(options, 0);

	return merge(
		disabled(),
		{
			disable: ['^jquery$', '^lodash$', '^underscore$'],
			type: 'camel'
		},
		options
	);
}

Options.SCHEMA = SCHEMA;
Options.disabled = disabled;
Options.instance = instance;
Options.merge = merge;
