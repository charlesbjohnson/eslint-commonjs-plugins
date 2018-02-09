const Snake = require('./snake');

describe('Snake', () => {
	describe('.register', () => {
		test('key', () => {
			expect(Snake.register()).toHaveProperty('snake', Snake);
		});
	});

	describe('#check', () => {
		test('correct ', () => {
			['snake', 'snake_case'].forEach(s => {
				expect(Snake.instance().check(s)).toBe(true);
			});
		});

		test('incorrect', () => {
			['SNAKE', 'SNAKE_CASE'].forEach(s => {
				expect(Snake.instance().check(s)).toBe(false);
			});
		});
	});

	describe('#error', () => {
		test('message', () => {
			expect(Snake.instance().error()).toMatch('snake:');
		});
	});
});
