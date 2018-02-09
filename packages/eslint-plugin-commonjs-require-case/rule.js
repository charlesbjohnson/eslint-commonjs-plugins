const Case = require('./case');
const Message = require('./message');
const Options = require('./options');
const Selector = require('./selector');

const Rule = exports;

const META = {
	docs: {},
	fixable: null,
	schema: Options.SCHEMA
};

class RequireCase {
	constructor(context) {
		this.context = context;
		this.options = Options.instance(context.options);
	}

	check({assignment, name, node}) {
		const result = Case.validate(assignment, name, this.options);
		if (!result.equal) {
			this.context.report({
				message: Message.error(result.error),
				node
			});
		}
	}

	create() {
		return Object.assign(
			Selector.AssignmentExpression.instance((...args) => this.check(...args)),
			Selector.DeclaredAssignment.instance((...args) => this.check(...args))
		);
	}
}

function create(context) {
	return new RequireCase(context).create();
}

Rule.meta = META;
Rule.create = create;
