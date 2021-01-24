/* eslint-env es6, node */
'use strict';

const xdg = require('../dist/cjs/index.js');

/* eslint-disable no-console , security/detect-object-injection, security-node/detect-crlf */

console.log('xdg.name:', xdg.name);
console.log({ xdg });

Object.keys(xdg).forEach((key) => {
	console.log(key, '=', xdg[key]());
});

/* eslint-enable no-console , security/detect-object-injection, security-node/detect-crlf */
