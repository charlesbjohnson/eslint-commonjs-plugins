const Configuration = require('./configuration');

describe('Configuration', () => {
	describe('.instance', () => {
		test('values', () => {
			expect(Configuration.instance().values).toHaveLength(0);
		});

		test('deduplicated', () => {
			expect(
				Configuration.name(
					Configuration.size(
						Configuration.name(Configuration.size(Configuration.instance()))
					)
				).values
			).toEqual(['Strict.Size', 'Named']);
		});
	});

	describe('.canonicalize', () => {
		test('values', () => {
			expect(
				Configuration.canonicalize(Configuration.instance()).values
			).toEqual(['Canonicalized']);
		});
	});

	describe('.name', () => {
		test('values', () => {
			expect(Configuration.name(Configuration.instance()).values).toEqual([
				'Named'
			]);
		});
	});

	describe('.order', () => {
		test('values', () => {
			expect(Configuration.order(Configuration.instance()).values).toEqual([
				'Ordered.LeftToRight'
			]);
		});
	});

	describe('.size', () => {
		test('values', () => {
			expect(Configuration.size(Configuration.instance()).values).toEqual([
				'Strict.Size'
			]);
		});
	});

	describe('.tokens', () => {
		test('values', () => {
			expect(Configuration.tokens(Configuration.instance()).values).toEqual([
				'Strict.Tokens'
			]);
		});
	});

	describe('.comparator', () => {
		test('same values', () => {
			expect(
				Configuration.comparator(Configuration.instance())('foo', 'foo')
			).toBe(true);
		});

		test('different values', () => {
			expect(
				Configuration.comparator(Configuration.size(Configuration.instance()))(
					'foo/bar',
					'bar'
				)
			).toBe(false);
		});
	});

	describe('.valuator', () => {
		test('configuration', () => {
			expect(
				Configuration.valuator(
					Configuration.order(Configuration.instance(), 'right-to-left')
				)('fooBar')
			).toEqual(['bar', 'foo']);
		});

		test('no configuration', () => {
			expect(Configuration.valuator()('fooBar')).toEqual(['foo', 'bar']);
		});
	});
});
