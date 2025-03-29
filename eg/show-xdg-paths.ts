import xdg from '..';

/* eslint-disable no-console , functional/immutable-data , security/detect-object-injection, security-node/detect-crlf */

function objectEntries(obj: unknown) {
	const o = obj as Record<string, unknown>;
	const map: Record<string, unknown> = {};
	Object.keys(o).forEach((key) => {
		const value = o[key];
		const val = typeof value === 'function' ? value() : value;
		map[key] = val;
	});
	return map;
}

console.log({ xdg });
console.log(objectEntries(xdg));

/* eslint-enable no-console , functional/immutable-data , security/detect-object-injection, security-node/detect-crlf  */
