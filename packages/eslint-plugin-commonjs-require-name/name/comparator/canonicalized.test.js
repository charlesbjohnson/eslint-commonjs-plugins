const Collection = require('../collection');
const Canonicalized = require('./canonicalized');

describe('Canonicalized', () => {
	describe('.instance', () => {
		test('name', () => {
			expect(
				Canonicalized.instance(
					Collection.Items.instance('names')
				).value[0].equals(Collection.Items.instance('name').value[0])
			).toBe(false);
		});

		test('namespace', () => {
			expect(
				Canonicalized.instance(
					Collection.Items.instance('spaces/name')
				).value[0].equals(Collection.Items.instance('spaceName').value[0])
			).toBe(true);
		});
	});
});
