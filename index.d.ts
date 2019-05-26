declare const xdg: {
	/**
	Directory for user-specific data files.

	@example
	```js
	import xdg = require('xdg-portable');

	xdg.data;
	//(mac)=> '/Users/rivy/Library/Application Support'
	//(nix)=> '/home/rivy/.local/share'
	//(win)=> 'C:\\Users\\rivy\\AppData\\Roaming\\xdg.data'
	```
	*/
	readonly data?: string;

	/**
	Directory for user-specific configuration files.

	@example
	```js
	import xdg = require('xdg-portable');

	xdg.config;
	//(mac)=> '/Users/rivy/Library/Preferences'
	//(nix)=> '/home/rivy/.config'
	//(win)=> 'C:\\Users\\rivy\\AppData\\Roaming\\xdg.config'
	```
	*/
	readonly config?: string;

	/**
	Directory for user-specific non-essential data files.

	@example
	```js
	import xdg = require('xdg-portable');

	xdg.cache;
	//(mac)=> '/Users/rivy/Library/Caches'
	//(nix)=> '/home/rivy/.cache'
	//(win)=> 'C:\\Users\\rivy\\AppData\\Local\\cache'
	```
	*/
	readonly cache?: string;

	/**
	Directory for user-specific non-essential runtime files and other file objects (such as sockets, named pipes, etc).

	@example
	```js
	import xdg = require('xdg-portable');

	xdg.runtime;
	//(mac)=> undefined
	//(nix)=> '/run/user/rivy'
	//(win)=> undefined
	```
	*/
	readonly runtime?: string;

	/**
	Preference-ordered array of base directories to search for data files in addition to `.data`.

	@example
	```js
	import xdg = require('xdg-portable');

	xdg.dataDirs
	//(mac)=> ['/Users/rivy/Library/Preferences']
	//(nix)=> ['/home/rivy/.local/share', '/usr/local/share/', '/usr/share/']
	//(win)=> ['C:\\Users\\rivy\\AppData\\Roaming\\xdg.data']
	```
	*/
	readonly dataDirs: readonly string[];

	/**
	Preference-ordered array of base directories to search for configuration files in addition to `.config`.

	@example
	```js
	import xdg = require('xdg-portable');

	xdg.configDirs;
	//(mac)=> ['/Users/rivy/Library/Preferences']
	//(nix)=> ['/home/rivy/.config', '/etc/xdg']
	//(win)=> ['C:\\Users\\rivy\\AppData\\Roaming\\xdg.config']
	```
	*/
	readonly configDirs: readonly string[];
};

export = xdg;
