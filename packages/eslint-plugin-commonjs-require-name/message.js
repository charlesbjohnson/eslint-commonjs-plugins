const Message = exports;

function error(message) {
	return `mismatched module assignment and name: ${message}`;
}

function fail() {
	return 'invalid require argument';
}

Message.error = error;
Message.fail = fail;
