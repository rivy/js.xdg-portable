'use strict';

const xdg = require('../src/lib');

Object.keys(xdg).forEach((key) => {
	console.log(key, '=', xdg[key]());
});
