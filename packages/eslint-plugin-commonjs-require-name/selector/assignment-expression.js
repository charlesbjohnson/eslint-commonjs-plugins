const AssignmentExpression = exports;

const SELECTOR = `AssignmentExpression\
[left.type=Identifier]\
[right.type=CallExpression]\
[right.callee.type=Identifier]\
[right.callee.name=require]\
[right.arguments.length=1]\
[right.arguments.0.type=Literal]`;

function instance(fn) {
	return {
		[SELECTOR]: node =>
			fn({
				assignment: node.left.name,
				name: node.right.arguments[0].value,
				node
			})
	};
}

AssignmentExpression.instance = instance;
