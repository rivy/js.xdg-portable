// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Platform {
	export type Adapter = {
		readonly env: { readonly get: (_: string) => string | undefined };
		readonly osPaths: { readonly home: () => string | undefined; readonly temp: () => string };
		readonly path: {
			readonly delimiter: string;
			readonly join: (..._: readonly string[]) => string;
			readonly normalize: (_: string) => string;
		};
		readonly process: {
			readonly platform: string;
		};
	};
}
