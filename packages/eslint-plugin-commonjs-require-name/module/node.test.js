const Node = require('./node');

describe('Node', () => {
	describe('.resolve', () => {
		test('normal', () => {
			expect(Node.resolve('module')).toBe('module');
		});

		test('scoped', () => {
			expect(Node.resolve('@scope/module')).toBe('scope/module');
		});

		test('path', () => {
			expect(Node.resolve('module/nested/path')).toBe('module/nested/path');
		});

		test('path file extension', () => {
			expect(Node.resolve('module/path.js')).toBe('module/path');
		});

		test('path trailing slash', () => {
			expect(Node.resolve('module/path/')).toBe('module/path');
		});

		test('vanity extension', () => {
			expect(Node.resolve('module.js')).toBe('module.js');
		});

		test('scope vanity extension', () => {
			expect(Node.resolve('@scope/module.js')).toBe('scope/module.js');
		});

		test('vanity scope extension', () => {
			expect(Node.resolve('@scope.js/module')).toBe('scope.js/module');
		});
	});

	describe('.test', () => {
		test('normal', () => {
			expect(Node.test('module')).toBe(true);
		});

		test('scoped', () => {
			expect(Node.test('@scope/module')).toBe(true);
		});

		test('builtin', () => {
			expect(Node.test('child_process')).toBe(true);
		});

		test('path', () => {
			expect(Node.test('module/nested/path')).toBe(true);
		});

		test('non string', () => {
			[null, undefined, false, 0, {}, Symbol('')].forEach(v => {
				expect(Node.test(v)).toBe(false);
			});
		});
	});
});
