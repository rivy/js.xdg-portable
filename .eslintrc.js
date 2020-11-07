module.exports = {
    "env": {
        // "browser": true,
        "commonjs": true,
		"es6": true,
		"node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
	},
	"overrides": [
		{ // "test.js" (for `ava`) is in module format (ESM)
			"files": [ "unit.test.js" ],
			"parserOptions": {
				"sourceType": "module"
			}
		}
	]
};
