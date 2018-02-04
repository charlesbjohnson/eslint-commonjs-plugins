const MergeWith = require('lodash.mergewith');

const Name = require('./');
const Options = require('../options');

describe('Name', () => {
	describe('.validate', () => {
		test('disable option', () => {
			const result = Name.validate(
				'_',
				'lodash',
				MergeWith(Options.disabled(), {disable: ['^lodash$']})
			);

			expect(result.equal).toBe(true);
			expect(result.error).toBeNull();
		});

		test('strip option', () => {
			const result = Name.validate(
				'spaceName',
				'space.io/name',
				MergeWith(Options.disabled(), {strip: ['.io']})
			);

			expect(result.equal).toBe(true);
			expect(result.error).toBeNull();
		});

		test('name', () => {
			const result = Name.validate(
				'spaceThing',
				'space/thing/name',
				Options.disabled()
			);

			expect(result.equal).toBe(false);
			expect(result.error).not.toBeNull();
		});

		test('order', () => {
			const result = Name.validate(
				'not',
				'space/thing/name',
				Options.disabled()
			);

			expect(result.equal).toBe(false);
			expect(result.error).not.toBeNull();
		});

		test('order option', () => {
			const result = Name.validate(
				'nameThingSpace',
				'space/thing/name',
				MergeWith(Options.disabled(), {order: 'right-to-left'})
			);

			expect(result.equal).toBe(true);
			expect(result.error).toBeNull();
		});

		test('strict size option', () => {
			const result = Name.validate(
				'thingName',
				'space/thing/name',
				MergeWith(Options.disabled(), {strict: {size: true}})
			);

			expect(result.equal).toBe(false);
			expect(result.error).not.toBeNull();
		});

		test('strict tokens option', () => {
			const result = Name.validate(
				'nameFoo',
				'space/thing/name',
				MergeWith(Options.disabled(), {
					order: 'any',
					strict: {tokens: true}
				})
			);

			expect(result.equal).toBe(false);
			expect(result.error).not.toBeNull();
		});

		test('namespace canonicalize option', () => {
			const result = Name.validate(
				'spaceName',
				'spaces/name',
				MergeWith(Options.disabled(), {namespace: {canonicalize: true}})
			);

			expect(result.equal).toBe(true);
			expect(result.error).toBeNull();
		});

		test('namespace separators option', () => {
			const result = Name.validate(
				'spaceName',
				'space-X-name',
				MergeWith(Options.disabled(), {namespace: {separators: ['-X-']}})
			);

			expect(result.equal).toBe(true);
			expect(result.error).toBeNull();
		});

		test('composition', () => {
			const result = Name.validate(
				'scopeThingName',
				'scope.lol-things/name',
				MergeWith(Options.disabled(), {
					namespace: {
						separators: ['.'],
						canonicalize: true
					},
					order: 'left-to-right',
					strict: {
						size: true,
						tokens: true
					},
					strip: ['.lol']
				})
			);

			expect(result.equal).toBe(true);
			expect(result.error).toBeNull();
		});
	});
});
