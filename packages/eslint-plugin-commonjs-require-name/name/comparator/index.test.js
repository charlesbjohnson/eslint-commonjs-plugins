const Comparator = require('./');

describe('Comparator.Default', () => {
	describe('.instance', () => {
		test('keys', () => {
			expect(Object.keys(Comparator.Default.instance())).toEqual([
				'compare',
				'error'
			]);
		});
	});

	describe('#compare', () => {
		test('result', () => {
			expect(Comparator.Default.instance().compare()).toBe(true);
		});
	});

	describe('#error', () => {
		test('result', () => {
			expect(Comparator.Default.instance().error()).toBeNull();
		});
	});
});
