# xdg-portable [![Build Status](https://travis-ci.org/rivy/js.xdg-portable.svg?branch=master)](https://travis-ci.org/rivy/js.xdg-portable)

> Get [XDG Base Directory](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html) paths

Forked from the original repository (sindresorhus/xdg-basedir) to add cross-platform portability (see <https://github.com/sindresorhus/xdg-basedir/pull/4>).

## Install

```
$ npm install xdg-portable
```

## Usage

```js
const xdg = require('xdg-portable');

xdg.data;
//(mac)=> '/Users/rivy/Library/Application Support'
//(nix)=> '/home/rivy/.local/share'
//(win)=> 'C:\\Users\\rivy\\AppData\\Roaming\\xdg.data'

xdg.config;
//(mac)=> '/Users/rivy/Library/Preferences'
//(nix)=> '/home/rivy/.config'
//(win)=> 'C:\\Users\\rivy\\AppData\\Roaming\\xdg.config'

xdg.dataDirs
//(mac)=> ['/Users/rivy/Library/Preferences']
//(nix)=> ['/home/rivy/.local/share', '/usr/local/share/', '/usr/share/']
//(win)=> ['C:\\Users\\rivy\\AppData\\Roaming\\xdg.data']
```

## API

The properties `.data`, `.config`, `.cache`, `.runtime` will return `null` in the uncommon case that both the XDG environment variable is not set and the users home directory can't be found. You need to handle this case. A common solution is to [fall back to a temp directory](https://github.com/yeoman/configstore/blob/b82690fc401318ad18dcd7d151a0003a4898a314/index.js#L15).

### .data

Directory for user-specific data files.

### .config

Directory for user-specific configuration files.

### .cache

Directory for user-specific non-essential data files.

### .runtime

Directory for user-specific non-essential runtime files and other file objects (such as sockets, named pipes, etc).

### .dataDirs

Preference-ordered array of base directories to search for data files in addition to `.data`.

### .configDirs

Preference-ordered array of base directories to search for configuration files in addition to `.config`.

## License

MIT © Roy Ivy III, [Sindre Sorhus](https://sindresorhus.com)
