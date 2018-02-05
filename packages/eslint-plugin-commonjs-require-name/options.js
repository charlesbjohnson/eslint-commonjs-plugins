const Get = require('lodash.get');
const MergeWith = require('lodash.mergewith');

const Options = exports;

const TYPE_SCHEMA = {
	type: 'object',
	additionalProperties: false,
	properties: {
		disable: {
			type: 'array',
			items: {
				type: 'string'
			}
		},
		namespace: {
			type: 'object',
			additionalProperties: false,
			properties: {
				canonicalize: {
					type: 'boolean'
				},
				separators: {
					type: 'array',
					items: {
						type: 'string'
					}
				}
			}
		},
		order: {
			type: 'string',
			enum: ['any', 'left-to-right', 'right-to-left']
		},
		strict: {
			type: 'object',
			additionalProperties: false,
			properties: {
				size: {
					type: 'boolean'
				},
				tokens: {
					type: 'boolean'
				}
			}
		},
		strip: {
			type: 'array',
			items: {
				type: 'string'
			}
		}
	}
};

const SCHEMA = [
	{oneOf: [{type: 'null'}, TYPE_SCHEMA]},
	{oneOf: [{type: 'null'}, TYPE_SCHEMA]}
];

function merge(dest, ...sources) {
	return MergeWith(dest, ...sources, (l, r) => {
		if (Array.isArray(l)) {
			return r;
		}
	});
}

function disabled() {
	return {
		disable: [],
		namespace: {
			canonicalize: false,
			separators: []
		},
		order: 'any',
		strict: {
			size: false,
			tokens: false
		},
		strip: []
	};
}

function local(options) {
	options = Get(options, 0);
	if (!options) {
		return null;
	}

	return merge(
		disabled(),
		{
			namespace: {
				canonicalize: true
			},
			strict: {
				tokens: true
			}
		},
		options
	);
}

function node(options) {
	options = Get(options, 1);
	if (!options) {
		return null;
	}

	return merge(
		disabled(),
		{
			disable: ['^bluebird$', '^jquery$', '^lodash$', '^underscore$'],
			namespace: {
				separators: ['.']
			},
			order: 'left-to-right',
			strict: {
				tokens: true
			},
			strip: ['.js', '.css', '.com', '.org', '.io']
		},
		options
	);
}

Options.SCHEMA = SCHEMA;
Options.disabled = disabled;
Options.local = local;
Options.merge = merge;
Options.node = node;
