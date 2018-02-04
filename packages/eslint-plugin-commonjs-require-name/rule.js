const Message = require('./message');
const Module = require('./module');
const Name = require('./name');
const Options = require('./options');
const Selector = require('./selector');

const Rule = exports;

const META = {
	docs: {},
	fixable: null,
	schema: Options.SCHEMA
};

class RequireName {
	constructor(context) {
		this.context = context;
		this.options = {
			local: Options.local(context.options),
			node: Options.node(context.options)
		};
	}

	check({assignment, path, node}) {
		let options;
		let resolver;

		switch (true) {
			case Module.Local.test(path):
				options = this.options.local;
				resolver = () => Module.Local.resolve(this.context.getFilename(), path);
				break;
			case Module.Node.test(path):
				options = this.options.node;
				resolver = () => Module.Node.resolve(path);
				break;
			default:
				this.context.report({message: Message.fail(), node});
				return;
		}

		if (!options) {
			return;
		}

		const result = Name.validate(assignment, resolver(), options);
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
	return new RequireName(context).create();
}

Rule.meta = META;
Rule.create = create;
