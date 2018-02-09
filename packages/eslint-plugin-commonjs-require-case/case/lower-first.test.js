const LowerFirst = require('./lower-first');

describe('LowerFirst', () => {
	describe('.register', () => {
		test('key', () => {
			expect(LowerFirst.register()).toHaveProperty('lower-first', LowerFirst);
		});
	});

	describe('#check', () => {
		test('correct ', () => {
			['lower', 'lowerFIRST'].forEach(s => {
				expect(LowerFirst.instance().check(s)).toBe(true);
			});
		});

		test('incorrect', () => {
			['Lower', 'LowerFirst'].forEach(s => {
				expect(LowerFirst.instance().check(s)).toBe(false);
			});
		});
	});

	describe('#error', () => {
		test('message', () => {
			expect(LowerFirst.instance().error()).toMatch('lower-first:');
		});
	});
});
