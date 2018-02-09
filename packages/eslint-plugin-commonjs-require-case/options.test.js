const Options = require('./options');

describe('Options', () => {
	test('keys', () => {
		[Options.disabled(), Options.instance([{}])].forEach(instance => {
			expect(Object.keys(instance)).toEqual(['disable', 'type']);
		});
	});
});
