

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.0d431217.js","_app/immutable/chunks/scheduler.c5259ef5.js","_app/immutable/chunks/index.54314d84.js"];
export const stylesheets = ["_app/immutable/assets/0.fe0b9143.css"];
export const fonts = [];
