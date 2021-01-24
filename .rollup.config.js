// ref: <https://devhints.io/rollup>
// setup: `npm i rollup @rollup/plugin-typescript` or `npm i rollup rollup-plugin-typescript2` (for visible TS error output)

// import typescript from '@rollup/plugin-typescript';
import typescript from 'rollup-plugin-typescript2';

export default [
	// ES module build (replaces broken basic TypeScript compilation)
	// * ref: <https://github.com/microsoft/TypeScript/issues/18442> , <https://github.com/alshdavid/rxjs/blob/main/rollup.config.js#L10>
	// * ref: <https://github.com/microsoft/TypeScript/pull/35148>
	// * ref: <https://github.com/microsoft/TypeScript/issues/37582>
	{
		preserveModules: true,
		input: ['src/index.ts'],
		external: ['path', 'os', 'os-paths'],
		output: [{ exports: 'auto', dir: 'build/esm', format: 'esm', entryFileNames: '[name].mjs' }],
		plugins: [typescript({ tsconfig: './tsconfig/tsconfig.esm.json' })],
	},
];
