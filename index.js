// # spell-checker:ignore macos APPDATA LOCALAPPDATA

'use strict';

const os = require('os');
const path = require('path');

const homedir = os.homedir() || os.tmpdir();
const {env} = process;

// XDG references
// # ref: <https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html> @@ <https://archive.is/aAhtw>
// # ref: <https://specifications.freedesktop.org/basedir-spec/latest/ar01s03.html> @@ <https://archive.is/7N0TN>
// # ref: <https://wiki.archlinux.org/index.php/XDG_Base_Directory> @@ <https://archive.is/VdO9n>
// # ref: <https://wiki.debian.org/XDGBaseDirectorySpecification#state> @@ <http://archive.is/pahId>
// # ref: <https://ploum.net/207-modify-your-application-to-use-xdg-folders> @@ <https://archive.is/f43Gk>

const linux = () => {
	const _config = env.XDG_CONFIG_HOME ? env.XDG_CONFIG_HOME : path.join(homedir, '.config');
	const _data = env.XDG_DATA_HOME ? env.XDG_DATA_HOME : path.join(homedir, '.local', 'share');

	const _configDirs = [_config];
	if (env.XDG_CONFIG_DIRS) {
		_configDirs.push(...env.XDG_CONFIG_DIRS.split(path.delimiter));
	}

	const _dataDirs = [_data];
	if (env.XDG_DATA_DIRS) {
		_dataDirs.push(...env.XDG_DATA_DIRS.split(path.delimiter));
	}

	return {
		cache: env.XDG_CACHE_HOME || path.join(homedir, '.cache'),
		config: _config,
		data: _data,
		runtime: env.XDG_RUNTIME_DIR ? env.XDG_RUNTIME_DIR : undefined,
		state: env.XDG_STATE_HOME || path.join(homedir, '.local', 'state'),
		configDirs: _configDirs,
		dataDirs: _dataDirs
	};
};

const macos = () => {
	const library = path.join(homedir, 'Library');

	const _config = env.XDG_CONFIG_HOME ? env.XDG_CONFIG_HOME : path.join(library, 'Preferences');
	const _data = env.XDG_DATA_HOME ? env.XDG_DATA_HOME : path.join(library, 'Application Support');

	const _configDirs = [_config];
	if (env.XDG_CONFIG_DIRS) {
		_configDirs.push(...env.XDG_CONFIG_DIRS.split(path.delimiter));
	}

	const _dataDirs = [_data];
	if (env.XDG_DATA_DIRS) {
		_dataDirs.push(...env.XDG_DATA_DIRS.split(path.delimiter));
	}

	return {
		cache: env.XDG_CACHE_HOME ? env.XDG_CACHE_HOME : path.join(library, 'Caches'),
		config: _config,
		data: _data,
		runtime: env.XDG_RUNTIME_DIR ? env.XDG_RUNTIME_DIR : undefined,
		state: env.XDG_STATE_HOME ? env.XDG_STATE_HOME : path.join(library, 'State'),
		configDirs: _configDirs,
		dataDirs: _dataDirs
	};
};

const windows = () => {
	// # ref: <https://www.thewindowsclub.com/local-localnow-roaming-folders-windows-10> @@ <http://archive.is/tDEPl>
	const appData = env.APPDATA || path.join(homedir, 'AppData', 'Roaming');			// "AppData/Roaming" contains data which may follow user between machines
	const localAppData = env.LOCALAPPDATA || path.join(homedir, 'AppData', 'Local');	// "AppData/Local" contains local-machine-only user data

	// Locations for cache/config/data/state are invented (Windows doesn't have a popular convention)

	const _config = env.XDG_CONFIG_HOME ? env.XDG_CONFIG_HOME : path.join(appData, 'xdg.config');
	const _data = env.XDG_DATA_HOME ? env.XDG_DATA_HOME : path.join(appData, 'xdg.data');

	const _configDirs = [_config];
	if (env.XDG_CONFIG_DIRS) {
		_configDirs.push(...env.XDG_CONFIG_DIRS.split(path.delimiter));
	}

	const _dataDirs = [_data];
	if (env.XDG_DATA_DIRS) {
		_dataDirs.push(...env.XDG_DATA_DIRS.split(path.delimiter));
	}

	return {
		cache: env.XDG_CACHE_HOME ? env.XDG_CACHE_HOME : path.join(localAppData, 'xdg.cache'),
		config: _config,
		data: _data,
		runtime: env.XDG_RUNTIME_DIR ? env.XDG_RUNTIME_DIR : undefined,
		state: env.XDG_STATE_HOME ? env.XDG_STATE_HOME : path.join(localAppData, 'xdg.state'),
		configDirs: _configDirs,
		dataDirs: _dataDirs
	};
};

const xdgPortable = () => {
	if (process.platform === 'darwin') {
		return macos();
	}

	if (process.platform === 'win32') {
		return windows();
	}

	return linux();
};

module.exports = xdgPortable();
module.exports.default = xdgPortable();
