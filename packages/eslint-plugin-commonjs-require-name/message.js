const Message = exports;

function error({assignment, path, value: {expected}}) {
	return `module assignment '${assignment}' does not match module name '${path}', \
expected tokens: '[${expected.join(', ')}]'.`;
}

function fail({path}) {
	return `invalid require argument '${path}'`;
}

Message.error = error;
Message.fail = fail;
