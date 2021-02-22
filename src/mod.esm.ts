import { Adapt } from './lib/XDG.js';
import type { XDG } from './lib/XDG.js';
import { adapter } from './platform-adapters/node.js';

const _: XDG = Adapt(adapter).XDG as XDG;

export type { XDG };
export default _;
