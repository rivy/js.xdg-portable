'use strict';

const _ = require('lodash');

const xdg = require('../src/lib');

_.each(xdg, (value, key) => {
	console.log(key, '=', xdg[key]());
});
