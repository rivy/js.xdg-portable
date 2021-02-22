/* eslint-env es6, node */
// # spell-checker:ignore AllUsersProfile HomeDrive HomePath LocalAppData SystemDrive SystemRoot UserProfile windir
'use strict';

const os = require('os');
const path = require('path');

const test = require('ava').serial;
const osPaths = require('os-paths');

const xdg = require('../build/testbed/src/mod.cjs.js');

const isMacOS = /^darwin$/i.test(process.platform);
const isWinOS = /^win/i.test(process.platform);

const envSignalValues = {
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
};

const original = {
	env: { ...process.env },
	os: {
		homedir: os.homedir,
		tmpdir: os.tmpdir,
	},
};

function setObjectKeys(object, values) {
	// eslint-disable-next-line functional/immutable-data , security/detect-object-injection
	Object.keys(values).forEach((key) => (object[key] = values[key]));
}

// * reset environment prior to each test
test.beforeEach(() => {
	setObjectKeys(process.env, original.env);
	setObjectKeys(os, original.os);
});

/* eslint-disable functional/immutable-data */

test('default', (t) => {
	const paths = xdg;
	process.env.XDG_CACHE_HOME = envSignalValues.XDG_CACHE_HOME;
	t.is(paths.cache(), envSignalValues.XDG_CACHE_HOME);
});

test('alternate construction (via function)', (t) => {
	const paths = xdg();
	process.env.XDG_CACHE_HOME = envSignalValues.XDG_CACHE_HOME;
	t.is(paths.cache(), envSignalValues.XDG_CACHE_HOME);
});

test('alternate construction (via new)', (t) => {
	const paths = new xdg();
	process.env.XDG_CACHE_HOME = envSignalValues.XDG_CACHE_HOME;
	t.is(paths.cache(), envSignalValues.XDG_CACHE_HOME);
});

test('.cache', (t) => {
	process.env.XDG_CACHE_HOME = envSignalValues.XDG_CACHE_HOME;
	t.is(xdg.cache(), envSignalValues.XDG_CACHE_HOME);
	delete process.env.XDG_CACHE_HOME;
	const prefix = osPaths.home() || osPaths.temp();
	const mid = isMacOS ? 'Library' : isWinOS ? path.join('AppData', 'Local') : '';
	const suffix = isMacOS ? 'Caches' : isWinOS ? 'xdg.cache' : '.cache';
	if (isWinOS && process.env.LOCALAPPDATA) {
		t.is(xdg.cache(), path.join(process.env.LOCALAPPDATA, suffix));
	}
	delete process.env.LOCALAPPDATA;
	t.is(xdg.cache(), path.join(prefix, mid, suffix));
	os.homedir = () => null;
	delete process.env.HOME;
	delete process.env.HOMEDRIVE;
	delete process.env.HOMEPATH;
	delete process.env.USERPROFILE;
	t.is(xdg.cache(), path.join(osPaths.temp(), mid, suffix));
});

test('.config', (t) => {
	process.env.XDG_CONFIG_HOME = envSignalValues.XDG_CONFIG_HOME;
	t.is(xdg.config(), envSignalValues.XDG_CONFIG_HOME);
	delete process.env.XDG_CONFIG_HOME;
	const prefix = osPaths.home() || osPaths.temp();
	const mid = isMacOS ? 'Library' : isWinOS ? path.join('AppData', 'Roaming') : '';
	const suffix = isMacOS ? 'Preferences' : isWinOS ? 'xdg.config' : '.config';
	if (isWinOS && process.env.APPDATA) {
		t.is(xdg.config(), path.join(process.env.APPDATA, suffix));
	}
	delete process.env.APPDATA;
	t.is(xdg.config(), path.join(prefix, mid, suffix));
	os.homedir = null;
	delete process.env.HOME;
	delete process.env.HOMEDRIVE;
	delete process.env.HOMEPATH;
	delete process.env.USERPROFILE;
	t.is(xdg.config(), path.join(osPaths.temp(), mid, suffix));
});

