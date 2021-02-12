import { Adapt } from './lib/XDG.js';
import type { XDG } from './lib/XDG.js';
import { adapter } from './platform-adapters/node.js';

const default_: XDG = Adapt(adapter).XDG;

export type { XDG };
export default default_;
