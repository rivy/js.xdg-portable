<!DOCTYPE markdown><!-- markdownlint-disable no-inline-html -->
<meta charset="utf-8" content="text/markdown" lang="en">
<!-- -## editors ## (emacs/sublime) -*- coding: utf8-nix; tab-width: 4; mode: markdown; indent-tabs-mode: nil; basic-offset: 2; st-word_wrap: 'true' -*- ## (jEdit) :tabSize=4:indentSize=4:mode=markdown: ## (notepad++) vim:tabstop=4:syntax=markdown:expandtab:smarttab:softtabstop=2 ## modeline (see <https://archive.is/djTUD>@@<http://webcitation.org/66W3EhCAP> ) -->
<!-- spell-checker:ignore expandtab markdownlint modeline smarttab softtabstop -->

<!-- spell-checker:ignore rivy Sindre Sorhus sindresorhus -->

# xdg-portable [![Build Status](https://travis-ci.org/rivy/js.xdg-portable.svg?branch=master)](https://travis-ci.org/rivy/js.xdg-portable)

> Get [XDG Base Directory](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html) paths

Forked from the original repository (sindresorhus/xdg-basedir) to add cross-platform portability (see <https://github.com/sindresorhus/xdg-basedir/pull/4>).

## Install

```shell
npm install xdg-portable
```

## Usage

```js
const xdg = require('xdg-portable');

xdg.config;
//(mac)=> '/Users/rivy/Library/Preferences'
//(nix)=> '/home/rivy/.config'
//(win)=> 'C:\\Users\\rivy\\AppData\\Roaming\\xdg.config'

xdg.data;
//(mac)=> '/Users/rivy/Library/Application Support'
//(nix)=> '/home/rivy/.local/share'
//(win)=> 'C:\\Users\\rivy\\AppData\\Roaming\\xdg.data'

xdg.dataDirs
//(mac)=> ['/Users/rivy/Library/Preferences']
//(nix)=> ['/home/rivy/.local/share', '/usr/local/share/', '/usr/share/']
//(win)=> ['C:\\Users\\rivy\\AppData\\Roaming\\xdg.data']
```

## API

The properties `.cache`, `.config`, `.data`, `.runtime`, `.state` will return `null` in the uncommon case that both the XDG environment variable is not set and the users home directory can't be found. You need to handle this case. A common solution is to [fall back to a temp directory](https://github.com/yeoman/configstore/blob/b82690fc401318ad18dcd7d151a0003a4898a314/index.js#L15).

### .cache

Directory for user-specific non-essential data files.

### .config

Directory for user-specific configuration files.

### .data

Directory for user-specific data files.

### .runtime

Directory for user-specific non-essential runtime files and other file objects (such as sockets, named pipes, etc).

### .state

Directory for user-specific state files (non-essential and more volatile than configuration files).

### .dataDirs

Preference-ordered array of base directories to search for data files in addition to `.data`.

### .configDirs

Preference-ordered array of base directories to search for configuration files in addition to `.config`.

## License

MIT © Roy Ivy III, [Sindre Sorhus](https://sindresorhus.com)
