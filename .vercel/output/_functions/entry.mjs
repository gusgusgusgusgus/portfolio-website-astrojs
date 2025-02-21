import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_3IC-luI2.mjs';
import { manifest } from './manifest_Dat1AD2f.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/en.astro.mjs');
const _page2 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.3.0_@types+node@22.13.4_lightningcss@1.28.2_rollup@4.34.8_terser@5.37.0_typescript@5.7.3_yaml@2.7.0/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    [".astro/astro-i18n/entrypoints/en/index.astro", _page1],
    [".astro/astro-i18n/entrypoints/fr/index.astro", _page2]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "7b8f1a15-8d61-47cc-a4fc-2cd4475a779a",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
