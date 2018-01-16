const Item = require('./item');

describe('Item', () => {
	describe('.instance', () => {
		test('value', () => {
			expect(Item.instance('foo', false).value).toBe('foo');
		});

		test('namespace', () => {
			expect(Item.instance('foo', false).namespace).toBe(false);
		});
	});

	describe('#equals', () => {
		test('same value', () => {
			expect(
				Item.instance('foo', false).equals(Item.instance('foo', true))
			).toBe(true);
		});

		test('different value', () => {
			expect(
				Item.instance('foo', false).equals(Item.instance('bar', false))
			).toBe(false);
		});
	});
});
