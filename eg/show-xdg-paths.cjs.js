/* eslint-env es6, node */
'use strict';

const xdg = require('..');

/* eslint-disable no-console , security/detect-object-injection, security-node/detect-crlf */

function objectEntries(obj) {
	const map = {};
	Object.keys(obj).forEach((key) => {
		/* eslint-disable-next-line functional/immutable-data */
		map[key] = typeof obj[key] === 'function' ? obj[key]() : obj[key];
	});
	return map;
}

console.log({ xdg });
console.log(objectEntries(xdg));

/* eslint-enable no-console , security/detect-object-injection, security-node/detect-crlf */
