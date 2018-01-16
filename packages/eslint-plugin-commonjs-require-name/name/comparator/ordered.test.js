const Collection = require('../collection');
const Ordered = require('./ordered');

describe('Ordered.Any', () => {
	describe('.instance', () => {
		test('same', () => {
			expect(
				Ordered.Any.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('nameSpaceThing'))
			).toBe(true);
		});

		test('missing', () => {
			expect(
				Ordered.Any.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('nameSpace'))
			).toBe(true);
		});

		test('none', () => {
			expect(
				Ordered.Any.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('none'))
			).toBe(false);
		});
	});
});

describe('Ordered.LeftToRight', () => {
	describe('.instance', () => {
		test('in order', () => {
			expect(
				Ordered.LeftToRight.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('spaceThingName'))
			).toBe(true);
		});

		test('out of order', () => {
			expect(
				Ordered.LeftToRight.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('spaceNameThing'))
			).toBe(false);
		});

		test('in order missing right', () => {
			expect(
				Ordered.LeftToRight.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('spaceThing'))
			).toBe(true);
		});

		test('in order missing left', () => {
			expect(
				Ordered.LeftToRight.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('thingName'))
			).toBe(true);
		});

		test('in order extra left', () => {
			expect(
				Ordered.LeftToRight.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('moduleSpaceThingName'))
			).toBe(true);
		});

		test('in order extra right', () => {
			expect(
				Ordered.LeftToRight.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('spaceThingNameModule'))
			).toBe(true);
		});
	});
});

describe('Ordered.RightToLeft', () => {
	describe('.instance', () => {
		test('in order', () => {
			expect(
				Ordered.RightToLeft.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('nameThingSpace'))
			).toBe(true);
		});

		test('out of order', () => {
			expect(
				Ordered.RightToLeft.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('nameSpaceThing'))
			).toBe(false);
		});

		test('in order missing right', () => {
			expect(
				Ordered.RightToLeft.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('thingSpace'))
			).toBe(true);
		});

		test('in order missing left', () => {
			expect(
				Ordered.RightToLeft.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('nameThing'))
			).toBe(true);
		});

		test('in order extra left', () => {
			expect(
				Ordered.RightToLeft.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('nameThingSpaceModule'))
			).toBe(true);
		});

		test('in order extra right', () => {
			expect(
				Ordered.RightToLeft.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('moduleNameThingSpace'))
			).toBe(true);
		});
	});
});
