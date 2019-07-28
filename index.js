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
	const object = {};

	object.cache = () => process.env.XDG_CACHE_HOME || path.join(os.homedir() || os.tmpdir(), '.cache');
	object.config = () => process.env.XDG_CONFIG_HOME || path.join(os.homedir() || os.tmpdir(), '.config');
	object.data = () => process.env.XDG_DATA_HOME || path.join(os.homedir() || os.tmpdir(), '.local', 'share');
	object.runtime = () => process.env.XDG_RUNTIME_DIR || undefined;
	object.state = () => process.env.XDG_STATE_HOME || path.join(os.homedir() || os.tmpdir(), '.local', 'state');

	return object;
};

const macos = () => {
	const object = {};

	object.cache = () => process.env.XDG_CACHE_HOME || path.join(path.join(os.homedir() || os.tmpdir(), 'Library'), 'Caches');
	object.config = () => process.env.XDG_CONFIG_HOME || path.join(path.join(os.homedir() || os.tmpdir(), 'Library'), 'Preferences');
	object.data = () => process.env.XDG_DATA_HOME || path.join(path.join(os.homedir() || os.tmpdir(), 'Library'), 'Application Support');
	object.runtime = () => process.env.XDG_RUNTIME_DIR || undefined;
	object.state = () => process.env.XDG_STATE_HOME || path.join(path.join(os.homedir() || os.tmpdir(), 'Library'), 'State');

	return object;
};

const windows = () => {
	const object = {};
	// # ref: <https://www.thewindowsclub.com/local-localnow-roaming-folders-windows-10> @@ <http://archive.is/tDEPl>
	// Locations for cache/config/data/state are invented (Windows doesn't have a popular convention)

	object.cache = () => {
		const localAppData = process.env.LOCALAPPDATA || path.join(os.homedir() || os.tmpdir(), 'AppData', 'Local');	// "AppData/Local" contains local-machine-only user data
		return process.env.XDG_CACHE_HOME || path.join(localAppData, 'xdg.cache');
	};

	object.config = () => {
		const appData = process.env.APPDATA || path.join(os.homedir() || os.tmpdir(), 'AppData', 'Roaming');			// "AppData/Roaming" contains data which may follow user between machines
		return process.env.XDG_CONFIG_HOME || path.join(appData, 'xdg.config');
	};

	object.data = () => {
		const appData = process.env.APPDATA || path.join(os.homedir() || os.tmpdir(), 'AppData', 'Roaming');			// "AppData/Roaming" contains data which may follow user between machines
		return process.env.XDG_DATA_HOME || path.join(appData, 'xdg.data');
	};

	object.runtime = () => process.env.XDG_RUNTIME_DIR || undefined;

	object.state = () => {
		const localAppData = process.env.LOCALAPPDATA || path.join(os.homedir() || os.tmpdir(), 'AppData', 'Local');	// "AppData/Local" contains local-machine-only user data
		return process.env.XDG_STATE_HOME || path.join(localAppData, 'xdg.state');
	};

	return object;
};

const _XDGPortable = () => {
	const XDGPortable = function () {
		return _XDGPortable();
	};

	let extension = {};
	if (/^darwin$/i.test(process.platform)) {
		extension = macos();
	} else 	if (/^win/i.test(process.platform)) {
		extension = windows();
	} else {
		extension = linux();
	}

	extension.configDirs = () => {
		const dirs = [];
		dirs.push(extension.config());
		if (process.env.XDG_CONFIG_DIRS) {
			dirs.push(...process.env.XDG_CONFIG_DIRS.split(path.delimiter));
		}

		return dirs;
	};

	extension.dataDirs = () => {
		const dirs = [];
		dirs.push(extension.data());
		if (process.env.XDG_DATA_DIRS) {
			dirs.push(...process.env.XDG_DATA_DIRS.split(path.delimiter));
		}

		return dirs;
	};

	Object.keys(extension).forEach(key => {
		XDGPortable[key] = extension[key];
	});

	return XDGPortable;
};

module.exports = _XDGPortable();
