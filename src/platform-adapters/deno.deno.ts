// Deno platform adapter
// spell-checker:ignore Deno

/* eslint-disable @typescript-eslint/ban-ts-comment */

// import Deno typings for IntelliSense
/* eslint-disable-next-line @typescript-eslint/triple-slash-reference */
/// <reference path='../../vendor/@types/deno@1.46.3/deno.d.ts'/>

// @ts-ignore ## suppress TS warnings about Deno-specific code/imports
import * as path from 'https://deno.land/std@0.134.0/path/mod.ts';
// @ts-ignore ## suppress TS warnings about Deno-specific code/imports
import osPaths from 'https://deno.land/x/os_paths@v7.2.0/src/mod.deno.ts';

// @ts-types='./_base.ts' ## allows type analysis regardless of Deno LSP status
import type { Platform } from './_base.js';

// Deno general permission(s) at time of import
// * Deno.Permissions (stabilized in v1.8.0)
// * hack: b/c of missing sync permissions API, general initial permission(s) are used to avoid requiring async access to env()
// * ref: [Expose sync versions of Deno.permissions functions](https://github.com/denoland/deno/issues/6388)
// @ts-ignore ## suppress TS warnings about Deno-specific code/imports
const queryEnv = await Deno?.permissions?.query({ name: 'env' });
const allowEnv = (queryEnv?.state ?? 'granted') === 'granted';

export const adapter: Platform.Adapter = {
	atImportPermissions: { env: allowEnv },
	// env: { get: (name: string) => adapter.atImportPermissions.env ? deno.env.get(name) : void 0 },
	env: { get: allowEnv ? Deno.env.get : (_: string) => void 0 },
	osPaths,
	path,
	process: { platform: Deno.build.os },
};

/* eslint-enable @typescript-eslint/ban-ts-comment */
