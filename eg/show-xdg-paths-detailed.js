/* eslint-env es6, node */
'use strict';

const xdg = require('../src/lib');

/* eslint-disable no-console , security/detect-object-injection, security-node/detect-crlf */

console.log('xdg.name:', xdg.name);
console.log({ xdg });

Object.keys(xdg).forEach((key) => {
	console.log(key, '=', xdg[key]());
});

/* eslint-enable no-console , security/detect-object-injection, security-node/detect-crlf */
