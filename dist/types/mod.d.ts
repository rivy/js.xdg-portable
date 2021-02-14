/** Determine XDG Base Directory paths (OS/platform portable). */
declare type XDG = {
    /** @constructor Create an `XDG` object. */
    new (): XDG;
    /** @constructor Create an `XDG` object. */
    (): XDG;
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
};

declare const default_: XDG;

export default default_;
export { XDG };
