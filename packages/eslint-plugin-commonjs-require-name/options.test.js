const Options = require('./options');

describe('Options', () => {
	test('null', () => {
		[Options.local([null, {}]), Options.node([{}, null])].forEach(instance => {
			expect(instance).toBeNull();
		});
	});

	test('keys', () => {
		[
			Options.disabled(),
			Options.local([{}, null]),
			Options.node([null, {}])
		].forEach(instance => {
			expect(Object.keys(instance)).toEqual([
				'disable',
				'namespace',
				'order',
				'strict',
				'strip'
			]);

			expect(Object.keys(instance.namespace)).toEqual([
				'canonicalize',
				'separators'
			]);

			expect(Object.keys(instance.strict)).toEqual(['size', 'tokens']);
		});
	});

	test('override values', () => {
		const options = [{disable: ['local']}, {disable: ['node']}];

		const local = Options.local(options);
		const node = Options.node(options);

		expect(local.disable).toEqual(['local']);
		expect(node.disable).toEqual(['node']);
	});

	describe('.merge', () => {
		test('objects', () => {
			expect(Options.merge({a: 1}, {a: 3, b: 2})).toEqual({a: 3, b: 2});
		});

		test('destination object', () => {
			const obj = {};
			expect(Options.merge(obj, {a: 1})).toBe(obj);
		});

		test('source objects', () => {
			expect(Options.merge({a: 1}, {b: 2}, {c: 3}, {d: 4})).toEqual({
				a: 1,
				b: 2,
				c: 3,
				d: 4
			});
		});

		test('nested arrays', () => {
			expect(Options.merge({a: [1]}, {a: [2]})).toEqual({a: [2]});
		});
	});
});
