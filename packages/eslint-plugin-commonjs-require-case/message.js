const Message = exports;

function error(message) {
	return `invalid module assignment case: ${message}`;
}

Message.error = error;
