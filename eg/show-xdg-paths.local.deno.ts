/* eslint-env es6, deno */

/* eslint-disable @typescript-eslint/ban-ts-comment */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path='../vendor/types/deno.d.ts'/>

// @ts-ignore
import xdg from '../src/mod.deno.ts';

// // create a local reference to refer to `Deno` (for better linting without need for multiple `// @ts-ignore` directives)
// // @ts-ignore
// const deno = Deno;

/* eslint-disable no-console , functional/immutable-data , security/detect-object-injection, security-node/detect-crlf , @typescript-eslint/no-explicit-any */

function objectEntries(obj: any) {
	const map: any = {};
	Object.keys(obj).forEach((key) => {
		const value = obj[key];
		const val = typeof value === 'function' ? value() : value;
		map[key] = val;
	});
	return map;
}

console.log({ xdg });
console.log(objectEntries(xdg));

/* eslint-enable no-console , functional/immutable-data , security/detect-object-injection, security-node/detect-crlf , @typescript-eslint/no-explicit-any */

/* eslint-enable @typescript-eslint/ban-ts-comment */
