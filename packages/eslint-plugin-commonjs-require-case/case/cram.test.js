const Cram = require('./cram');

describe('Cram', () => {
	describe('.register', () => {
		test('key', () => {
			expect(Cram.register()).toHaveProperty('cram', Cram);
		});
	});

	describe('#check', () => {
		test('correct ', () => {
			['cram', 'cramcase'].forEach(s => {
				expect(Cram.instance().check(s)).toBe(true);
			});
		});

		test('incorrect', () => {
			['CRAM', 'cram_case'].forEach(s => {
				expect(Cram.instance().check(s)).toBe(false);
			});
		});
	});

	describe('#error', () => {
		test('message', () => {
			expect(Cram.instance().error()).toMatch('cram:');
		});
	});
});
