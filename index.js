// # spell-checker:ignore macos APPDATA LOCALAPPDATA
/* eslint-env es6, node */
'use strict';

const os = require('os');
const path = require('path');

// XDG references
// # ref: <https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html> @@ <https://archive.is/aAhtw>
// # ref: <https://specifications.freedesktop.org/basedir-spec/latest/ar01s03.html> @@ <https://archive.is/7N0TN>
// # ref: <https://wiki.archlinux.org/index.php/XDG_Base_Directory> @@ <https://archive.is/VdO9n>
// # ref: <https://wiki.debian.org/XDGBaseDirectorySpecification#state> @@ <http://archive.is/pahId>
// # ref: <https://ploum.net/207-modify-your-application-to-use-xdg-folders> @@ <https://archive.is/f43Gk>

const linux = () => {
	function _cache() {
		return process.env.XDG_CACHE_HOME || path.join(os.homedir() || os.tmpdir(), '.cache');
	}

	function _config() {
		return process.env.XDG_CONFIG_HOME || path.join(os.homedir() || os.tmpdir(), '.config');
	}

	function _data() {
		return process.env.XDG_DATA_HOME || path.join(os.homedir() || os.tmpdir(), '.local', 'share');
	}

	function _runtime() {
		return process.env.XDG_RUNTIME_DIR || undefined;
	}

	function _state() {
		return process.env.XDG_STATE_HOME || path.join(os.homedir() || os.tmpdir(), '.local', 'state');
	}

	return {
		cache: _cache,
		config: _config,
		data: _data,
		runtime: _runtime,
		state: _state
	};
};

const macos = () => {
	function _cache() {
		return process.env.XDG_CACHE_HOME || path.join(path.join(os.homedir() || os.tmpdir(), 'Library'), 'Caches');
	}

	function _config() {
		return process.env.XDG_CONFIG_HOME || path.join(path.join(os.homedir() || os.tmpdir(), 'Library'), 'Preferences');
	}

	function _data() {
		return process.env.XDG_DATA_HOME || path.join(path.join(os.homedir() || os.tmpdir(), 'Library'), 'Application Support');
	}

	function _runtime() {
		return process.env.XDG_RUNTIME_DIR || undefined;
	}

	function _state() {
		return process.env.XDG_STATE_HOME || path.join(path.join(os.homedir() || os.tmpdir(), 'Library'), 'State');
	}

	return {
		cache: _cache,
		config: _config,
		data: _data,
		runtime: _runtime,
		state: _state
	};
};

const windows = () => {
	// # ref: <https://www.thewindowsclub.com/local-localnow-roaming-folders-windows-10> @@ <http://archive.is/tDEPl>
	// Locations for cache/config/data/state are invented (Windows doesn't have a popular convention)

	function _cache() {
		const localAppData = process.env.LOCALAPPDATA || path.join(os.homedir() || os.tmpdir(), 'AppData', 'Local');	// "AppData/Local" contains local-machine-only user data
		return process.env.XDG_CACHE_HOME || path.join(localAppData, 'xdg.cache');
	}

	function _config() {
		const appData = process.env.APPDATA || path.join(os.homedir() || os.tmpdir(), 'AppData', 'Roaming');			// "AppData/Roaming" contains data which may follow user between machines
		return process.env.XDG_CONFIG_HOME || path.join(appData, 'xdg.config');
	}

	function _data() {
		const appData = process.env.APPDATA || path.join(os.homedir() || os.tmpdir(), 'AppData', 'Roaming');			// "AppData/Roaming" contains data which may follow user between machines
		return process.env.XDG_DATA_HOME || path.join(appData, 'xdg.data');
	}

	function _runtime() {
		return process.env.XDG_RUNTIME_DIR || undefined;
	}

	function _state() {
		const localAppData = process.env.LOCALAPPDATA || path.join(os.homedir() || os.tmpdir(), 'AppData', 'Local');	// "AppData/Local" contains local-machine-only user data
		return process.env.XDG_STATE_HOME || path.join(localAppData, 'xdg.state');
	}

	return {
		cache: _cache,
		config: _config,
		data: _data,
		runtime: _runtime,
		state: _state
	};
};

const xdgPortable = () => {
	let exp = {};
	if (/^darwin$/i.test(process.platform)) {
		exp = macos();
	} else 	if (/^win/i.test(process.platform)) {
		exp = windows();
	} else {
		exp = linux();
	}

	function _configDirs() {
		const dirs = [];
		dirs.push(exp.config());
		if (process.env.XDG_CONFIG_DIRS) {
			dirs.push(...process.env.XDG_CONFIG_DIRS.split(path.delimiter));
		}

		return dirs;
	}

	function _dataDirs() {
		const dirs = [];
		dirs.push(exp.data());
		if (process.env.XDG_DATA_DIRS) {
			dirs.push(...process.env.XDG_DATA_DIRS.split(path.delimiter));
		}

		return dirs;
	}

	exp.configDirs = _configDirs;
	exp.dataDirs = _dataDirs;

	return exp;
};

module.exports = xdgPortable();
