module.exports = {
    "env": {
        // "browser": true,
        "commonjs": true,
		"es6": true,
		"node": true
    },
	"ignorePatterns": ['.eslintrc.js', '.nyc_output', 'build', 'coverage', 'dist', 'node_modules'],
	"plugins": ['import'],
	"extends": [
		'eslint:recommended',
		// 'plugin:@typescript-eslint/recommended',
		'plugin:eslint-comments/recommended',
		// 'plugin:import/typescript',
		// 'plugin:functional/lite',
		'prettier',
		// 'prettier/@typescript-eslint',
	],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
	"rules": {
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
		'eslint-comments/no-unused-disable': 'error',
		'import/order': ['error', { 'newlines-between': 'always', alphabetize: { order: 'asc' } }],
		'sort-imports': ['error', { ignoreDeclarationSort: true, ignoreCase: true }],
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
