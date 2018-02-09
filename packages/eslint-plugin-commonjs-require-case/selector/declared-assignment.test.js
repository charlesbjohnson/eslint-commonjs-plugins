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
				id: {
					name: 'assignment'
				},
				init: {
					arguments: [{type: 'Literal', value: 'name'}]
				}
			};

			instance[Object.keys(instance)[0]](node);

			expect(fn).toHaveBeenCalledWith({
				assignment: 'assignment',
				name: 'name',
				node
			});
		});

		test('extractor non-literal name', () => {
			const fn = jest.fn();

			const instance = DeclaredAssignment.instance(fn);
			const node = {
				id: {
					name: 'assignment'
				},
				init: {
					arguments: [{type: 'Not'}]
				}
			};

			instance[Object.keys(instance)[0]](node);

			expect(fn).toHaveBeenCalledWith({
				assignment: 'assignment',
				name: null,
				node
			});
		});

		test('extractor non-string name', () => {
			const fn = jest.fn();

			const instance = DeclaredAssignment.instance(fn);
			const node = {
				id: {
					name: 'assignment'
				},
				init: {
					arguments: [{type: 'Literal', value: null}]
				}
			};

			instance[Object.keys(instance)[0]](node);

			expect(fn).toHaveBeenCalledWith({
				assignment: 'assignment',
				name: null,
				node
			});
		});
	});
});
