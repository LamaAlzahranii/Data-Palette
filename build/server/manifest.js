const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.43f71889.js","app":"_app/immutable/entry/app.c0c2b6cd.js","imports":["_app/immutable/entry/start.43f71889.js","_app/immutable/chunks/scheduler.c5259ef5.js","_app/immutable/chunks/singletons.ac3a9786.js","_app/immutable/entry/app.c0c2b6cd.js","_app/immutable/chunks/scheduler.c5259ef5.js","_app/immutable/chunks/index.54314d84.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./chunks/0-CboTt9p8.js')),
			__memo(() => import('./chunks/1-Cj127wDY.js')),
			__memo(() => import('./chunks/2-NnnGkMoK.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