test('.data', (t) => {
	process.env.XDG_DATA_HOME = envSignalValues.XDG_DATA_HOME;
	t.is(xdg.data(), envSignalValues.XDG_DATA_HOME);
	delete process.env.XDG_DATA_HOME;
	const prefix = osPaths.home() || osPaths.temp();
	const mid = isMacOS ? 'Library' : isWinOS ? path.join('AppData', 'Roaming') : '.local';
	const suffix = isMacOS ? 'Application Support' : isWinOS ? 'xdg.data' : 'share';
	if (isWinOS && process.env.APPDATA) {
		t.is(xdg.data(), path.join(process.env.APPDATA, suffix));
	}
	delete process.env.APPDATA;
	t.is(xdg.data(), path.join(prefix, mid, suffix));
	os.homedir = null;
	delete process.env.HOME;
	delete process.env.HOMEDRIVE;
	delete process.env.HOMEPATH;
	delete process.env.USERPROFILE;
	t.is(xdg.data(), path.join(osPaths.temp(), mid, suffix));
});

test('.runtime', (t) => {
	process.env.XDG_RUNTIME_DIR = envSignalValues.XDG_RUNTIME_DIR;
	t.is(xdg.runtime(), envSignalValues.XDG_RUNTIME_DIR);
	delete process.env.XDG_RUNTIME_DIR;
	t.is(xdg.runtime(), void 0);
});

test('.state', (t) => {
	process.env.XDG_STATE_HOME = envSignalValues.XDG_STATE_HOME;
	t.is(xdg.state(), envSignalValues.XDG_STATE_HOME);
	delete process.env.XDG_STATE_HOME;
	const prefix = osPaths.home() || osPaths.temp();
	const mid = isMacOS ? 'Library' : isWinOS ? path.join('AppData', 'Local') : '.local';
	const suffix = isMacOS ? 'State' : isWinOS ? 'xdg.state' : 'state';
	if (isWinOS && process.env.LOCALAPPDATA) {
		t.is(xdg.state(), path.join(process.env.LOCALAPPDATA, suffix));
	}
	delete process.env.LOCALAPPDATA;
	t.is(xdg.state(), path.join(prefix, mid, suffix));
	os.homedir = () => null;
	delete process.env.HOME;
	delete process.env.HOMEDRIVE;
	delete process.env.HOMEPATH;
	delete process.env.USERPROFILE;
	t.is(xdg.state(), path.join(osPaths.temp(), mid, suffix));
});

test('.configDirs', (t) => {
	process.env.XDG_CONFIG_HOME = envSignalValues.XDG_CONFIG_HOME;
	process.env.XDG_CONFIG_DIRS = envSignalValues.XDG_CONFIG_DIRS;
	t.deepEqual(xdg.configDirs(), [
		envSignalValues.XDG_CONFIG_HOME,
		...envSignalValues.XDG_CONFIG_DIRS.split(path.delimiter),
	]);
	delete process.env.XDG_CONFIG_DIRS;
	t.deepEqual(xdg.configDirs(), [envSignalValues.XDG_CONFIG_HOME]);
	delete process.env.XDG_CONFIG_HOME;
	const prefix = osPaths.home() || osPaths.temp();
	const mid = isMacOS ? 'Library' : isWinOS ? path.join('AppData', 'Roaming') : '';
	const suffix = isMacOS ? 'Preferences' : isWinOS ? 'xdg.config' : '.config';
	t.deepEqual(xdg.configDirs(), [path.join(prefix, mid, suffix)]);
});

test('.dataDirs', (t) => {
	process.env.XDG_DATA_HOME = envSignalValues.XDG_DATA_HOME;
	process.env.XDG_DATA_DIRS = envSignalValues.XDG_DATA_DIRS;
	t.deepEqual(xdg.dataDirs(), [
		envSignalValues.XDG_DATA_HOME,
		...envSignalValues.XDG_DATA_DIRS.split(path.delimiter),
	]);
	delete process.env.XDG_DATA_DIRS;
	t.deepEqual(xdg.dataDirs(), [envSignalValues.XDG_DATA_HOME]);
	delete process.env.XDG_DATA_HOME;
	const prefix = osPaths.home() || osPaths.temp();
	const mid = isMacOS ? 'Library' : isWinOS ? path.join('AppData', 'Roaming') : '.local';
	const suffix = isMacOS ? 'Application Support' : isWinOS ? 'xdg.data' : 'share';
	t.deepEqual(xdg.dataDirs(), [path.join(prefix, mid, suffix)]);
});

/* eslint-enable functional/immutable-data */
