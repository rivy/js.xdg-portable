/* eslint-env es6, node */
'use strict';

/* eslint-disable @typescript-eslint/ban-ts-comment */

// `import xdg from 'xdg-portable'`
// * workaround to import with typings (needed here b/c referencing a local module [not a package named import])
// @ts-ignore ## JS (ESM) local (and relative) import; suppress any TypeScript "cannot find" error
import xdgM from '../dist/cjs/esm-wrapper/mod.esm.mjs';
/** @typedef {import('../dist/cjs/esm-wrapper/').default} XDG */
/** @type XDG */
const xdg = xdgM;

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

/* eslint-enable @typescript-eslint/ban-ts-comment */
