const DeclaredAssignment = require('./declared-assignment');

describe('DeclaredAssignment', () => {
	describe('.instance', () => {
		test('selector', () => {
			const instance = DeclaredAssignment.instance(() => {});
			const keys = Object.keys(instance);

			expect(keys).toHaveLength(1);
			expect(keys[0].length).toBeGreaterThan(0);
		});

		test('extractor', () => {
			const fn = jest.fn();

			const instance = DeclaredAssignment.instance(fn);
			const node = {
				id: {name: 'assignment'},
				init: {arguments: [{value: 'path'}]}
			};

			instance[Object.keys(instance)[0]](node);

			expect(fn).toHaveBeenCalledWith({
				assignment: 'assignment',
				node,
				path: 'path'
			});
		});
	});
});
