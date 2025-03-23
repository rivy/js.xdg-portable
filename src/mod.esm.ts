import type { XDG } from './lib/XDG.js';
import { Adapt } from './lib/XDG.js';
import { adapter } from './platform-adapters/node.js';

const _: XDG = Adapt(adapter).XDG as XDG;

export default _;
