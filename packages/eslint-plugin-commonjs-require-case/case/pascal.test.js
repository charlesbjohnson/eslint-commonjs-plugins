const Pascal = require('./pascal');

describe('Pascal', () => {
	describe('.register', () => {
		test('key', () => {
			expect(Pascal.register()).toHaveProperty('pascal', Pascal);
		});
	});

	describe('#check', () => {
		test('correct ', () => {
			['Pascal', 'PascalCase'].forEach(s => {
				expect(Pascal.instance().check(s)).toBe(true);
			});
		});

		test('incorrect', () => {
			['pascal', 'pascalCase'].forEach(s => {
				expect(Pascal.instance().check(s)).toBe(false);
			});
		});
	});

	describe('#error', () => {
		test('message', () => {
			expect(Pascal.instance().error()).toMatch('pascal:');
		});
	});
});
