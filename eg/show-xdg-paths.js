/* eslint-env es6, node */
'use strict';

const xdg = require('../src/lib');

/* eslint-disable no-console , security/detect-object-injection, security-node/detect-crlf */

Object.keys(xdg).forEach((key) => {
	console.log(key, '=', xdg[key]());
});

/* eslint-enable no-console , security/detect-object-injection, security-node/detect-crlf */
