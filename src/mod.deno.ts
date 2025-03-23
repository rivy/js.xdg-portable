// spell-checker:ignore Deno

/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-ignore ## suppress TS warnings about Deno-specific code
import { Adapt } from '../dist/esm/lib/XDG.js';
// @ts-ignore ## suppress TS warnings about Deno-specific code
import { XDG } from '../dist/types/mod.esm.d.ts';

// @ts-ignore ## suppress TS warnings about Deno-specific code
import { adapter } from './platform-adapters/deno.deno.ts';

/* eslint-enable @typescript-eslint/ban-ts-comment */

const _: XDG = Adapt(adapter).XDG;

export type { XDG };
export default _;
