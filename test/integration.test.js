/* eslint-env es6, node */
/* eslint complexity: ['error', { max: 10 }] */ // set maximum cyclomatic complexity to 10; ref: <https://eslint.org/docs/rules/complexity>
/* eslint import/order: ["error", {"newlines-between": "always-and-inside-groups"}] */

// # spell-checker:ignore (modules) Deno ESM ESMs vNodeJSMajor vNodeJSminor cyclomatic execa

'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');

const test = require('ava');
const commandExists = require('command-exists');
const spawn = require('cross-spawn');

const modulePath = '../build/lab/src/mod.cjs.js';
// eslint-disable-next-line security/detect-non-literal-require , security-node/detect-non-literal-require-calls
const mod = require(modulePath);

const vNodeJS = process.versions.node.split('.');
const vNodeJSMajor = +vNodeJS[0];
const vNodeJSminor = +vNodeJS[1];

// removal of `--experimental-modules` flag gate for ESM
// ref: [NodeJS-v12.17 changes]<https://github.com/nodejs/node/pull/33197>
// ref: [NodeJS-v13.2 changes]<https://github.com/nodejs/node/pull/30547>
const settledSupportForESMs =
	vNodeJSMajor > 13 ||
	(vNodeJSMajor === 13 && vNodeJSminor >= 2) ||
	(vNodeJSMajor === 12 && vNodeJSminor >= 17);

// Integration tests

test('api', (t) => {
	const api = ['cache', 'config', 'data', 'runtime', 'state', 'configDirs', 'dataDirs'];

	t.is(typeof mod, 'function');
	t.deepEqual(Object.keys(mod).sort(), api.sort());
	api.forEach((key) => {
		// eslint-disable-next-line security/detect-object-injection
		t.is(typeof mod[key], 'function');
	});
});

// test examples using `--test-dist` (for version changes or distribution)
if (!process.env.npm_config_test_dist) {
	test('examples are executable...skipped (enable with `npm test --test-dist`)', (t) => t.pass());
} else {
	if (!commandExists.sync('deno')) {
		test.skip('`deno` not found; Deno examples not tested', (t) => {
			t.pass();
		});
	} else {
		test('examples are executable without error (Deno)', (t) => {
			// t.timeout(30000); // 30s timeout

			const egDirPath = 'eg';
			const extension_regexps = [/.*[.]deno[.]ts$/i];

			// eslint-disable-next-line security/detect-non-literal-fs-filename
			const files = fs.readdirSync(egDirPath);

			files
				.filter((file) => {
					return extension_regexps.find((re) => path.basename(file).match(re));
				})
				.forEach((file) => {
					const command = 'deno';
					const script = path.join(egDirPath, file);
					const args = ['run', '--allow-all', script];
					const options = { shell: true, encoding: 'utf-8' };

					const { error, status, stdout } = spawn.sync(command, args, options);

					if (error === null && status === 0) {
						t.log(
							util.inspect(script, /* showHidden */ void 0, /* depth */ void 0, /* color */ true),
							`(exit_status=${status})`
						);
					} else {
						t.log({ script, error, status, stdout });
					}

					t.deepEqual({ error, status }, { error: null, status: 0 });
				});
		});
	}

	test('examples are executable without error (JavaScript)', (t) => {
		// t.timeout(30000); // 30s timeout

		const egDirPath = 'eg';
		const extensions = ['.js', '.cjs', '.mjs'];

		// eslint-disable-next-line security/detect-non-literal-fs-filename
		const files = fs.readdirSync(egDirPath);

		files
			.filter((file) => {
				return extensions.includes(path.extname(file));
			})
			.forEach((file) => {
				if (settledSupportForESMs || path.extname(file) === '.js') {
					const command = 'node';
					const script = path.join(egDirPath, file);
					const args = [script];
					const options = { shell: true, encoding: 'utf-8' };

					const { error, status, stdout } = spawn.sync(command, args, options);

					if (error === null && status === 0) {
						t.log(
							util.inspect(script, /* showHidden */ void 0, /* depth */ void 0, /* color */ true),
							`(exit_status=${status})`
						);
					} else {
						t.log({ script, error, status, stdout });
					}

					t.deepEqual({ error, status }, { error: null, status: 0 });
				}
			});
	});

	test('examples are executable without error (TypeScript)', (t) => {
		// t.timeout(30000); // 30s timeout

		const egDirPath = 'eg';
		const extensions = ['.js', '.cjs', '.mjs', '.ts'];

		// eslint-disable-next-line security/detect-non-literal-fs-filename
		const files = fs.readdirSync(egDirPath);

		files
			.filter((file) => {
				const extension = path.extname(file);
				const name = path.basename(file, extension);
				const nameExtension = path.extname(name);
				const isDenoTS = extension === '.ts' && nameExtension === '.deno';
				return extensions.includes(extension) && !isDenoTS;
			})
			.forEach((file) => {
				if (settledSupportForESMs || path.extname(file) === '.js' || path.extname(file) === '.ts') {
					const command = 'node';
					const script = path.join(egDirPath, file);
					const args = ['node_modules/ts-node/dist/bin.js', script];
					const options = { shell: true, encoding: 'utf8' };

					const { error, status, stdout } = spawn.sync(command, args, options);

					const basename = path.basename(file);
					const extension = path.extname(file);
					const name = path.basename(file, extension);
					const nameExtension = path.extname(name);

					if (error === null && status === 0) {
						t.log(
							util.inspect(script, /* showHidden */ void 0, /* depth */ void 0, /* color */ true),
							`(exit_status=${status})`
						);
					} else {
						t.log({ script, basename, name, extension, nameExtension, error, status, stdout });
					}

					t.deepEqual({ error, status }, { error: null, status: 0 });
				}
			});
	});
}
