const MergeWith = require('lodash.mergewith');
const Options = require('../options');
const Name = require('./');

describe('Name', () => {
	describe('.validate', () => {
		test('disable option', () => {
			expect(
				Name.validate(
					'_',
					'lodash',
					MergeWith(Options.disabled(), {disable: ['^lodash$']})
				)
			).toEqual({equal: true});
		});

		test('strip option', () => {
			expect(
				Name.validate(
					'spaceName',
					'space.io/name',
					MergeWith(Options.disabled(), {strip: ['.io']})
				)
			).toEqual({equal: true});
		});

		test('name', () => {
			expect(
				Name.validate('spaceThing', 'space/thing/name', Options.disabled())
			).toEqual({
				equal: false,
				value: {
					actual: ['space', 'thing'],
					expected: ['space', 'thing', 'name']
				}
			});
		});

		test('order', () => {
			expect(
				Name.validate('not', 'space/thing/name', Options.disabled())
			).toEqual({
				equal: false,
				value: {
					actual: ['not'],
					expected: ['space', 'thing', 'name']
				}
			});
		});

		test('order option', () => {
			expect(
				Name.validate(
					'nameThingSpace',
					'space/thing/name',
					MergeWith(Options.disabled(), {order: 'right-to-left'})
				)
			).toEqual({equal: true});
		});

		test('strict size option', () => {
			expect(
				Name.validate(
					'thingName',
					'space/thing/name',
					MergeWith(Options.disabled(), {strict: {size: true}})
				)
			).toEqual({
				equal: false,
				value: {
					actual: ['thing', 'name'],
					expected: ['space', 'thing', 'name']
				}
			});
		});

		test('strict tokens option', () => {
			expect(
				Name.validate(
					'nameFoo',
					'space/thing/name',
					MergeWith(Options.disabled(), {
						order: 'any',
						strict: {tokens: true}
					})
				)
			).toEqual({
				equal: false,
				value: {
					actual: ['name', 'foo'],
					expected: ['space', 'thing', 'name']
				}
			});
		});

		test('namespace canonicalize option', () => {
			expect(
				Name.validate(
					'spaceName',
					'spaces/name',
					MergeWith(Options.disabled(), {namespace: {canonicalize: true}})
				)
			).toEqual({equal: true});
		});

		test('namespace separators option', () => {
			expect(
				Name.validate(
					'spaceName',
					'space-X-name',
					MergeWith(Options.disabled(), {namespace: {separators: ['-X-']}})
				)
			).toEqual({equal: true});
		});

		test('composition', () => {
			expect(
				Name.validate(
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
				)
			).toEqual({equal: true});
		});
	});
});
