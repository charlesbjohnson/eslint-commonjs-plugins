const Collection = require('../collection');
const Strict = require('./strict');

describe('Strict.Size', () => {
	describe('.instance', () => {
		test('same length', () => {
			expect(
				Strict.Size.instance(Collection.Items.instance('space/name')).equals(
					Collection.Items.instance('spaceName')
				)
			).toBe(true);
		});

		test('different length', () => {
			expect(
				Strict.Size.instance(Collection.Items.instance('space/name')).equals(
					Collection.Items.instance('name')
				)
			).toBe(false);
		});
	});
});

describe('Strict.Tokens', () => {
	describe('.instance', () => {
		test('same', () => {
			expect(
				Strict.Tokens.instance(Collection.Items.instance('name')).equals(
					Collection.Items.instance('name')
				)
			).toBe(true);
		});

		test('extraneous', () => {
			expect(
				Strict.Tokens.instance(Collection.Items.instance('name')).equals(
					Collection.Items.instance('notName')
				)
			).toBe(false);
		});
	});
});
