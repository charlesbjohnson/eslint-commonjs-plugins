const Collection = require('../collection');
const Name = require('./name');

describe('Name', () => {
	describe('#compare', () => {
		test('matching name items', () => {
			expect(
				Name.instance().compare(
					Collection.Items.instance('name'),
					Collection.Items.instance('space/name')
				)
			).toBe(true);
		});

		test('no name items', () => {
			const expected = Collection.Items.instance('name');
			for (const item of expected) {
				item.namespace = true;
			}

			expect(
				Name.instance().compare(Collection.Items.instance('name'), expected)
			).toBe(false);
		});

		test('mismatch number of name items', () => {
			expect(
				Name.instance().compare(
					Collection.Items.instance('name'),
					Collection.Items.instance('space/name-thing')
				)
			).toBe(false);
		});

		test('no matching name items', () => {
			expect(
				Name.instance().compare(
					Collection.Items.instance('space'),
					Collection.Items.instance('space/name')
				)
			).toBe(false);
		});

		test('partial matching name items', () => {
			expect(
				Name.instance().compare(
					Collection.Items.instance('spaceName'),
					Collection.Items.instance('space/name-thing')
				)
			).toBe(false);
		});

		test('redundant name items', () => {
			expect(
				Name.instance().compare(
					Collection.Items.instance('nameThing'),
					Collection.Items.instance('space/name-thing-name')
				)
			).toBe(false);
		});
	});

	describe('#error', () => {
		test('message', () => {
			expect(Name.instance().error()).toMatch('name:');
		});
	});
});
