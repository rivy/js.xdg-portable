'use strict';

const xdg = require('../src/lib');

console.log('xdg.name:', xdg.name);
console.log({ xdg });

Object.keys(xdg).forEach((key) => {
	console.log(key, '=', xdg[key]());
});
