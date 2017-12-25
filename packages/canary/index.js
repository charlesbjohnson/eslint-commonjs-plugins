const Canary = exports;

function tweet(twice) {
	return twice ? 'tweet tweet' : 'tweet';
}

Canary.tweet = tweet;
