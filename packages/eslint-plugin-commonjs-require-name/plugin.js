const Rule = require('./rule');

const Plugin = exports;

const CONFIGS = {
	recommended: {
		plugins: ['commonjs-require-name'],
		rules: {
			'commonjs-require-name/rule': 'error'
		}
	}
};

const RULES = {
	rule: Rule
};

Plugin.configs = CONFIGS;
Plugin.rules = RULES;
