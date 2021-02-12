/* eslint-env es6, node */
'use strict';

import xdg from '../dist/cjs/esm-wrapper/mod.esm.js';

/* eslint-disable no-console , security/detect-object-injection, security-node/detect-crlf */

console.log({ xdg });

Object.keys(xdg).forEach((key) => {
	console.log(key, '=', typeof xdg[key] === 'function' ? xdg[key]() : xdg[key]);
});

/* eslint-enable no-console , security/detect-object-injection, security-node/detect-crlf */
