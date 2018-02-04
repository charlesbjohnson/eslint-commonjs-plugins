const Collection = require('../../collection');
const LeftToRight = require('./left-to-right');

describe('LeftToRight', () => {
	describe('#compare', () => {
		test('in order strict', () => {
			expect(
				LeftToRight.instance().compare(
					Collection.Items.instance('spaceThingName'),
					Collection.Items.instance('space/thing/name')
				)
			).toBe(true);
		});

		test('out of order strict', () => {
			expect(
				LeftToRight.instance().compare(
					Collection.Items.instance('spaceNameThing'),
					Collection.Items.instance('space/thing/name')
				)
			).toBe(false);
		});

		test('in order loose missing left', () => {
			expect(
				LeftToRight.instance().compare(
					Collection.Items.instance('thingName'),
					Collection.Items.instance('space/thing/name')
				)
			).toBe(true);
		});

		test('in order loose missing right', () => {
			expect(
				LeftToRight.instance().compare(
					Collection.Items.instance('spaceThing'),
					Collection.Items.instance('space/thing/name')
				)
			).toBe(true);
		});

		test('in order loose missing both', () => {
			expect(
				LeftToRight.instance().compare(
					Collection.Items.instance('spaceThing'),
					Collection.Items.instance('module/space/thing/name')
				)
			).toBe(true);
		});

		test('in order loose different left', () => {
			expect(
				LeftToRight.instance().compare(
					Collection.Items.instance('differentThingName'),
					Collection.Items.instance('space/thing/name')
				)
			).toBe(true);
		});

		test('in order loose different right', () => {
			expect(
				LeftToRight.instance().compare(
					Collection.Items.instance('spaceThingDifferent'),
					Collection.Items.instance('space/thing/name')
				)
			).toBe(true);
		});

		test('in order loose different both', () => {
			expect(
				LeftToRight.instance().compare(
					Collection.Items.instance('fooSpaceThingBar'),
					Collection.Items.instance('module/space/thing/name')
				)
			).toBe(true);
		});

		test('in order loose extra left', () => {
			expect(
				LeftToRight.instance().compare(
					Collection.Items.instance('moduleSpaceThingName'),
					Collection.Items.instance('space/thing/name')
				)
			).toBe(true);
		});

		test('in order loose extra right', () => {
			expect(
				LeftToRight.instance().compare(
					Collection.Items.instance('spaceThingNameModule'),
					Collection.Items.instance('space/thing/name')
				)
			).toBe(true);
		});

		test('in order loose extra both', () => {
			expect(
				LeftToRight.instance().compare(
					Collection.Items.instance('fooSpaceThingNameBar'),
					Collection.Items.instance('space/thing/name')
				)
			).toBe(true);
		});

		test('out of order loose', () => {
			expect(
				LeftToRight.instance().compare(
					Collection.Items.instance('fooNameThingBar'),
					Collection.Items.instance('space/thing/name')
				)
			).toBe(false);
		});
	});

	describe('#error', () => {
		test('message', () => {
			expect(LeftToRight.instance().error()).toMatch('order left-to-right:');
		});
	});
});
