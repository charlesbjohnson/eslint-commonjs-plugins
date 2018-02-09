const Camel = require('./camel');

describe('Camel', () => {
	describe('.register', () => {
		test('key', () => {
			expect(Camel.register()).toHaveProperty('camel', Camel);
		});
	});

	describe('#check', () => {
		test('correct ', () => {
			['camel', 'camelCase'].forEach(s => {
				expect(Camel.instance().check(s)).toBe(true);
			});
		});

		test('incorrect', () => {
			['Camel', 'CamelCase'].forEach(s => {
				expect(Camel.instance().check(s)).toBe(false);
			});
		});
	});

	describe('#error', () => {
		test('message', () => {
			expect(Camel.instance().error()).toMatch('camel:');
		});
	});
});
