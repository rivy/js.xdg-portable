import * as path from 'path';

import osPaths from 'os-paths';

import { Platform } from './_base.js';

export const adapter: Platform.Adapter = {
	atImportPermissions: { env: true },
	env: {
		get: (s) => {
			// eslint-disable-next-line security/detect-object-injection
			return process.env[s];
		},
	},
	osPaths,
	path,
	process,
};
