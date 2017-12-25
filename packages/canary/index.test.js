const Canary = require('./');

describe('Canary', () => {
	describe('.tweet', () => {
		test('once', () => {
			expect(Canary.tweet()).toBe('tweet');
		});

		test('twice', () => {
			expect(Canary.tweet(true)).toBe('tweet tweet');
		});
	});
});
