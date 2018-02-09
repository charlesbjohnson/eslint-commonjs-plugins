const UpperFirst = require('./upper-first');

describe('UpperFirst', () => {
	describe('.register', () => {
		test('key', () => {
			expect(UpperFirst.register()).toHaveProperty('upper-first', UpperFirst);
		});
	});

	describe('#check', () => {
		test('correct ', () => {
			['Upper', 'Upperfirst'].forEach(s => {
				expect(UpperFirst.instance().check(s)).toBe(true);
			});
		});

		test('incorrect', () => {
			['upper', 'upperFirst'].forEach(s => {
				expect(UpperFirst.instance().check(s)).toBe(false);
			});
		});
	});

	describe('#error', () => {
		test('message', () => {
			expect(UpperFirst.instance().error()).toMatch('upper-first:');
		});
	});
});
