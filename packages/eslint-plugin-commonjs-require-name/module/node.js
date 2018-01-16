const Path = require('path');

const EscapeRegExp = require('lodash.escaperegexp');
const Get = require('lodash.get');
const ValidateNPMPackageName = require('validate-npm-package-name');

const SCOPE = '(?:@([^/]+?)[/])?';
const NAME = '([^/]+?)';
const PATH = '(/.*)?';
const REGEXP = new RegExp(`^${SCOPE}${NAME}${PATH}$`);

const Node = exports;

function parse(string) {
	const match = string.match(REGEXP);
	return {
		scope: Get(match, 1, ''),
		name: Get(match, 2, ''),
		path: Get(match, 3, '')
	};
}

function join(scope, name, path) {
	const parts = [name, path];

	if (scope) {
		parts.unshift(`@${scope}`);
	}

	return Path.join(...parts);
}

function resolve(string) {
	let {scope, name, path} = parse(string);

	path = path.replace(new RegExp(`${EscapeRegExp(Path.extname(path))}$`), '');
	const result = Path.normalize(
		join(scope, name, path)
			.replace(/^@/, '')
			.replace(/\/$/, '')
	);

	return result;
}

function test(string) {
	if (typeof string !== 'string') {
		return false;
	}

	const {scope, name} = parse(string);
	const {validForNewPackages, validForOldPackages} = ValidateNPMPackageName(
		join(scope, name, '')
	);

	return validForNewPackages || validForOldPackages;
}

Node.resolve = resolve;
Node.test = test;
