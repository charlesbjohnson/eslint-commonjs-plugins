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

	describe('#compare', () => {
		test('less', () => {
			expect(
				Item.instance('bar', false).compare(Item.instance('foo', true))
			).toBe(-1);
		});

		test('greater', () => {
			expect(
				Item.instance('foo', false).compare(Item.instance('bar', true))
			).toBe(1);
		});

		test('equal', () => {
			expect(
				Item.instance('foo', false).compare(Item.instance('foo', true))
			).toBe(0);
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
