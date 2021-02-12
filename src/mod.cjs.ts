import { Adapt } from './lib/XDG.js';
import { adapter } from './platform-adapters/node.js';

const _ = Adapt(adapter).XDG;

export = _;
