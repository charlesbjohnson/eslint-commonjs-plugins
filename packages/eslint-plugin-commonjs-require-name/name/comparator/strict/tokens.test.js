const Collection = require('../../collection');
const Tokens = require('./tokens');

describe('Tokens', () => {
	describe('#compare', () => {
		test('same', () => {
			expect(
				Tokens.instance().compare(
					Collection.Items.instance('nameSpaceThing'),
					Collection.Items.instance('space/thing/name')
				)
			).toBe(true);
		});

		test('extra', () => {
			expect(
				Tokens.instance().compare(
					Collection.Items.instance('nameSpaceThingFoo'),
					Collection.Items.instance('space/thing/name')
				)
			).toBe(false);
		});
	});

	describe('#error', () => {
		test('message', () => {
			expect(Tokens.instance().error()).toMatch('strict tokens:');
		});
	});
});
