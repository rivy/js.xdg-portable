// # spell-checker:ignore macos APPDATA LOCALAPPDATA

import { Platform } from '../platform-adapters/_base.js';

// XDG references
// # ref: <https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html> @@ <https://archive.is/aAhtw>
// # ref: <https://specifications.freedesktop.org/basedir-spec/latest/ar01s03.html> @@ <https://archive.is/7N0TN>
// # ref: <https://wiki.archlinux.org/index.php/XDG_Base_Directory> @@ <https://archive.is/VdO9n>
// # ref: <https://wiki.debian.org/XDGBaseDirectorySpecification#state> @@ <http://archive.is/pahId>
// # ref: <https://ploum.net/207-modify-your-application-to-use-xdg-folders> @@ <https://archive.is/f43Gk>

/** `XDG` (API) Determine XDG Base Directory paths (OS/platform portable). */
// eslint-disable-next-line functional/prefer-type-literal
interface XDG {
	/** @constructor Create an `XDG` object (`new` is optional). */
	// eslint-disable-next-line @typescript-eslint/no-misused-new
	new (): XDG;
	/** @constructor Create an `XDG` object (`new` is optional). */
	(): XDG;

	/* eslint-disable functional/no-method-signature */

	/** Returns the directory path for user-specific non-essential (ie, cached) data files. */
	cache(): string;

	/** Returns the directory path for user-specific configuration files.	*/
	config(): string;

	/** Returns directory path for user-specific data files. */
	data(): string;

	/**	Returns the directory path for user-specific non-essential runtime files (such as sockets, named pipes, etc); may be `undefined`. */
	runtime(): string | undefined;

	/** Returns the directory path for user-specific state files (non-essential and more volatile than configuration files). */
	state(): string;

	/** Returns a preference-ordered array of base directory paths to search for configuration files (includes `.config()` directory as first entry). */
	configDirs(): readonly string[];

	/** Returns a preference-ordered array of base directory paths to search for data files (includes `.data()` directory as first entry). */
	dataDirs(): readonly string[];

	/* eslint-enable functional/no-method-signature */
}

function Adapt(adapter_: Platform.Adapter): { readonly XDG: XDG } {
	const { env, osPaths, path } = adapter_;

	const isMacOS = /^darwin$/i.test(adapter_.process.platform);
	const isWinOS = /^win/i.test(adapter_.process.platform);

	function baseDir() {
		return osPaths.home() || osPaths.temp();
	}

	function valOrPath(val: string | undefined, pathSegments: readonly string[]) {
		return val || path.join(...pathSegments);
	}

	const linux = () => {
		const cache = () => valOrPath(env.get('XDG_CACHE_HOME'), [baseDir(), '.cache']);
		const config = () => valOrPath(env.get('XDG_CONFIG_HOME'), [baseDir(), '.config']);
		const data = () => valOrPath(env.get('XDG_DATA_HOME'), [baseDir(), '.local', 'share']);
		const runtime = () => env.get('XDG_RUNTIME_DIR') || void 0;
		const state = () => valOrPath(env.get('XDG_STATE_HOME'), [baseDir(), '.local', 'state']);

		return { cache, config, data, runtime, state };
	};

	const macos = () => {
		const cache = () => valOrPath(env.get('XDG_CACHE_HOME'), [baseDir(), 'Library', 'Caches']);
		const config = () =>
			valOrPath(env.get('XDG_CONFIG_HOME'), [baseDir(), 'Library', 'Preferences']);
		const data = () =>
			valOrPath(env.get('XDG_DATA_HOME'), [baseDir(), 'Library', 'Application Support']);
		const runtime = () => env.get('XDG_RUNTIME_DIR') || void 0;
		const state = () => valOrPath(env.get('XDG_STATE_HOME'), [baseDir(), 'Library', 'State']);

		return { cache, config, data, runtime, state };
	};

	const windows = () => {
		// # ref: <https://www.thewindowsclub.com/local-localnow-roaming-folders-windows-10> @@ <http://archive.is/tDEPl>
		// Locations for cache/config/data/state are invented (Windows doesn't have a popular convention)

		function appData() {
			// ".../AppData/Roaming" contains data which may follow user between machines
			return valOrPath(env.get('APPDATA'), [baseDir(), 'AppData', 'Roaming']);
		}
		function localAppData() {
			// ".../AppData/Local" contains local-machine-only user data
			return valOrPath(env.get('LOCALAPPDATA'), [baseDir(), 'AppData', 'Local']);
		}

		const cache = () => valOrPath(env.get('XDG_CACHE_HOME'), [localAppData(), 'xdg.cache']);
		const config = () => valOrPath(env.get('XDG_CONFIG_HOME'), [appData(), 'xdg.config']);
		const data = () => valOrPath(env.get('XDG_DATA_HOME'), [appData(), 'xdg.data']);
		const runtime = () => env.get('XDG_RUNTIME_DIR') || void 0;
		const state = () => valOrPath(env.get('XDG_STATE_HOME'), [localAppData(), 'xdg.state']);

		return { cache, config, data, runtime, state };
	};

	// eslint-disable-next-line functional/no-class
	class XDG_ {
		constructor() {
			function XDG(): XDG {
				return new XDG_() as XDG;
			}

			const extension = isMacOS ? macos() : isWinOS ? windows() : linux();

			XDG.cache = extension.cache;
			XDG.config = extension.config;
			XDG.data = extension.data;
			XDG.runtime = extension.runtime;
			XDG.state = extension.state;

			XDG.configDirs = function configDirs() {
				const pathList = env.get('XDG_CONFIG_DIRS');
				return [extension.config(), ...(pathList ? pathList.split(path.delimiter) : [])];
			};

			XDG.dataDirs = function dataDirs() {
				const pathList = env.get('XDG_DATA_DIRS');
				return [extension.data(), ...(pathList ? pathList.split(path.delimiter) : [])];
			};

			return XDG;
		}
	}
	return { XDG: new XDG_() as XDG };
}

export type { XDG };
export { Adapt };
