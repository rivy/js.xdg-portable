// # spell-checker:ignore macos APPDATA LOCALAPPDATA
/* eslint-env es6, node */
'use strict';

import path from 'path';

import osPaths from 'os-paths';

// XDG references
// # ref: <https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html> @@ <https://archive.is/aAhtw>
// # ref: <https://specifications.freedesktop.org/basedir-spec/latest/ar01s03.html> @@ <https://archive.is/7N0TN>
// # ref: <https://wiki.archlinux.org/index.php/XDG_Base_Directory> @@ <https://archive.is/VdO9n>
// # ref: <https://wiki.debian.org/XDGBaseDirectorySpecification#state> @@ <http://archive.is/pahId>
// # ref: <https://ploum.net/207-modify-your-application-to-use-xdg-folders> @@ <https://archive.is/f43Gk>

/** Determine XDG Base Directory paths (OS/platform portable). */
export type XDG = {
	/** @constructor Create an `XDG` object. */
	new (): XDG;
	/** @constructor Create an `XDG` object. */
	(): XDG;
	/* eslint-disable functional/no-method-signature */
	/**
	Returns the directory path for user-specific non-essential (ie, cached) data files.

	@example
	```js
	import xdg from 'xdg-portable';

	console.log(xdg.cache());
	//(mac)=> '/Users/rivy/Library/Caches'
	//(nix)=> '/home/rivy/.cache'
	//(win)=> 'C:\\Users\\rivy\\AppData\\Local\\cache'
	```
	*/
	cache(): string;

	/**
	Returns the directory path for user-specific configuration files.

	@example
	```js
	import xdg from 'xdg-portable';

	console.log(xdg.config());
	//(mac)=> '/Users/rivy/Library/Preferences'
	//(nix)=> '/home/rivy/.config'
	//(win)=> 'C:\\Users\\rivy\\AppData\\Roaming\\xdg.config'
	```
	*/
	config(): string;

	/**
	Returns directory path for user-specific data files.

	@example
	```js
	import xdg from 'xdg-portable';

	console.log(xdg.data());
	//(mac)=> '/Users/rivy/Library/Application Support'
	//(nix)=> '/home/rivy/.local/share'
	//(win)=> 'C:\\Users\\rivy\\AppData\\Roaming\\xdg.data'
	```
	*/
	data(): string;

	/**
	Returns the directory path for user-specific non-essential runtime files (such as sockets, named pipes, etc); may be `undefined`.

	@example
	```js
	import xdg from 'xdg-portable';

	console.log(xdg.runtime());
	//(mac)=> undefined
	//(nix)=> '/run/user/rivy'
	//(win)=> undefined
	```
	*/
	runtime(): string | undefined;

	/**
	Returns the directory path for user-specific state files (non-essential and more volatile than configuration files).

	@example
	```js
	import xdg from 'xdg-portable';

	xdg.state();
	//(mac)=> '/Users/rivy/Library/State'
	//(nix)=> '/home/rivy/.local/state'
	//(win)=> 'C:\\Users\\rivy\\AppData\\Local\\xdg.state'
	```
	*/
	state(): string;

	/**
	Returns a preference-ordered array of base directory paths to search for configuration files (includes `.config()` directory as first entry).

	@example
	```js
	import xdg from 'xdg-portable';

	xdg.configDirs();
	//(mac)=> ['/Users/rivy/Library/Preferences']
	//(nix)=> ['/home/rivy/.config', '/etc/xdg']
	//(win)=> ['C:\\Users\\rivy\\AppData\\Roaming\\xdg.config']
	```
	*/
	configDirs(): readonly string[];

	/**
	Returns a preference-ordered array of base directory paths to search for data files (includes `.data()` directory as first entry).

	@example
	```js
	import xdg from 'xdg-portable';

	xdg.dataDirs();
	//(mac)=> ['/Users/rivy/Library/Preferences']
	//(nix)=> ['/home/rivy/.local/share', '/usr/local/share/', '/usr/share/']
	//(win)=> ['C:\\Users\\rivy\\AppData\\Roaming\\xdg.data']
	```
	*/
	dataDirs(): readonly string[];
	/* eslint-enable functional/no-method-signature */
};

