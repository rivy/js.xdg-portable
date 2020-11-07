<!DOCTYPE markdown><!-- markdownlint-disable no-inline-html -->
<meta charset="utf-8" content="text/markdown" lang="en">
<!-- -## editors ## (emacs/sublime) -*- coding: utf8-nix; tab-width: 4; mode: markdown; indent-tabs-mode: nil; basic-offset: 2; st-word_wrap: 'true' -*- ## (jEdit) :tabSize=4:indentSize=4:mode=markdown: ## (notepad++) vim:tabstop=4:syntax=markdown:expandtab:smarttab:softtabstop=2 ## modeline (see <https://archive.is/djTUD>@@<http://webcitation.org/66W3EhCAP> ) -->
<!-- spell-checker:ignore expandtab markdownlint modeline smarttab softtabstop -->

<!-- markdownlint-disable heading-increment -->
<!-- spell-checker:ignore rivy Sindre Sorhus sindresorhus -->
<!-- spell-checker:ignore APPDATA LOCALAPPDATA subdir tmpdir archlinux -->

# [xdg-portable](https://github.com/rivy/js.xdg-portable)

> Get [XDG Base Directory](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html) paths (cross-platform)

[![Build status][travis-image]][travis-url]
[![Build status][appveyor-image]][appveyor-url]
[![Coverage status][coverage-image]][coverage-url]
[![License][license-image]][license-url]
&nbsp; <br/>
[![Repository][repository-image]][repository-url]
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]
[![Javascript Style Guide][style-image]][style-url]

<!--
XDG references
# ref: <https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html> @@ <https://archive.is/aAhtw>
# ref: <https://specifications.freedesktop.org/basedir-spec/latest/ar01s03.html> @@ <https://archive.is/7N0TN>
# ref: <https://wiki.archlinux.org/index.php/XDG_Base_Directory> @@ <https://archive.is/VdO9n>
# ref: <https://wiki.debian.org/XDGBaseDirectorySpecification#state> @@ <http://archive.is/pahId>
# ref: <https://ploum.net/207-modify-your-application-to-use-xdg-folders> @@ <https://archive.is/f43Gk>
-->

## Installation

```shell
npm install xdg-portable
```

## Usage

```js
const xdg = require('xdg-portable')

const locatePath = require('locatePath')
const mkdirp = require('mkdirp')

configDir = xdg.config()
//(mac)=> '/Users/rivy/Library/Preferences'
//(nix)=> '/home/rivy/.config'
//(win)=> 'C:\\Users\\rivy\\AppData\\Roaming\\xdg.config'

dataDirs = xdg.dataDirs()
//(mac)=> ['/Users/rivy/Library/Application Support']
//(nix)=> ['/home/rivy/.local/share', '/usr/local/share/', '/usr/share/']
//(win)=> ['C:\\Users\\rivy\\AppData\\Roaming\\xdg.data']

stateDir = xdg.state()
//(mac)=> '/Users/rivy/Library/State'
//(nix)=> '/home/rivy/.local/state'
//(win)=> 'C:\\Users\\rivy\\AppData\\Local\\xdg.state'

mkdirp.sync(configDir, 0o700);

const dataDir = locatePath.sync(dataDirs) || dataDirs[0]
mkdirp.sync(dataDir, 0o700);

mkdirp.sync(stateDir, 0o700);
```

## API

### Initialization

#### `require('xdg-portable'): XDGPortable()`

```js
const xdg = require('xdg-portable')
```

The object returned by the module constructor is an XDGPortable Function object, augmented with attached methods. When called directly (eg, `const p = xdg()`), it returns a newly constructed XDGPortable object. Since the XDGPortable object contains no instance state, all constructed objects will be functionally identical.

### Methods

All module methods return platform-compatible path strings.

