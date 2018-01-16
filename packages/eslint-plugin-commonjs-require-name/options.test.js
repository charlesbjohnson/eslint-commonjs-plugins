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
});
