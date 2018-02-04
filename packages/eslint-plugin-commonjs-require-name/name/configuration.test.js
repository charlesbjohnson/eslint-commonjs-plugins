const Configuration = require('./configuration');

describe('Configuration', () => {
	describe('.instance', () => {
		test('values', () => {
			expect([...Configuration.instance()]).toHaveLength(0);
		});

		test('deduplication', () => {
			expect([
				...Configuration.name(
					Configuration.size(
						Configuration.name(Configuration.size(Configuration.instance()))
					)
				)
			]).toEqual(['Strict.Size', 'Name']);
		});
	});

	describe('.canonicalize', () => {
		test('values', () => {
			expect([...Configuration.canonicalize(Configuration.instance())]).toEqual(
				['Canonical']
			);
		});
	});

	describe('.name', () => {
		test('values', () => {
			expect([...Configuration.name(Configuration.instance())]).toEqual([
				'Name'
			]);
		});
	});

	describe('.order', () => {
		test('values', () => {
			expect([...Configuration.order(Configuration.instance())]).toEqual([
				'Order.LeftToRight'
			]);
		});
	});

	describe('.size', () => {
		test('values', () => {
			expect([...Configuration.size(Configuration.instance())]).toEqual([
				'Strict.Size'
			]);
		});
	});

	describe('.tokens', () => {
		test('values', () => {
			expect([...Configuration.tokens(Configuration.instance())]).toEqual([
				'Strict.Tokens'
			]);
		});
	});

	describe('.comparator', () => {
		test('same values', () => {
			const result = Configuration.validate(
				Configuration.instance(),
				'foo',
				'foo'
			);

			expect(result.equal).toBe(true);
			expect(result.error).toBeNull();
		});

		test('different values', () => {
			const result = Configuration.validate(
				Configuration.size(Configuration.instance()),
				'bar',
				'foo/bar'
			);

			expect(result.equal).toBe(false);
			expect(result.error).not.toBeNull();
		});
	});
});
