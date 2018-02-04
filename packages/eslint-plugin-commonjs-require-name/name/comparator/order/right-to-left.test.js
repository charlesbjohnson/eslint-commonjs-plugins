const Collection = require('../../collection');
const RightToLeft = require('./right-to-left');

describe('RightToLeft', () => {
	describe('#compare', () => {
		test('in order strict', () => {
			expect(
				RightToLeft.instance().compare(
					Collection.Items.instance('nameThingSpace'),
					Collection.Items.instance('space/thing/name')
				)
			).toBe(true);
		});

		test('out of order strict', () => {
			expect(
				RightToLeft.instance().compare(
					Collection.Items.instance('nameSpaceThing'),
					Collection.Items.instance('space/thing/name')
				)
			).toBe(false);
		});

		test('in order loose missing left', () => {
			expect(
				RightToLeft.instance().compare(
					Collection.Items.instance('nameThing'),
					Collection.Items.instance('space/thing/name')
				)
			).toBe(true);
		});

		test('in order loose missing right', () => {
			expect(
				RightToLeft.instance().compare(
					Collection.Items.instance('thingSpace'),
					Collection.Items.instance('space/thing/name')
				)
			).toBe(true);
		});

		test('in order loose missing both', () => {
			expect(
				RightToLeft.instance().compare(
					Collection.Items.instance('thingSpace'),
					Collection.Items.instance('module/space/thing/name')
				)
			).toBe(true);
		});

		test('in order loose different left', () => {
			expect(
				RightToLeft.instance().compare(
					Collection.Items.instance('nameThingDifferent'),
					Collection.Items.instance('space/thing/name')
				)
			).toBe(true);
		});

		test('in order loose different right', () => {
			expect(
				RightToLeft.instance().compare(
					Collection.Items.instance('differentThingSpace'),
					Collection.Items.instance('space/thing/name')
				)
			).toBe(true);
		});

		test('in order loose different both', () => {
			expect(
				RightToLeft.instance().compare(
					Collection.Items.instance('fooThingSpaceBar'),
					Collection.Items.instance('module/space/thing/name')
				)
			).toBe(true);
		});

		test('in order loose extra left', () => {
			expect(
				RightToLeft.instance().compare(
					Collection.Items.instance('nameThingSpaceModule'),
					Collection.Items.instance('space/thing/name')
				)
			).toBe(true);
		});

		test('in order loose extra right', () => {
			expect(
				RightToLeft.instance().compare(
					Collection.Items.instance('moduleNameThingSpace'),
					Collection.Items.instance('space/thing/name')
				)
			).toBe(true);
		});

		test('in order loose extra both', () => {
			expect(
				RightToLeft.instance().compare(
					Collection.Items.instance('fooNameThingSpaceBar'),
					Collection.Items.instance('space/thing/name')
				)
			).toBe(true);
		});

		test('out of order loose', () => {
			expect(
				RightToLeft.instance().compare(
					Collection.Items.instance('fooThingNameBar'),
					Collection.Items.instance('space/thing/name')
				)
			).toBe(false);
		});
	});

	describe('#error', () => {
		test('message', () => {
			expect(RightToLeft.instance().error()).toMatch('order right-to-left:');
		});
	});
});
