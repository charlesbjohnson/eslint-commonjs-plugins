const Canonical = require('./');
const Collection = require('../../collection');
const Item = require('./item');

describe('Canonical', () => {
	describe('.instance', () => {
		test('type', () => {
			expect(
				[
					...Canonical.instance(Collection.Items.instance('space/thing/names'))
				].every(item => item instanceof Item)
			).toBe(true);
		});
	});
});
