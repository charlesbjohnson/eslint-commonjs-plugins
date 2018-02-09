const Constant = require('./constant');

describe('Constant', () => {
	describe('.register', () => {
		test('key', () => {
			expect(Constant.register()).toHaveProperty('constant', Constant);
		});
	});

	describe('#check', () => {
		test('correct ', () => {
			['CONSTANT', 'CONSTANT_CASE'].forEach(s => {
				expect(Constant.instance().check(s)).toBe(true);
			});
		});

		test('incorrect', () => {
			['constant', 'constant_case'].forEach(s => {
				expect(Constant.instance().check(s)).toBe(false);
			});
		});
	});

	describe('#error', () => {
		test('message', () => {
			expect(Constant.instance().error()).toMatch('constant:');
		});
	});
});
