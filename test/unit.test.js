/* eslint-env es6, node */
'use strict';

const path = require('path');

const test = require('ava').serial;

const xdg = require('../build/cjs+tests');

/* eslint-disable functional/immutable-data */

test('alternate construction (via function)', (t) => {
	const paths = xdg();
	process.env.XDG_CACHE_HOME = 'cache';
	t.is(paths.cache(), 'cache');
});

test('.cache', (t) => {
	process.env.XDG_CACHE_HOME = 'cache';
	t.is(xdg.cache(), 'cache');
});

test('.config', (t) => {
	process.env.XDG_CONFIG_HOME = 'config';
	t.is(xdg.config(), 'config');
});

test('.data', (t) => {
	process.env.XDG_DATA_HOME = 'data';
	t.is(xdg.data(), 'data');
});

test('.runtime', (t) => {
	process.env.XDG_RUNTIME_DIR = 'runtime';
	t.is(xdg.runtime(), 'runtime');
});

test('.state', (t) => {
	process.env.XDG_STATE_HOME = 'state';
	t.is(xdg.state(), 'state');
});

test('.configDirs', (t) => {
	process.env.XDG_CONFIG_HOME = 'config_home';
	process.env.XDG_CONFIG_DIRS = ['dirs', 'config_dirs'].join(path.delimiter);
	t.deepEqual(xdg.configDirs(), ['config_home', 'dirs', 'config_dirs']);
});

test('.dataDirs', (t) => {
	process.env.XDG_DATA_HOME = 'data_home';
	process.env.XDG_DATA_DIRS = ['dirs', 'data_dirs'].join(path.delimiter);
	t.deepEqual(xdg.dataDirs(), ['data_home', 'dirs', 'data_dirs']);
});

/* eslint-enable functional/immutable-data */
