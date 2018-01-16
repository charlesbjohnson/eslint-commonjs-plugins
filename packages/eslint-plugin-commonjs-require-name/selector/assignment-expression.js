const AssignmentExpression = exports;

const SELECTOR = `ExpressionStatement\
[expression.type=AssignmentExpression]\
[expression.left.type=Identifier]\
[expression.right.type=CallExpression]\
[expression.right.callee.type=Identifier]\
[expression.right.callee.name=require]\
[expression.right.arguments.length=1]\
[expression.right.arguments.0.type=Literal]`;

function instance(fn) {
	return {
		[SELECTOR]: node =>
			fn({
				assignment: node.expression.left.name,
				node,
				path: node.expression.right.arguments[0].value
			})
	};
}

AssignmentExpression.instance = instance;