The returned paths are simple strings and are *not* guaranteed to exist. The application is responsible for construction of the directories when needed. If needed, [`make-dir`](https://www.npmjs.com/package/make-dir) or [`mkdirp`](https://www.npmjs.com/package/mkdirp) can be used to create the directories.

#### `xdg.cache(): string`

Returns the directory for user-specific non-essential (cached) data files

> Deletion of the data contained here might cause the application to slow down.

This location would be analogous to */var/cache* for *nix.

`%LocalAppData%\xdg.cache` is the default for the windows platform.

#### `xdg.config(): string`

Returns the directory for user-specific configuration files

> Deletion of the data contained here might require the user to reconfigure the application.

This location would be analogous to */etc* for *nix.

`%AppData%\xdg.config` is the default for the windows platform.

#### `xdg.data(): string`

Returns the directory for user-specific data files

> Deletion of the data contained here might force the user to restore from backups.

This location would be analogous to */usr/share* for *nix.

`%AppData%\xdg.data` is the default for the windows platform.

#### `xdg.runtime(): string?`

Returns the directory for user-specific non-essential runtime data files (such as sockets, named pipes, etc); may be `undefined`

> Deletion of the data contained here might interfere with the currently executing application but should have no effect on future executions.

The XDG specification defines some fairly strict specifications for a "runtime"-data candidate directory. To meet these criteria, the directory must usually be supplied by the OS. The user may override this by using the `XDG_RUNTIME_DIR` environment variable.

`undefined` is the default for the windows platform.

- ref: [archlinux ~ XDG Base Directory](https://wiki.archlinux.org/index.php/XDG_Base_Directory#User_directories)

#### `xdg.state(): string`

Returns the directory for user-specific state files (non-essential and more volatile than configuration files)

> Deletion of the data contained here should not materially interfere with execution of the application.

This location might hold data such as backups, input history, logs, recent file lists, visual application state, etc.

`%LocalAppData%\xdg.state` is the default for the windows platform.

#### `xdg.configDirs(): string[]`

Returns a reference-ordered array of base directories to search for configuration files (includes `.config()` as the first entry)

#### `xdg.dataDirs(): string[]`

Returns a preference-ordered array of base directories to search for data files (includes `.data()` as the first entry)

## Discussion

The [XDG Base Directory Specification](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html) defines categories of user information (ie, "cache", "config", "data", ...), defines their standard storage locations, and defines the standard process for user configuration of those locations (using `XDG_CACHE_HOME`, etc).

Applications supporting the XDG convention are expected to store user-specific files within these locations, either within the common/shared directory (eg, `` `${xdg.cache()}/filename` ``) or within a more isolated application-defined subdirectory (eg, `` `${xdg.config()}/dir/filename` ``; `dir` usually being the application name).

### Windows ("win32") specific notes

Windows has an alternate convention, offering just two standard locations for applications to persist data, either `%APPDATA%` (for files which may "roam" with the user between hosts) and `%LOCALAPPDATA%` (for local-machine-only files). All application files are expected to be stored within an application-unique subdirectory in one of those two locations, usually under a directory matching the application name. There is no further popular convention used to segregate the file types (ie, into "cache", "config", ...) in any way similar to the XDG specification.

So, to support basic XDG-like behavior (that is, segregating the information types into type-specific directories), this module creates a new convention for Windows hosts, placing the specific types of files into subdirectories under either `%APPDATA%` or `%LOCALAPPDATA%`, as appropriate for the file type. For example, "cache"-type files will be offered placement into `%LOCALAPPDATA%\xdg.cache`, "config"-type files into `%APPDATA%\xdg.config`, "data"-type files into `%APPDATA%\xdg.data`, etc.

[`xdg-app-paths`](https://www.npmjs.com/package/xdg-app-paths) builds on this module and offers application specific paths more in-line with usual platform conventions, but still compatible with the XDG specification.

### Fallback to `os.tmpdir()`

In the uncommon case that both the XDG environment variable is not set and the users home directory can't be found, `os.tmpdir()` will be used as a fallback for the missing `os.homedir()` value.

### Origins

This module was forked from [sindresorhus/xdg-basedir](https://github.com/sindresorhus/xdg-basedir) in order to add cross-platform portability and support simpler cross-platform applications.

- ref: <https://github.com/sindresorhus/xdg-basedir/pull/4>

## Related

- [`xdg-app-paths`](https://www.npmjs.com/package/xdg-app-paths) ... easy XDG for applications
- [`xdg-basedir`](https://www.npmjs.com/package/xdg-basedir) ... inspiration for this module

## License

MIT © [Roy Ivy III](https://github.com/rivy), [Sindre Sorhus](https://sindresorhus.com)

<!-- badge references -->

<!-- [npm-image]: https://img.shields.io/npm/v/xdg-portable.svg?style=flat&label=%E2%81%A3&logo=NPM&logoColor=linen -->
[npm-image]: https://img.shields.io/npm/v/xdg-portable.svg?style=flat
[npm-url]: https://npmjs.org/package/xdg-portable

<!-- [appveyor-image]: https://ci.appveyor.com/api/projects/status/.../branch/master?svg=true -->
[appveyor-image]: https://img.shields.io/appveyor/ci/rivy/js-xdg-portable/master.svg?style=flat&logo=AppVeyor&logoColor=deepskyblue
[appveyor-url]: https://ci.appveyor.com/project/rivy/js-xdg-portable
<!-- [travis-image]: https://travis-ci.org/rivy/js.xdg-portable.svg?branch=master -->
<!-- [travis-image]: https://img.shields.io/travis/rivy/js.xdg-portable/master.svg?style=flat&logo=Travis-CI&logoColor=silver -->
[travis-image]: https://img.shields.io/travis/rivy/js.xdg-portable/master.svg?style=flat&logo=travis
[travis-url]: https://travis-ci.org/rivy/js.xdg-portable

<!-- [coverage-image]: https://img.shields.io/coveralls/github/rivy/xdg-portable/master.svg -->
<!-- [coverage-url]: https://coveralls.io/github/rivy/xdg-portable -->
[coverage-image]: https://img.shields.io/codecov/c/github/rivy/js.xdg-portable/master.svg
[coverage-url]: https://codecov.io/gh/rivy/js.xdg-portable
[downloads-image]: http://img.shields.io/npm/dm/xdg-portable.svg?style=flat
[downloads-url]: https://npmjs.org/package/xdg-portable
[license-image]: https://img.shields.io/npm/l/xdg-portable.svg?style=flat
[license-url]: license
<!-- [repository-image]:https://img.shields.io/badge/%E2%9D%A4-darkcyan?style=flat&logo=github -->
<!-- note: %E2%81%A3 == utf-8 sequence of 'Unicode Character 'INVISIBLE SEPARATOR' (U+2063)' -->
[repository-image]:https://img.shields.io/github/v/tag/rivy/js.xdg-portable?label=%E2%81%A3&logo=github&logoColor=white
[repository-url]:https://github.com/rivy/js.xdg-portable
<!-- [style-image]: https://img.shields.io/badge/code_style-standard-darkcyan.svg -->
<!-- [style-url]: https://standardjs.com -->
[style-image]: https://img.shields.io/badge/code_style-XO-darkcyan.svg
[style-url]: https://github.com/xojs/xo