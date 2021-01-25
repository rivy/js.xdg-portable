/* eslint-env es6, node */
// # spell-checker:ignore AllUsersProfile HomeDrive HomePath LocalAppData SystemDrive SystemRoot UserProfile windir
'use strict';

const path = require('path');

const test = require('ava').serial;

const xdg = require('../build/cjs+tests');

const isMacOS = /^darwin$/i.test(process.platform);
const isWinOS = /^win/i.test(process.platform);

const env = {
	defaults: process.env,
	signalValues: {
		ALLUSERSPROFILE: 'allusersprofile',
		HOME: 'home',
		HOMEDRIVE: 'homedrive',
		HOMEPATH: 'homepath',
		LOCALAPPDATA: 'localappdata',
		SystemRoot: 'systemroot',
		SystemDrive: 'systemdrive',
		TEMP: 'temp',
		TMPDIR: 'tmpdir',
		TMP: 'tmp',
		USERPROFILE: 'userprofile',
		windir: 'windir',
		XDG_CACHE_HOME: 'cache',
		XDG_CONFIG_HOME: 'config_home',
		XDG_DATA_HOME: 'data_home',
		XDG_RUNTIME_DIR: 'runtime',
		XDG_STATE_HOME: 'state',
		XDG_CONFIG_DIRS: ['dirs', 'config_dirs'].join(path.delimiter),
		XDG_DATA_DIRS: ['dirs', 'data_dirs'].join(path.delimiter),
	},
};

function setupProcessEnv(values) {
	// eslint-disable-next-line functional/immutable-data , security/detect-object-injection
	Object.keys(values).forEach((key) => (process.env[key] = env.defaults[key]));
}

// * reset environment prior to each test
test.beforeEach(() => {
	setupProcessEnv(env.defaults);
});

/* eslint-disable functional/immutable-data */

test('default', (t) => {
	const paths = xdg;
	process.env.XDG_CACHE_HOME = env.signalValues.XDG_CACHE_HOME;
	t.is(paths.cache(), env.signalValues.XDG_CACHE_HOME);
});

test('alternate construction (via function)', (t) => {
	const paths = xdg();
	process.env.XDG_CACHE_HOME = env.signalValues.XDG_CACHE_HOME;
	t.is(paths.cache(), env.signalValues.XDG_CACHE_HOME);
});

test('alternate construction (via new)', (t) => {
	const paths = new xdg();
	process.env.XDG_CACHE_HOME = env.signalValues.XDG_CACHE_HOME;
	t.is(paths.cache(), env.signalValues.XDG_CACHE_HOME);
});

test('.cache', (t) => {
	process.env.XDG_CACHE_HOME = env.signalValues.XDG_CACHE_HOME;
	t.is(xdg.cache(), env.signalValues.XDG_CACHE_HOME);
	delete process.env.XDG_CACHE_HOME;
	t.is(path.basename(xdg.cache()), isMacOS ? 'Caches' : isWinOS ? 'xdg.cache' : '.cache');
});

test('.config', (t) => {
	process.env.XDG_CONFIG_HOME = env.signalValues.XDG_CONFIG_HOME;
	t.is(xdg.config(), env.signalValues.XDG_CONFIG_HOME);
	delete process.env.XDG_CONFIG_HOME;
	t.is(path.basename(xdg.config()), isMacOS ? 'Preferences' : isWinOS ? 'xdg.config' : '.config');
});

test('.data', (t) => {
	process.env.XDG_DATA_HOME = env.signalValues.XDG_DATA_HOME;
	t.is(xdg.data(), env.signalValues.XDG_DATA_HOME);
	delete process.env.XDG_DATA_HOME;
	t.is(path.basename(xdg.data()), isMacOS ? 'Application Support' : isWinOS ? 'xdg.data' : 'share');
});

test('.runtime', (t) => {
	process.env.XDG_RUNTIME_DIR = env.signalValues.XDG_RUNTIME_DIR;
	t.is(xdg.runtime(), env.signalValues.XDG_RUNTIME_DIR);
	delete process.env.XDG_RUNTIME_DIR;
	t.is(xdg.runtime(), void 0);
});

test('.state', (t) => {
	process.env.XDG_STATE_HOME = env.signalValues.XDG_STATE_HOME;
	t.is(xdg.state(), env.signalValues.XDG_STATE_HOME);
	delete process.env.XDG_STATE_HOME;
	t.is(path.basename(xdg.state()), isMacOS ? 'State' : isWinOS ? 'xdg.state' : 'state');
});

test('.configDirs', (t) => {
	process.env.XDG_CONFIG_HOME = env.signalValues.XDG_CONFIG_HOME;
	process.env.XDG_CONFIG_DIRS = env.signalValues.XDG_CONFIG_DIRS;
	t.deepEqual(xdg.configDirs(), [
		env.signalValues.XDG_CONFIG_HOME,
		...env.signalValues.XDG_CONFIG_DIRS.split(path.delimiter),
	]);
});

test('.dataDirs', (t) => {
	process.env.XDG_DATA_HOME = env.signalValues.XDG_DATA_HOME;
	process.env.XDG_DATA_DIRS = env.signalValues.XDG_DATA_DIRS;
	t.deepEqual(xdg.dataDirs(), [
		env.signalValues.XDG_DATA_HOME,
		...env.signalValues.XDG_DATA_DIRS.split(path.delimiter),
	]);
});

/* eslint-enable functional/immutable-data */
