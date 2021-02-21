import { Adapt } from './lib/XDG.js';
import type { XDG } from './lib/XDG.js';
import { adapter } from './platform-adapters/node.js';

export = Adapt(adapter).XDG as XDG;
