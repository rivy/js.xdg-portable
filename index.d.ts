declare const xdg: {
	/**
	Directory for user-specific data files.

	@example
	```js
	import xdg = require('xdg-portable');

	xdg.data;
	//=> '/home/rivy/.local/share'
	```
	*/
	readonly data?: string;

	/**
	Directory for user-specific configuration files.

	@example
	```js
	import xdg = require('xdg-portable');

	xdg.config;
	//=> '/home/rivy/.config'
	```
	*/
	readonly config?: string;

	/**
	Directory for user-specific non-essential data files.

	@example
	```js
	import xdg = require('xdg-portable');

	xdg.cache;
	//=> '/home/rivy/.cache'
	```
	*/
	readonly cache?: string;

	/**
	Directory for user-specific non-essential runtime files and other file objects (such as sockets, named pipes, etc).

	@example
	```js
	import xdg = require('xdg-portable');

	xdg.runtime;
	//=> '/run/user/rivy'
	```
	*/
	readonly runtime?: string;

	/**
	Preference-ordered array of base directories to search for data files in addition to `.data`.

	@example
	```js
	import xdg = require('xdg-portable');

	xdg.dataDirs
	//=> ['/home/rivy/.local/share', '/usr/local/share/', '/usr/share/']
	```
	*/
	readonly dataDirs: readonly string[];

	/**
	Preference-ordered array of base directories to search for configuration files in addition to `.config`.

	@example
	```js
	import xdg = require('xdg-portable');

	xdg.configDirs;
	//=> ['/home/rivy/.config', '/etc/xdg']
	```
	*/
	readonly configDirs: readonly string[];
};

export = xdg;
