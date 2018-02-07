const DeclaredAssignment = exports;

const SELECTOR = `VariableDeclarator\
[id.type=Identifier]\
[init.type=CallExpression]\
[init.callee.type=Identifier]\
[init.callee.name=require]\
[init.arguments.length=1]\
[init.arguments.0.type=Literal]`;

function instance(fn) {
	return {
		[SELECTOR]: node =>
			fn({
				assignment: node.id.name,
				node,
				path: node.init.arguments[0].value
			})
	};
}

DeclaredAssignment.instance = instance;
