const Rule = require('./rule');

const Plugin = exports;

const CONFIGS = {
	recommended: {
		plugins: ['commonjs-require-case'],
		rules: {
			'commonjs-require-case/rule': 'error'
		}
	}
};

const RULES = {
	rule: Rule
};

Plugin.configs = CONFIGS;
Plugin.rules = RULES;
