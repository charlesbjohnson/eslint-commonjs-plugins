const Get = require('lodash.get');

const DeclaredAssignment = exports;

const SELECTOR = `VariableDeclarator\
[id.type=Identifier]\
[init.type=CallExpression]\
[init.callee.type=Identifier]\
[init.callee.name=require]\
[init.arguments.length>0]`;

function instance(fn) {
	return {
		[SELECTOR]: node => {
			const result = {
				assignment: node.id.name,
				name: null,
				node
			};

			const argument = Get(node.init.arguments, '0', {});
			if (argument.type === 'Literal' && typeof argument.value === 'string') {
				result.name = argument.value;
			}

			return fn(result);
		}
	};
}

DeclaredAssignment.instance = instance;
