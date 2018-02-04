const Behavior = require('./');
const Collection = require('../collection');

describe('Behavior.Default', () => {
	describe('.instance', () => {
		test('identity', () => {
			const instance = Collection.Items.instance('name');
			expect(Behavior.Default.instance(instance)).toBe(instance);
		});
	});
});
