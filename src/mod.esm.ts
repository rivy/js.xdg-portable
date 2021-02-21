import { Adapt } from './lib/XDG.js';
import type { XDG } from './lib/XDG.js';
import { adapter } from './platform-adapters/node.js';

export type { XDG };
export default Adapt(adapter).XDG as XDG;
