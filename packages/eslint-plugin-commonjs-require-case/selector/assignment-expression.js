const Get = require('lodash.get');

const AssignmentExpression = exports;

const SELECTOR = `AssignmentExpression\
[left.type=Identifier]\
[right.type=CallExpression]\
[right.callee.type=Identifier]\
[right.callee.name=require]\
[right.arguments.length>0]`;

function instance(fn) {
	return {
		[SELECTOR]: node => {
			const result = {
				assignment: node.left.name,
				name: null,
				node
			};

			const argument = Get(node.right.arguments, '0', {});
			if (argument.type === 'Literal' && typeof argument.value === 'string') {
				result.name = argument.value;
			}

			return fn(result);
		}
	};
}

AssignmentExpression.instance = instance;
