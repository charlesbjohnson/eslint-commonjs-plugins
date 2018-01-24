const Collection = require('../../collection');
const Item = require('./item');

const Canonicalized = require('./');

describe('Canonicalized', () => {
	describe('.instance', () => {
		test('type', () => {
			expect(
				Canonicalized.instance(
					Collection.Items.instance('space/thing/names')
				).value.every(item => item instanceof Item)
			).toBe(true);
		});
	});
});
