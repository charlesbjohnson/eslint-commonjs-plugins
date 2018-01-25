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
		test('in order strict', () => {
			expect(
				Ordered.LeftToRight.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('spaceThingName'))
			).toBe(true);
		});

		test('out of order strict', () => {
			expect(
				Ordered.LeftToRight.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('spaceNameThing'))
			).toBe(false);
		});

		test('in order loose missing left', () => {
			expect(
				Ordered.LeftToRight.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('thingName'))
			).toBe(true);
		});

		test('in order loose missing right', () => {
			expect(
				Ordered.LeftToRight.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('spaceThing'))
			).toBe(true);
		});

		test('in order loose missing both', () => {
			expect(
				Ordered.LeftToRight.instance(
					Collection.Items.instance('module/space/thing/name')
				).equals(Collection.Items.instance('spaceThing'))
			).toBe(true);
		});

		test('in order loose different left', () => {
			expect(
				Ordered.LeftToRight.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('differentThingName'))
			).toBe(true);
		});

		test('in order loose different right', () => {
			expect(
				Ordered.LeftToRight.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('spaceThingDifferent'))
			).toBe(true);
		});

		test('in order loose different both', () => {
			expect(
				Ordered.LeftToRight.instance(
					Collection.Items.instance('module/space/thing/name')
				).equals(Collection.Items.instance('fooSpaceThingBar'))
			).toBe(true);
		});

		test('in order loose extra left', () => {
			expect(
				Ordered.LeftToRight.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('moduleSpaceThingName'))
			).toBe(true);
		});

		test('in order loose extra right', () => {
			expect(
				Ordered.LeftToRight.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('spaceThingNameModule'))
			).toBe(true);
		});

		test('in order loose extra both', () => {
			expect(
				Ordered.LeftToRight.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('fooSpaceThingNameBar'))
			).toBe(true);
		});

		test('out of order loose', () => {
			expect(
				Ordered.LeftToRight.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('fooNameThingBar'))
			).toBe(false);
		});
	});
});

describe('Ordered.RightToLeft', () => {
	describe('.instance', () => {
		test('in order strict', () => {
			expect(
				Ordered.RightToLeft.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('nameThingSpace'))
			).toBe(true);
		});

		test('out of order strict', () => {
			expect(
				Ordered.RightToLeft.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('nameSpaceThing'))
			).toBe(false);
		});

		test('in order loose missing left', () => {
			expect(
				Ordered.RightToLeft.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('nameThing'))
			).toBe(true);
		});

		test('in order loose missing right', () => {
			expect(
				Ordered.RightToLeft.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('thingSpace'))
			).toBe(true);
		});

		test('in order loose missing both', () => {
			expect(
				Ordered.RightToLeft.instance(
					Collection.Items.instance('module/space/thing/name')
				).equals(Collection.Items.instance('thingSpace'))
			).toBe(true);
		});

		test('in order loose different left', () => {
			expect(
				Ordered.RightToLeft.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('nameThingDifferent'))
			).toBe(true);
		});

		test('in order loose different right', () => {
			expect(
				Ordered.RightToLeft.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('differentThingSpace'))
			).toBe(true);
		});

		test('in order loose different both', () => {
			expect(
				Ordered.RightToLeft.instance(
					Collection.Items.instance('module/space/thing/name')
				).equals(Collection.Items.instance('fooThingSpaceBar'))
			).toBe(true);
		});

		test('in order loose extra left', () => {
			expect(
				Ordered.RightToLeft.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('nameThingSpaceModule'))
			).toBe(true);
		});

		test('in order loose extra right', () => {
			expect(
				Ordered.RightToLeft.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('moduleNameThingSpace'))
			).toBe(true);
		});

		test('in order loose extra both', () => {
			expect(
				Ordered.RightToLeft.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('fooNameThingSpaceBar'))
			).toBe(true);
		});

		test('out of order loose', () => {
			expect(
				Ordered.RightToLeft.instance(
					Collection.Items.instance('space/thing/name')
				).equals(Collection.Items.instance('fooThingNameBar'))
			).toBe(false);
		});
	});
});
