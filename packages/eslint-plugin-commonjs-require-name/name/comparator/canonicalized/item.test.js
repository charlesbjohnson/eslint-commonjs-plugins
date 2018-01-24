const Collection = require('../../collection');
const Item = require('./item');

describe('Item', () => {
	describe('#equals', () => {
		test('namespace same value', () => {
			expect(
				Item.instance('namespaces', true).equals(
					Collection.Item.instance('namespace', false)
				)
			).toBe(true);
		});

		test('namespace different value', () => {
			expect(
				Item.instance('namespaces', true).equals(
					Collection.Item.instance('not', false)
				)
			).toBe(false);
		});

		test('non namespace', () => {
			expect(
				Item.instance('names', false).equals(
					Collection.Item.instance('name', false)
				)
			).toBe(false);
		});
	});
});
