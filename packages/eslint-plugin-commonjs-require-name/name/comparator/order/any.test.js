const Any = require('./any');
const Collection = require('../../collection');

describe('Any', () => {
	describe('#compare', () => {
		test('same', () => {
			expect(
				Any.instance().compare(
					Collection.Items.instance('nameSpaceThing'),
					Collection.Items.instance('space/thing/name')
				)
			).toBe(true);
		});

		test('missing', () => {
			expect(
				Any.instance().compare(
					Collection.Items.instance('nameSpace'),
					Collection.Items.instance('space/thing/name')
				)
			).toBe(true);
		});

		test('extra', () => {
			expect(
				Any.instance().compare(
					Collection.Items.instance('nameSpaceThingFoo'),
					Collection.Items.instance('space/thing/name')
				)
			).toBe(true);
		});

		test('none', () => {
			expect(
				Any.instance().compare(
					Collection.Items.instance('foo'),
					Collection.Items.instance('space/thing/name')
				)
			).toBe(false);
		});
	});

	describe('#error', () => {
		test('message', () => {
			expect(Any.instance().error()).toMatch('order any:');
		});
	});
});
