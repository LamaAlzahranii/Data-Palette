import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.ff9d7f11.js","_app/immutable/chunks/scheduler.c5259ef5.js","_app/immutable/chunks/index.54314d84.js"];
export const stylesheets = [];
export const fonts = [];
