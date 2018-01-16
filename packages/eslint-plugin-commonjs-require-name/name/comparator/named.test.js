const Collection = require('../collection');
const Named = require('./named');

describe('Named', () => {
	describe('.instance', () => {
		test('name', () => {
			expect(
				Named.instance(Collection.Items.instance('space/name')).equals(
					Collection.Items.instance('name')
				)
			).toBe(true);
		});

		test('no name', () => {
			const collection = Collection.Items.instance('space/name');
			collection.value.forEach(item => Object.assign(item, {namespace: true}));

			expect(
				Named.instance(collection).equals(Collection.Items.instance('space'))
			).toBe(false);
		});

		test('no matching name', () => {
			expect(
				Named.instance(Collection.Items.instance('space/name')).equals(
					Collection.Items.instance('other')
				)
			).toBe(false);
		});

		test('partial matching name', () => {
			expect(
				Named.instance(Collection.Items.instance('space/name-thing')).equals(
					Collection.Items.instance('name')
				)
			).toBe(false);
		});

		test('redundant name', () => {
			expect(
				Named.instance(
					Collection.Items.instance('space/name-separator-name')
				).equals(Collection.Items.instance('nameSeparatorName'))
			).toBe(true);
		});
	});
});
