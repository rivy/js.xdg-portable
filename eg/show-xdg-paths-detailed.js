'use strict';

const util = require('util');

const _ = require('lodash');

const xdg = require('../src/lib');

console.log('xdg.name:', xdg.name);
console.log('xdg:', util.inspect(xdg));

_.each(xdg, (value, key) => {
	console.log(key, '=', xdg[key]());
});
