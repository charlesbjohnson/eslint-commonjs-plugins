const Path = require('path');

const IsPathInside = require('is-path-inside');
const IsValidPath = require('is-valid-path');
const PkgDir = require('pkg-dir');

const Local = exports;

function resolve(from, to) {
	from = Path.parse(Path.resolve(from)).dir;

	if (!Path.isAbsolute(to)) {
		to = Path.resolve(from, to);
	}

	to = to
		.replace(new RegExp(`${Path.extname(to)}$`), '')
		.replace(new RegExp(`(${Path.sep})?index$`), '');

	if (from === to) {
		return Path.parse(from).name;
	}

	const pkg = PkgDir.sync(to);
	if (PkgDir.sync(from) !== pkg) {
		return Path.relative(Path.parse(pkg).dir, to);
	}

	if (IsPathInside(to, from)) {
		return Path.relative(from, to);
	}

	return Path.parse(to).name;
}

function test(string) {
	if (typeof string !== 'string') {
		return false;
	}

	return /^\.|^\//.test(string) && IsValidPath(string);
}

Local.resolve = resolve;
Local.test = test;
