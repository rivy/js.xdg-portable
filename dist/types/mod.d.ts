/** Determine XDG Base Directory paths (OS/platform portable). */
declare type XDG = {
    /** @constructor Create an `XDG` object. */
    new (): XDG;
    /** @constructor Create an `XDG` object. */
    (): XDG;
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
};

declare const default_: XDG;

export default default_;
export { XDG };
