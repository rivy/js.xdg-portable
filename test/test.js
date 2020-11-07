'use strict';

import path from 'path';

import {serial as test} from 'ava';

import xdg from '..';

test('alternate construction (via function)', t => {
	const paths = xdg();
	process.env.XDG_CACHE_HOME = 'cache';
	t.is(paths.cache(), 'cache');
});

test('.cache', t => {
	process.env.XDG_CACHE_HOME = 'cache';
	t.is(xdg.cache(), 'cache');
});

test('.config', t => {
	process.env.XDG_CONFIG_HOME = 'config';
	t.is(xdg.config(), 'config');
});

test('.data', t => {
	process.env.XDG_DATA_HOME = 'data';
	t.is(xdg.data(), 'data');
});

test('.runtime', t => {
	process.env.XDG_RUNTIME_DIR = 'runtime';
	t.is(xdg.runtime(), 'runtime');
});

test('.state', t => {
	process.env.XDG_STATE_HOME = 'state';
	t.is(xdg.state(), 'state');
});

test('.configDirs', t => {
	process.env.XDG_CONFIG_HOME = 'config_home';
	process.env.XDG_CONFIG_DIRS = ['dirs', 'config_dirs'].join(path.delimiter);
	t.is((xdg.configDirs())[0], 'config_home');
	t.is((xdg.configDirs())[1], 'dirs');
	t.is((xdg.configDirs())[2], 'config_dirs');
});

test('.dataDirs', t => {
	process.env.XDG_DATA_HOME = 'data_home';
	process.env.XDG_DATA_DIRS = ['dirs', 'data_dirs'].join(path.delimiter);
	t.is((xdg.dataDirs())[0], 'data_home');
	t.is((xdg.dataDirs())[1], 'dirs');
	t.is((xdg.dataDirs())[2], 'data_dirs');
});
