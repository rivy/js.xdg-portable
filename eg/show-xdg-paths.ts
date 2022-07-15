import xdg from '../dist/cjs/mod.cjs.js'; // ## maint: [2021-02-07; rivy] await resolution of <https://github.com/TypeStrong/ts-node/issues/783> to return to direct TS import

/* eslint-disable no-console , functional/immutable-data , functional/no-return-void , security/detect-object-injection, security-node/detect-crlf , @typescript-eslint/no-explicit-any */

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

/* eslint-enable no-console , functional/immutable-data , functional/no-return-void , security/detect-object-injection, security-node/detect-crlf , @typescript-eslint/no-explicit-any */
