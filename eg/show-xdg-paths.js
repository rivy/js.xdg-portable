/* eslint-env es6, node */
'use strict';

const xdg = require('../dist/cjs/mod.cjs.js');

/* eslint-disable no-console , security/detect-object-injection, security-node/detect-crlf */

Object.keys(xdg).forEach((key) => {
	console.log(key, '=', typeof xdg[key] === 'function' ? xdg[key]() : xdg[key]);
});

/* eslint-enable no-console , security/detect-object-injection, security-node/detect-crlf */
