const Collection = require('../../collection');
const Size = require('./size');

describe('Size', () => {
	describe('#compare', () => {
		test('same length', () => {
			expect(
				Size.instance().compare(
					Collection.Items.instance('spaceName'),
					Collection.Items.instance('space/name')
				)
			).toBe(true);
		});

		test('different length', () => {
			expect(
				Size.instance().compare(
					Collection.Items.instance('name'),
					Collection.Items.instance('space/name')
				)
			).toBe(false);
		});
	});

	describe('#error', () => {
		test('message', () => {
			expect(Size.instance().error()).toMatch('strict size:');
		});
	});
});
