// spell-checker:ignore maint rivy
import { default as default_ } from './lib/XDG.js';

export default default_;

const haveModuleExports_ = typeof module === 'object' && module.exports;
// ## maint ~ [2020-12-23; rivy] `else` clause *is* tested, but coverage is not visible via `nyc` (currently unable to instrument ESM/.mjs correctly)
/* istanbul ignore else */
if (haveModuleExports_) {
	// enables direct require from CJS (eg, `const module = require('...');`), but generally disables any other exports
	// * skipped for ESM (missing `module.exports`)
	// * added non-enumerable '_esm!' property (as a hack) to allow full access to all exports (for testing, ...)
	// eslint-disable-next-line functional/immutable-data
	module.exports = default_;
}
