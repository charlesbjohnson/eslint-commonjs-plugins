const AssignmentExpression = require('./assignment-expression');

describe('AssignmentExpression', () => {
	describe('.instance', () => {
		test('selector', () => {
			const instance = AssignmentExpression.instance(() => {});
			const keys = Object.keys(instance);

			expect(keys).toHaveLength(1);
			expect(keys[0].length).toBeGreaterThan(0);
		});

		test('extractor', () => {
			const fn = jest.fn();

			const instance = AssignmentExpression.instance(fn);
			const node = {
				expression: {
					left: {name: 'assignment'},
					right: {arguments: [{value: 'path'}]}
				}
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
