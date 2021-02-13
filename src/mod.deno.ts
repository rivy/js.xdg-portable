// spell-checker:ignore Deno

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Adapt } from '../dist/esm/lib/XDG.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { XDG } from '../dist/types/mod.d.ts';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { adapter } from './platform-adapters/deno.deno.ts';

const default_: XDG = Adapt(adapter).XDG;

// // ref: <https://github.com/microsoft/TypeScript/issues/28481#issuecomment-453584716>
// export type OSPaths = OSPaths;
export type { XDG };
export default default_;
