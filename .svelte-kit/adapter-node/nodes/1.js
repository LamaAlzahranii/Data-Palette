

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.b79ec70b.js","_app/immutable/chunks/scheduler.c5259ef5.js","_app/immutable/chunks/index.54314d84.js","_app/immutable/chunks/singletons.ac3a9786.js"];
export const stylesheets = [];
export const fonts = [];