function baseDir() {
	return osPaths.home() || osPaths.temp();
}

function valOrPath(val: string | undefined, pathSegments: readonly string[]) {
	return val || path.join(...pathSegments);
}

const linux = () => {
	const cache = () => valOrPath(process.env.XDG_CACHE_HOME, [baseDir(), '.cache']);
	const config = () => valOrPath(process.env.XDG_CONFIG_HOME, [baseDir(), '.config']);
	const data = () => valOrPath(process.env.XDG_DATA_HOME, [baseDir(), '.local', 'share']);
	const runtime = () => process.env.XDG_RUNTIME_DIR || void 0;
	const state = () => valOrPath(process.env.XDG_STATE_HOME, [baseDir(), '.local', 'state']);

	return { cache, config, data, runtime, state };
};

const macos = () => {
	const cache = () => valOrPath(process.env.XDG_CACHE_HOME, [baseDir(), 'Library', 'Caches']);
	const config = () =>
		valOrPath(process.env.XDG_CONFIG_HOME, [baseDir(), 'Library', 'Preferences']);
	const data = () =>
		valOrPath(process.env.XDG_DATA_HOME, [baseDir(), 'Library', 'Application Support']);
	const runtime = () => process.env.XDG_RUNTIME_DIR || void 0;
	const state = () => valOrPath(process.env.XDG_STATE_HOME, [baseDir(), 'Library', 'State']);

	return { cache, config, data, runtime, state };
};

const windows = () => {
	// # ref: <https://www.thewindowsclub.com/local-localnow-roaming-folders-windows-10> @@ <http://archive.is/tDEPl>
	// Locations for cache/config/data/state are invented (Windows doesn't have a popular convention)

	function appData() {
		// ".../AppData/Roaming" contains data which may follow user between machines
		return valOrPath(process.env.APPDATA, [baseDir(), 'AppData', 'Roaming']);
	}
	function localAppData() {
		// ".../AppData/Local" contains local-machine-only user data
		return valOrPath(process.env.LOCALAPPDATA, [baseDir(), 'AppData', 'Local']);
	}

	const cache = () => valOrPath(process.env.XDG_CACHE_HOME, [localAppData(), 'xdg.cache']);
	const config = () => valOrPath(process.env.XDG_CONFIG_HOME, [appData(), 'xdg.config']);
	const data = () => valOrPath(process.env.XDG_DATA_HOME, [appData(), 'xdg.data']);
	const runtime = () => process.env.XDG_RUNTIME_DIR || void 0;
	const state = () => valOrPath(process.env.XDG_STATE_HOME, [localAppData(), 'xdg.state']);

	return { cache, config, data, runtime, state };
};

// eslint-disable-next-line functional/no-class
class XDG_ {
	constructor() {
		function XDG(): XDG {
			return new XDG_() as XDG;
		}

		const isMacOS = /^darwin$/i.test(process.platform);
		const isWinOS = /^win/i.test(process.platform);

		const extension = isMacOS ? macos() : isWinOS ? windows() : linux();

		XDG.cache = extension.cache;
		XDG.config = extension.config;
		XDG.data = extension.data;
		XDG.runtime = extension.runtime;
		XDG.state = extension.state;

		XDG.configDirs = function configDirs() {
			return [
				extension.config(),
				...(process.env.XDG_CONFIG_DIRS ? process.env.XDG_CONFIG_DIRS.split(path.delimiter) : []),
			];
		};

		XDG.dataDirs = function dataDirs() {
			return [
				extension.data(),
				...(process.env.XDG_DATA_DIRS ? process.env.XDG_DATA_DIRS.split(path.delimiter) : []),
			];
		};

		return XDG;
	}
}

const default_ = new XDG_() as XDG;
export default default_;
