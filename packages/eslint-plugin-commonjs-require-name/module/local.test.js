const Path = require('path');
const Local = require('./local');

function absolute(path) {
	return Path.resolve(__dirname, path);
}

describe('Local', () => {
	describe('.resolve', () => {
		test('file extension', () => {
			[
				['../test/fixture/index.js', './alpha.js', 'alpha'],
				['../test/fixture/index.js', './zeta.json', 'zeta']
			].forEach(([file, path, expected]) => {
				expect(Local.resolve(absolute(file), path)).toBe(expected);
			});
		});

		test('sibling', () => {
			[
				['../test/fixture/index.js', './alpha', 'alpha'],
				['../test/fixture/beta/gamma.js', './', 'beta'],
				['../test/fixture/beta/gamma.js', './index', 'beta']
			].forEach(([file, path, expected]) => {
				expect(Local.resolve(absolute(file), path)).toBe(expected);
			});
		});

		test('child', () => {
			[
				['../test/fixture/index.js', './beta/gamma', 'beta/gamma'],
				['../test/fixture/index.js', './beta', 'beta'],
				['../test/fixture/index.js', './beta/index', 'beta']
			].forEach(([file, path, expected]) => {
				expect(Local.resolve(absolute(file), path)).toBe(expected);
			});
		});

		test('parent', () => {
			[
				['../test/fixture/beta/index.js', '../alpha', 'alpha'],
				['../test/fixture/beta/delta/index.js', '../', 'beta'],
				['../test/fixture/beta/delta/index.js', '../index', 'beta']
			].forEach(([file, path, expected]) => {
				expect(Local.resolve(absolute(file), path)).toBe(expected);
			});
		});

		test('denormalized child', () => {
			[
				['../test/fixture/index.js', './beta/delta/../../alpha', 'alpha'],
				['../test/fixture/index.js', './beta/delta/../', 'beta'],
				['../test/fixture/index.js', './beta/delta/../index', 'beta']
			].forEach(([file, path, expected]) => {
				expect(Local.resolve(absolute(file), path)).toBe(expected);
			});
		});

		test('denormalized parent', () => {
			[
				['../test/fixture/beta/index.js', '../beta/gamma', 'gamma'],
				['../test/fixture/beta/index.js', '../beta/delta/..', 'beta'],
				['../test/fixture/beta/index.js', '../beta/delta/../index', 'beta']
			].forEach(([file, path, expected]) => {
				expect(Local.resolve(absolute(file), path)).toBe(expected);
			});
		});

		test('child package', () => {
			[
				['../test/fixture/index.js', './nested/package/file', 'package/file'],
				['../test/fixture/index.js', './nested/package', 'package'],
				['../test/fixture/index.js', './nested/package/index', 'package']
			].forEach(([file, path, expected]) => {
				expect(Local.resolve(absolute(file), path)).toBe(expected);
			});
		});

		test('parent package', () => {
			expect(
				Local.resolve(
					absolute('../test/fixture/index.js'),
					absolute('../../../package.json')
				)
			).toBe('eslint-module-plugins/package');
		});

		test('same package absolute', () => {
			expect(
				Local.resolve(
					absolute('../test/fixture/index.js'),
					absolute('../test/fixture/alpha.js')
				)
			).toBe('alpha');
		});
	});

	describe('.test', () => {
		test('relative path', () => {
			expect(Local.test('./path')).toBe(true);
		});

		test('absolute path', () => {
			expect(Local.test('/path')).toBe(true);
		});

		test('module', () => {
			expect(Local.test('module')).toBe(false);
		});

		test('non string', () => {
			[null, undefined, false, 0, {}, Symbol('')].forEach(v => {
				expect(Local.test(v)).toBe(false);
			});
		});
	});
});
