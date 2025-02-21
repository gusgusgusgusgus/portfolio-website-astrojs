import { c as createComponent, X as createAstro, Y as addAttribute, a as renderTemplate, Z as unescapeHTML, m as maybeRenderHead, _ as spreadAttributes, r as renderComponent, $ as Fragment, a0 as renderScript, a1 as renderSlot, a2 as renderHead } from './astro/server_DXJvspxA.mjs';
/* empty css                         */
import { $ as $$Picture } from './_astro_assets_BOAU5A0X.mjs';
import { a as als } from './als_yUB2jklQ.mjs';
import _i18next from 'i18next';

const _getConfig = () => als.getStore();
const _getI18next = () => _i18next;
const _envCheck = (name, { serverOnly = false, clientFeatures = [] } = {}) => {
  if (clientFeatures.length > 0 && false) ;
};
const _dir = (locale) => {
  const rtlLocales = [
    "ar",
    "shu",
    "sqr",
    "ssh",
    "xaa",
    "yhd",
    "yud",
    "aao",
    "abh",
    "abv",
    "acm",
    "acq",
    "acw",
    "acx",
    "acy",
    "adf",
    "ads",
    "aeb",
    "aec",
    "afb",
    "ajp",
    "apc",
    "apd",
    "arb",
    "arq",
    "ars",
    "ary",
    "arz",
    "auz",
    "avl",
    "ayh",
    "ayl",
    "ayn",
    "ayp",
    "bbz",
    "pga",
    "he",
    "iw",
    "ps",
    "pbt",
    "pbu",
    "pst",
    "prp",
    "prd",
    "ug",
    "ur",
    "ydd",
    "yds",
    "yih",
    "ji",
    "yi",
    "hbo",
    "men",
    "xmn",
    "fa",
    "jpr",
    "peo",
    "pes",
    "prs",
    "dv",
    "sam",
    "ckb"
  ];
  return rtlLocales.includes(locale) ? "rtl" : "ltr";
};
const _withoutTrailingSlash = (path) => path.endsWith("/") ? path.slice(0, -1) : path;
const t = (...args) => {
  _envCheck("t", { clientFeatures: ["data", "translations"] });
  const config = _getConfig();
  const i18next = _getI18next();
  if (!config.translations.initialized) {
    i18next.init({
      lng: config.data.locale,
      defaultNS: config.translations.i18nextConfig.defaultNamespace,
      ns: config.translations.i18nextConfig.namespaces,
      resources: config.translations.i18nextConfig.resources
    });
    config.translations.initialized = true;
  }
  return i18next.t(...args);
};
const getLocale = () => {
  _envCheck("getLocale", { clientFeatures: ["data"] });
  return _getConfig().data.locale;
};
const getLocales = () => {
  _envCheck("getLocales", { clientFeatures: ["data"] });
  return _getConfig().data.locales;
};
const getHtmlAttrs = () => {
  _envCheck("getHtmlAttrs", { clientFeatures: ["data"] });
  return {
    lang: getLocale(),
    dir: _dir(getLocale())
  };
};
const getLocalePath = (path, params = {}, _locale = getLocale()) => {
  _envCheck("getLocalePath", { clientFeatures: ["data", "paths"] });
  const config = _getConfig();
  const route = config.paths.routes.find(
    (route2) => route2.locale === _locale && route2.pattern === path
  );
  if (!route) {
    const prefix = config.paths.strategy === "prefix" ? `/${_locale}` : _locale === config.data.defaultLocale ? "" : `/${_locale}`;
    return `${prefix}${path}`;
  }
  let newPath = route.injectedRoute.pattern;
  for (const param of route.params) {
    const value = params[param];
    if (!value) {
      throw new Error(`Must provide "${param}" param`);
    }
    newPath = newPath.replace(`[${param}]`, value);
  }
  return newPath;
};
const switchLocalePath = (locale) => {
  _envCheck("switchLocalePath", { clientFeatures: ["data", "paths"] });
  const config = _getConfig();
  const currentLocaleRoutes = config.paths.routes.filter(
    (route2) => route2.locale === getLocale()
  );
  let currentLocaleRoute = currentLocaleRoutes.filter((route2) => route2.params.length === 0).find(
    (route2) => route2.injectedRoute.pattern === _withoutTrailingSlash(config.paths.pathname)
  );
  if (!currentLocaleRoute) {
    currentLocaleRoute = currentLocaleRoutes.filter((route2) => route2.params.length > 0).find((route2) => {
      let pattern = route2.injectedRoute.pattern.replace(/[*.]/g, "\\$&");
      pattern = Object.keys(
        config.paths.dynamicParams?.[locale] ?? {}
      ).reduce((acc, key) => acc.replace(`[${key}]`, ".*"), pattern);
      pattern = pattern.replace(/[-[\]{}()+?,\\^$|#\s]/g, "\\$&");
      return new RegExp(`^${pattern}$`).test(
        _withoutTrailingSlash(config.paths.pathname)
      );
    });
  }
  if (!currentLocaleRoute) {
    currentLocaleRoute = currentLocaleRoutes.sort(
      (a, b) => a.pattern.length - b.pattern.length
    )[0];
  }
  const route = config.paths.routes.find(
    (route2) => route2.locale === locale && currentLocaleRoute.pattern === route2.pattern
  );
  if (!route) {
    throw new Error("Couldn't find a route. Open an issue");
  }
  return getLocalePath(
    route.pattern,
    config.paths.dynamicParams?.[locale] ?? void 0,
    locale
  );
};
const getSwitcherData = () => {
  _envCheck("getSwitcherData", { clientFeatures: ["data", "paths"] });
  return getLocales().map((locale) => ({
    locale,
    href: switchLocalePath(locale)
  }));
};

const URL = "https://www.augustinseminel.com";

const $$Astro$8 = createAstro("https://www.augustinseminel.com");
const $$I18NHead = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$I18NHead;
  const data = getSwitcherData();
  return renderTemplate`${data.map(({ locale, href }) => renderTemplate`<link rel="alternate"${addAttribute(locale, "hreflang")}${addAttribute(Astro2.url.origin + href, "href")}>`)}`;
}, "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/node_modules/.pnpm/@astrolicious+i18n@0.6.1_@types+node@22.13.4_astro@5.3.0_@types+node@22.13.4_lightningcss@1.2_oj5b2jr2mebh573rrjxg4dqrqq/node_modules/@astrolicious/i18n/assets/components/I18nHead.astro", void 0);

const inter = "/_astro/inter-latin-standard-normal.B2BMxjQQ.woff2";

function JsonLd(item, space) {
  return JSON.stringify(item, safeJsonLdReplacer, space);
}
const ESCAPE_ENTITIES = Object.freeze({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;"
});
const ESCAPE_REGEX = new RegExp(
  `[${Object.keys(ESCAPE_ENTITIES).join("")}]`,
  "g"
);
const ESCAPE_REPLACER = (t) => ESCAPE_ENTITIES[t];
const safeJsonLdReplacer = /* @__PURE__ */ (() => {
  return (_, value) => {
    switch (typeof value) {
      case "object":
        if (value === null) {
          return void 0;
        }
        return value;
      // JSON.stringify will recursively call replacer.
      case "number":
      case "boolean":
      case "bigint":
        return value;
      // These values are not risky.
      case "string":
        return value.replace(ESCAPE_REGEX, ESCAPE_REPLACER);
      default: {
        return void 0;
      }
    }
  };
})();

var __freeze$3 = Object.freeze;
var __defProp$3 = Object.defineProperty;
var __template$3 = (cooked, raw) => __freeze$3(__defProp$3(cooked, "raw", { value: __freeze$3(cooked.slice()) }));
var _a$3;
const $$Astro$7 = createAstro("https://www.augustinseminel.com");
const $$Schema = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Schema;
  const { item, space } = Astro2.props;
  return renderTemplate(_a$3 || (_a$3 = __template$3(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JsonLd(item, space)));
}, "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/node_modules/.pnpm/astro-seo-schema@5.0.0_astro@5.3.0_@types+node@22.13.4_lightningcss@1.28.2_rollup@4.34.8_ters_zzfopkpwqgo5n5lggvfq53y24m/node_modules/astro-seo-schema/dist/Schema.astro", void 0);

const $$Favicons = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<link rel="icon" type="image/svg+xml" href="/favicons/favicon.svg">
<meta name="apple-mobile-web-app-title" content="Unicorn Sparkle">
<link rel="shortcut icon" href="/favicons/favicon.ico">
<link rel="manifest" href="/favicons/site.webmanifest">
<link rel="icon" type="image/png" href="/favicons/favicon-48x48.png" sizes="48x48">
<link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png">`;
}, "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/src/components/Favicons.astro", void 0);

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(cooked.slice()) }));
var _a$2;
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const { designed } = t("footer", {
    returnObjects: true
  });
  const { designed_by: designedBy } = designed;
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate(_a$2 || (_a$2 = __template$2(["", '<footer data-astro-cid-sz7xmlte>\n  <p data-astro-cid-sz7xmlte>\n    <span data-astro-cid-sz7xmlte>\n      \xA9 <span id="year" data-astro-cid-sz7xmlte>', "</span>\n      ", `
      <a href="https://www.linkedin.com/in/ux-ana-rangel" target="_blank" rel="noopener noreferrer" data-astro-cid-sz7xmlte>Ana Rangel, UX Designer</a>
    </span>
  </p>
</footer>



<script>
  document.querySelector('#year').textContent = new Date().getFullYear()
<\/script>`])), maybeRenderHead(), year, designedBy);
}, "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/src/components/Footer.astro", void 0);

const icons = {"local":{"prefix":"local","lastModified":1740155436,"icons":{"close":{"body":"<path fill=\"currentColor\" d=\"m12 13.4-4.9 4.9q-.275.275-.7.275t-.7-.275-.275-.7.275-.7l4.9-4.9-4.9-4.9q-.275-.275-.275-.7t.275-.7.7-.275.7.275l4.9 4.9 4.9-4.9q.275-.275.7-.275t.7.275.275.7-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7-.7.275-.7-.275z\"/>"},"github":{"body":"<path fill=\"currentColor\" d=\"M12 2.5a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34C5.68 17.31 5.03 17 5.03 17c-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85v2.74c0 .27.16.59.67.5 3.97-1.34 6.83-5.08 6.83-9.5a10 10 0 0 0-10-10\"/>","height":25},"language":{"body":"<path fill=\"currentColor\" d=\"m478.33 433.6-90-218a22 22 0 0 0-40.67 0l-90 218a22 22 0 1 0 40.67 16.79L316.66 406h102.67l18.33 44.39A22 22 0 0 0 458 464a22 22 0 0 0 20.32-30.4ZM334.83 362 368 281.65 401.17 362Zm-66.99-19.08a22 22 0 0 0-4.89-30.7c-.2-.15-15-11.13-36.49-34.73 39.65-53.68 62.11-114.75 71.27-143.49H330a22 22 0 0 0 0-44H214V70a22 22 0 0 0-44 0v20H54a22 22 0 0 0 0 44h197.25c-9.52 26.95-27.05 69.5-53.79 108.36-31.41-41.68-43.08-68.65-43.17-68.87a22 22 0 0 0-40.58 17c.58 1.38 14.55 34.23 52.86 83.93.92 1.19 1.83 2.35 2.74 3.51-39.24 44.35-77.74 71.86-93.85 80.74a22 22 0 1 0 21.07 38.63c2.16-1.18 48.6-26.89 101.63-85.59 22.52 24.08 38 35.44 38.93 36.1a22 22 0 0 0 30.75-4.9Z\"/>","width":512,"height":512},"link":{"body":"<path fill=\"currentColor\" d=\"M22.5 8.772A5.1 5.1 0 0 1 21 12.24l-3.258 3.26a5.1 5.1 0 0 1-3.621 1.5h-.005A5.12 5.12 0 0 1 9 11.735a.75.75 0 1 1 1.5.042 3.622 3.622 0 0 0 5.003 3.45 3.6 3.6 0 0 0 1.174-.787l3.258-3.258a3.621 3.621 0 0 0-5.121-5.122l-1.032 1.032a.75.75 0 0 1-1.06-1.06L13.753 5a5.122 5.122 0 0 1 8.385 1.732c.258.648.38 1.342.362 2.04m-12.281 9.134-1.031 1.03A3.6 3.6 0 0 1 6.618 20a3.622 3.622 0 0 1-2.558-6.182l3.253-3.258a3.622 3.622 0 0 1 6.187 2.663.75.75 0 0 0 1.5.042A5.14 5.14 0 0 0 13.5 9.5a5.123 5.123 0 0 0-7.244 0L3 12.758a5.12 5.12 0 0 0 5.577 8.355A5.1 5.1 0 0 0 10.237 20l1.032-1.031a.75.75 0 0 0-1.05-1.063\"/>","height":25},"linkedin":{"body":"<path fill=\"currentColor\" d=\"M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z\"/>"},"mail":{"body":"<path fill=\"currentColor\" d=\"M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7L4 8v10h16V8zm0-2 8-5H4zM4 8V6v12z\"/>"},"menu":{"body":"<mask id=\"a\" width=\"24\" height=\"24\" x=\"0\" y=\"0\" maskUnits=\"userSpaceOnUse\" style=\"mask-type:alpha\"><path fill=\"#D9D9D9\" d=\"M0 0h24v24H0z\"/></mask><g fill=\"none\" mask=\"url(#a)\"><path fill=\"currentColor\" d=\"M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z\"/></g>"},"moon":{"body":"<mask id=\"a\" width=\"16\" height=\"16\" x=\"0\" y=\"0\" maskUnits=\"userSpaceOnUse\" style=\"mask-type:alpha\"><path fill=\"#D9D9D9\" d=\"M0 0h16v16H0z\"/></mask><g fill=\"none\" mask=\"url(#a)\"><path fill=\"currentColor\" d=\"M8.067 14.667a6.5 6.5 0 0 1-2.625-.534 6.9 6.9 0 0 1-2.134-1.441 6.9 6.9 0 0 1-1.441-2.134 6.5 6.5 0 0 1-.534-2.625q0-2.433 1.55-4.291 1.55-1.86 3.95-2.309-.3 1.65.184 3.225a6.6 6.6 0 0 0 1.666 2.759 6.6 6.6 0 0 0 2.759 1.666 6.7 6.7 0 0 0 3.225.184q-.435 2.4-2.3 3.95-1.867 1.55-4.3 1.55m0-1.334q1.466 0 2.716-.733a5.3 5.3 0 0 0 1.967-2.017 8.3 8.3 0 0 1-2.717-.725 7.9 7.9 0 0 1-2.3-1.608 8 8 0 0 1-1.616-2.3A7.9 7.9 0 0 1 5.4 3.233a5.2 5.2 0 0 0-2.008 1.975 5.37 5.37 0 0 0-.725 2.725q0 2.25 1.575 3.825t3.825 1.575\"/></g>","width":16,"height":16},"sun":{"body":"<path fill=\"currentColor\" d=\"M7.273 2.91V0h1.454v2.91zm4.836 2-1-1 2.037-2.092 1.018 1.037zm.982 3.817V7.273H16v1.454zM7.273 16v-2.91h1.454V16zM3.89 4.873 1.818 2.855l1.037-1.019 2.054 2.055zm9.236 9.309L11.11 12.09l.982-.982 2.073 2zM0 8.727V7.273h2.91v1.454zm2.855 5.455-1.019-1.037 2.037-2.036.527.491.527.51zM8 12.364q-1.818 0-3.09-1.273Q3.635 9.818 3.635 8T4.91 4.91Q6.182 3.635 8 3.635t3.09 1.273Q12.365 6.182 12.365 8t-1.273 3.09Q9.818 12.365 8 12.365m0-1.455q1.2 0 2.055-.854.854-.855.854-2.055t-.854-2.055A2.8 2.8 0 0 0 8 5.091q-1.2 0-2.055.854A2.8 2.8 0 0 0 5.091 8q0 1.2.854 2.055.855.854 2.055.854\"/>","width":16,"height":16},"techs/astro":{"body":"<g fill=\"none\"><g clip-path=\"url(#a)\"><path fill=\"#fff\" d=\"M15.282 2.275c.182.226.275.531.46 1.142l4.061 13.338a16.9 16.9 0 0 0-4.854-1.644l-2.643-8.934a.344.344 0 0 0-.66.001l-2.612 8.929c-1.7.296-3.344.851-4.876 1.645l4.08-13.338c.187-.61.28-.915.462-1.14a1.5 1.5 0 0 1 .608-.45c.269-.108.588-.108 1.225-.108h2.915c.637 0 .957 0 1.226.108a1.5 1.5 0 0 1 .608.45\"/><path fill=\"#FF5D01\" d=\"M15.768 17.389c-.67.573-2.006.963-3.545.963-1.888 0-3.471-.588-3.891-1.38-.15.454-.184.973-.184 1.305 0 0-.099 1.626 1.033 2.758a1.063 1.063 0 0 1 1.063-1.064c1.007 0 1.007.878 1.006 1.592v.063a2.6 2.6 0 0 0 1.602 2.4 2.2 2.2 0 0 1-.22-.955c0-1.033.606-1.417 1.31-1.863.56-.355 1.183-.75 1.612-1.542a2.92 2.92 0 0 0 .214-2.277\"/><path fill=\"url(#b)\" d=\"M15.768 17.389c-.67.573-2.006.963-3.545.963-1.888 0-3.471-.588-3.891-1.38-.15.454-.184.973-.184 1.305 0 0-.099 1.626 1.033 2.758a1.063 1.063 0 0 1 1.063-1.064c1.007 0 1.007.878 1.006 1.592v.063a2.6 2.6 0 0 0 1.602 2.4 2.2 2.2 0 0 1-.22-.955c0-1.033.606-1.417 1.31-1.863.56-.355 1.183-.75 1.612-1.542a2.92 2.92 0 0 0 .214-2.277\"/></g><defs><linearGradient id=\"b\" x1=\"18.782\" x2=\"14.819\" y1=\"12.733\" y2=\"21.029\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#FF1639\"/><stop offset=\"1\" stop-color=\"#FF1639\" stop-opacity=\"0\"/></linearGradient><clipPath id=\"a\"><path fill=\"#fff\" d=\"M0 .5h24v24H0z\"/></clipPath></defs></g>","height":25},"techs/css":{"body":"<g fill=\"none\"><path fill=\"#1572B6\" d=\"M4.426 20.4 2.742 1.5h18.516L19.57 20.398 11.99 22.5z\"/><path fill=\"#33A9DC\" d=\"m12 20.894 6.128-1.7 1.441-16.148H12z\"/><path fill=\"#fff\" d=\"M12 9.893h3.068l.211-2.373H12V5.2h5.813l-.056.622-.57 6.388H12z\"/><path fill=\"#EBEBEB\" d=\"m12.014 15.914-.01.002-2.582-.697-.165-1.849H6.93l.325 3.64 4.748 1.318.011-.002z\"/><path fill=\"#fff\" d=\"m14.87 12.113-.279 3.105-2.585.697v2.412l4.752-1.317.035-.392.403-4.505z\"/><path fill=\"#EBEBEB\" d=\"M12.008 5.201V7.52h-5.6l-.046-.522-.105-1.175-.056-.622zM12 9.893v2.318H9.45l-.046-.52-.105-1.176-.055-.622z\"/></g>"},"techs/firebase":{"body":"<g fill=\"none\"><g clip-path=\"url(#a)\"><path fill=\"#FFA000\" d=\"M3.276 19.864 6.23.962A.546.546 0 0 1 7.25.788l3.056 5.698 1.217-2.318a.545.545 0 0 1 .966 0l8.244 15.696z\"/><path fill=\"#F57C00\" d=\"m13.482 12.5-3.178-6.016-7.028 13.38z\"/><path fill=\"#FFCA28\" d=\"m20.733 19.864-2.262-14a.546.546 0 0 0-.924-.295L3.277 19.864l7.896 4.429a1.64 1.64 0 0 0 1.596 0z\"/><path fill=\"#fff\" fill-opacity=\".2\" d=\"M18.47 5.863a.546.546 0 0 0-.923-.295l-2.832 2.84-2.227-4.24a.546.546 0 0 0-.966 0l-1.218 2.318L7.25.788a.546.546 0 0 0-1.02.175L3.276 19.864h-.01l.01.011.078.038 14.19-14.205a.545.545 0 0 1 .924.294l2.244 13.876.021-.014zM3.303 19.838 6.23 1.097A.546.546 0 0 1 7.25.922l3.055 5.698 1.218-2.318a.546.546 0 0 1 .966 0l2.182 4.15z\"/><path fill=\"#A52714\" d=\"M12.768 24.159a1.64 1.64 0 0 1-1.595 0l-7.878-4.416-.02.121 7.897 4.427a1.64 1.64 0 0 0 1.596 0l7.965-4.427-.02-.125z\" opacity=\".2\"/></g><defs><clipPath id=\"a\"><path fill=\"#fff\" d=\"M0 .5h24v24H0z\"/></clipPath></defs></g>","height":25},"techs/html":{"body":"<g fill=\"none\"><path fill=\"#E44F26\" d=\"M2.951 13.6 1.828 1h12.345l-1.126 12.599L7.993 15z\"/><path fill=\"#F1662A\" d=\"m8 13.929 4.085-1.133.961-10.765H8z\"/><path fill=\"#EBEBEB\" d=\"M8 6.703H5.955l-.141-1.582H8V3.575H4.125l.037.415.38 4.259H8zm0 4.014-.007.002-1.721-.465-.11-1.232H4.611l.216 2.426 3.166.879.007-.002z\"/><path fill=\"#fff\" d=\"M7.995 6.703V8.25h1.903l-.18 2.004-1.723.465v1.608l3.168-.878.023-.261.363-4.069.038-.415zm0-3.128v1.546h3.732l.031-.347.071-.784.037-.415z\"/></g>","width":16,"height":16},"techs/javascript":{"body":"<g fill=\"none\"><g clip-path=\"url(#a)\"><path fill=\"#F7DF1E\" d=\"M0 0h16v16H0z\"/><path fill=\"#000\" d=\"m4.207 13.37 1.224-.74c.237.418.452.773.967.773.494 0 .806-.193.806-.945V7.346h1.503v5.133c0 1.558-.913 2.266-2.245 2.266-1.202 0-1.9-.623-2.255-1.374m5.317-.161 1.224-.71c.322.527.741.914 1.482.914.623 0 1.02-.312 1.02-.741 0-.516-.408-.698-1.095-1l-.376-.16c-1.085-.462-1.804-1.042-1.804-2.266 0-1.128.86-1.987 2.202-1.987.956 0 1.643.333 2.137 1.202l-1.17.752c-.259-.461-.538-.644-.967-.644-.44 0-.72.28-.72.644 0 .451.28.634.924.913l.376.161c1.278.548 1.997 1.107 1.997 2.363 0 1.354-1.063 2.095-2.492 2.095-1.396 0-2.298-.666-2.738-1.536\"/></g><defs><clipPath id=\"a\"><path fill=\"#fff\" d=\"M0 0h16v16H0z\"/></clipPath></defs></g>","width":16,"height":16},"techs/open-props":{"body":"<g fill=\"none\"><g fill-rule=\"evenodd\" clip-path=\"url(#a)\" clip-rule=\"evenodd\"><path fill=\"#3B5BDB\" d=\"M8.506 17.699A6.683 6.683 0 1 0 5.316 12v9.418h3.19zM15.494 12a3.494 3.494 0 1 1-6.988 0 3.494 3.494 0 0 1 6.988 0\"/><path fill=\"#5C7CFA\" d=\"M12 20.962a8.962 8.962 0 1 0 0-17.924 8.962 8.962 0 0 0 0 17.924M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12\"/></g><defs><clipPath id=\"a\"><path fill=\"#fff\" d=\"M0 0h24v24H0z\"/></clipPath></defs></g>"},"techs/php":{"body":"<path fill=\"currentColor\" d=\"M1.433 11.187H2.48a.094.094 0 0 0 .093-.08l.234-1.214h.813c.34.009.68-.036 1.007-.133.264-.088.506-.234.706-.427a2.2 2.2 0 0 0 .447-.566q.172-.316.24-.667a1.62 1.62 0 0 0-.273-1.44 1.76 1.76 0 0 0-1.394-.52h-2a.11.11 0 0 0-.1.087l-.92 4.84a.13.13 0 0 0 0 .086.12.12 0 0 0 .1.034m1.9-4.107H4a.97.97 0 0 1 .72.193c.113.12.133.347.073.667a1.2 1.2 0 0 1-.38.747 1.45 1.45 0 0 1-.886.22h-.534zm6.534-.633a1.8 1.8 0 0 0-1.254-.34H7.82l.22-1.174a.1.1 0 0 0 0-.086.1.1 0 0 0-.073 0H6.92a.093.093 0 0 0-.093.08l-.92 4.846a.09.09 0 0 0 0 .08.09.09 0 0 0 .073.04h1.027a.093.093 0 0 0 .093-.086l.513-2.714h.74c.3 0 .407.067.44.107a.53.53 0 0 1 0 .413l-.406 2.16a.09.09 0 0 0 0 .08.1.1 0 0 0 .073.04H9.5a.11.11 0 0 0 .1-.086l.427-2.267a1.13 1.13 0 0 0-.16-1.093m3.013-.34h-2.087a.093.093 0 0 0-.1.086l-.973 4.874a.1.1 0 0 0 0 .086.1.1 0 0 0 .073.034h1.087a.093.093 0 0 0 .1-.08l.247-1.214h.846c.352.008.702-.037 1.04-.133a2 2 0 0 0 .787-.427c.186-.161.344-.353.467-.566q.174-.316.246-.667a1.59 1.59 0 0 0-.28-1.44 1.87 1.87 0 0 0-1.453-.553m.413 1.846a1.22 1.22 0 0 1-.4.747 1.52 1.52 0 0 1-.913.22h-.533l.36-1.84h.666c.267-.033.536.036.754.193.106.12.106.347.066.68\"/>","width":16,"height":16},"techs/pwa":{"body":"<g fill=\"none\"><path fill=\"#3D3D3D\" d=\"m17.663 15.394.694-1.753h2.002l-.95-2.66 1.188-3.004L24 17.013h-2.51l-.581-1.619z\"/><path fill=\"#5A0FC8\" d=\"m15.522 17.013 3.644-9.036H16.75l-2.492 5.839-1.772-5.84h-1.857l-1.903 5.84-1.342-2.661-1.214 3.741 1.233 2.117H9.78l1.72-5.237 1.639 5.237z\"/><path fill=\"#3D3D3D\" d=\"M2.293 13.91H3.78q.676 0 1.204-.15l.385-1.185 1.075-3.313a3 3 0 0 0-.28-.369q-.828-.915-2.424-.916H0v9.036h2.293zm1.969-3.855q.324.326.323.872 0 .55-.284.872-.312.358-1.148.358h-.86V9.73h.866q.78 0 1.103.325\"/></g>","height":25},"techs/react":{"body":"<g fill=\"#61DAFB\"><path d=\"M12 14.138a2.137 2.137 0 1 0 0-4.275 2.137 2.137 0 0 0 0 4.275\"/><path d=\"M20.119 8.475c-.413-.15-.844-.3-1.294-.431.113-.45.206-.9.281-1.331.394-2.475-.037-4.22-1.237-4.894-.357-.206-.75-.3-1.2-.3-1.313 0-2.982.975-4.669 2.606-1.687-1.631-3.356-2.606-4.669-2.606-.45 0-.844.094-1.2.3-1.2.694-1.631 2.437-1.237 4.894.075.43.168.88.28 1.33-.45.132-.88.263-1.293.432C1.537 9.375.262 10.613.262 12s1.294 2.625 3.62 3.525c.412.15.843.3 1.293.431-.113.45-.206.9-.281 1.332-.394 2.475.037 4.218 1.237 4.893.356.207.75.3 1.2.3 1.331 0 3-.975 4.669-2.606 1.687 1.631 3.356 2.606 4.669 2.606.45 0 .843-.093 1.2-.3 1.2-.693 1.631-2.437 1.237-4.893a19 19 0 0 0-.281-1.332c.45-.13.881-.262 1.294-.43 2.343-.9 3.618-2.138 3.618-3.526s-1.274-2.625-3.618-3.525m-2.775-5.719c.768.45 1.031 1.838.712 3.807-.056.393-.15.806-.262 1.237a22 22 0 0 0-3.094-.469 27 27 0 0 0-1.95-2.437c1.387-1.369 2.794-2.306 3.938-2.306.243 0 .468.056.656.168m-2.1 11.12a24 24 0 0 1-1.144 1.799c-.694.056-1.387.075-2.1.075a25 25 0 0 1-2.1-.075q-.62-.9-1.125-1.8A30 30 0 0 1 7.781 12c.3-.619.638-1.256.994-1.875.337-.6.731-1.2 1.144-1.8a26 26 0 0 1 2.1-.075c.73 0 1.425.019 2.1.075q.618.9 1.125 1.8c.356.619.693 1.256.993 1.875a62 62 0 0 1-.993 1.875m1.556-.62c.281.656.506 1.294.712 1.932-.637.15-1.312.262-2.025.356.225-.356.47-.731.675-1.125.225-.394.432-.788.638-1.163M12 18.338a21 21 0 0 1-1.294-1.557c.431.02.863.038 1.294.038s.863-.019 1.294-.038A21 21 0 0 1 12 18.338m-3.488-2.813a21 21 0 0 1-2.025-.356 25 25 0 0 1 .713-1.931c.206.375.412.768.637 1.143.225.413.45.77.675 1.144M7.2 10.744a22 22 0 0 1-.713-1.931c.638-.15 1.313-.263 2.025-.357-.225.357-.468.732-.675 1.125-.225.394-.43.788-.637 1.163M12 5.663c.45.487.881 1.012 1.294 1.556A30 30 0 0 0 12 7.18c-.431 0-.863.02-1.294.038.413-.544.844-1.069 1.294-1.556M16.162 9.6l-.675-1.125a21 21 0 0 1 2.025.356 25 25 0 0 1-.712 1.932 23 23 0 0 0-.638-1.163M5.944 6.563c-.319-1.97-.057-3.357.712-3.807.188-.112.413-.168.656-.168 1.125 0 2.532.918 3.938 2.306A25 25 0 0 0 9.3 7.33a26 26 0 0 0-3.094.469c-.112-.431-.187-.844-.262-1.237M1.312 12c0-.881 1.07-1.819 2.944-2.512.375-.15.788-.282 1.2-.394.3.937.675 1.931 1.125 2.925-.45.993-.844 1.969-1.125 2.906C2.87 14.175 1.312 13.05 1.312 12m5.344 9.244c-.769-.45-1.031-1.838-.712-3.806.056-.394.15-.807.262-1.238.975.225 2.006.375 3.094.469.637.9 1.294 1.706 1.95 2.437-1.388 1.37-2.794 2.307-3.938 2.307-.243 0-.468-.057-.656-.17m11.4-3.806c.319 1.968.056 3.356-.712 3.806a1.27 1.27 0 0 1-.657.169c-1.125 0-2.53-.92-3.937-2.307a25 25 0 0 0 1.95-2.437 26 26 0 0 0 3.094-.469c.112.431.187.844.262 1.238m1.688-2.925c-.375.15-.788.28-1.2.393a27 27 0 0 0-1.125-2.925c.45-.993.843-1.968 1.125-2.906 2.587.75 4.143 1.875 4.143 2.925 0 .881-1.087 1.819-2.943 2.513\"/></g>"},"techs/sass":{"body":"<g fill=\"none\"><g clip-path=\"url(#a)\"><path fill=\"#CD6799\" d=\"M20.651 10.36a4.95 4.95 0 0 0-2.168.503c-.223-.441-.446-.835-.485-1.123-.044-.337-.096-.542-.044-.944.052-.403.289-.975.284-1.019-.004-.044-.052-.25-.533-.253-.481-.005-.896.091-.944.218-.049.127-.14.415-.201.713-.084.437-.962 1.997-1.465 2.815-.162-.32-.302-.599-.332-.822-.044-.337-.096-.542-.044-.944s.289-.975.284-1.019c-.004-.043-.052-.249-.533-.253s-.896.092-.944.218c-.049.127-.101.424-.201.713-.101.288-1.268 2.894-1.574 3.567q-.186.408-.39.809.001.001-.017.035-.063.125-.13.249v.004c-.066.118-.136.228-.171.228-.027 0-.075-.315.008-.743.175-.905.59-2.313.586-2.361 0-.026.079-.271-.27-.398-.342-.127-.464.083-.495.083s-.053.074-.053.074.381-1.582-.725-1.582c-.69 0-1.644.756-2.116 1.438q-.805.438-1.609.879c-.257.144-.524.288-.773.424-.018-.018-.035-.04-.053-.057-1.338-1.43-3.812-2.44-3.707-4.358.04-.7.28-2.536 4.752-4.765 3.68-1.815 6.61-1.312 7.117-.197.726 1.591-1.57 4.546-5.373 4.975-1.451.161-2.212-.398-2.404-.608-.201-.219-.232-.232-.306-.188-.123.066-.044.262 0 .376.113.297.581.822 1.372 1.08.7.227 2.4.354 4.46-.442 2.303-.892 4.104-3.37 3.576-5.447C14.5.131 11.003-.564 7.694.612c-1.967.7-4.1 1.801-5.635 3.235C.236 5.552-.053 7.034.065 7.655c.425 2.203 3.463 3.637 4.678 4.7l-.166.091c-.608.302-2.925 1.513-3.502 2.793-.655 1.452.105 2.492.608 2.632 1.56.433 3.165-.345 4.026-1.63.861-1.286.757-2.956.359-3.72q-.006-.014-.018-.027l.477-.28q.434-.255.878-.494c-.148.407-.258.892-.31 1.592-.066.821.271 1.888.713 2.308.196.183.428.188.577.188.515 0 .747-.429 1.005-.936.315-.62.599-1.342.599-1.342s-.354 1.95.608 1.95c.35 0 .704-.455.86-.687v.005l.027-.044.057-.092v-.008c.14-.245.455-.8.922-1.723.604-1.189 1.185-2.675 1.185-2.675s.053.363.232.966c.105.354.323.743.498 1.119-.14.197-.227.306-.227.306l.004.004c-.114.149-.236.31-.371.468-.477.568-1.045 1.22-1.124 1.408-.092.223-.07.385.105.516.127.096.354.109.586.096.428-.03.73-.136.878-.201.232-.083.503-.21.757-.398.467-.345.752-.84.725-1.49-.013-.36-.13-.718-.275-1.054.044-.062.083-.123.127-.184.739-1.08 1.311-2.264 1.311-2.264s.053.362.232.966c.087.306.267.638.424.961-.695.564-1.123 1.22-1.277 1.649-.275.795-.06 1.154.346 1.237.183.039.446-.048.638-.132.245-.078.534-.214.809-.415.468-.345.918-.826.892-1.477a2.8 2.8 0 0 0-.201-.875c.59-.244 1.35-.38 2.32-.266 2.082.244 2.493 1.543 2.414 2.09s-.516.843-.66.935-.192.122-.18.188c.018.096.088.092.21.074.171-.03 1.093-.442 1.133-1.447.065-1.285-1.159-2.688-3.323-2.675M4.6 15.774c-.69.752-1.653 1.036-2.068.795-.446-.258-.27-1.368.577-2.164.516-.485 1.18-.935 1.622-1.21.1-.062.25-.15.428-.258l.049-.027.104-.065c.31 1.136.014 2.138-.712 2.929m5.027-3.419c-.24.586-.743 2.085-1.049 2.002-.262-.07-.424-1.206-.052-2.33.188-.564.585-1.237.817-1.5.376-.419.791-.559.892-.388.127.223-.46 1.849-.608 2.216m4.149 1.985c-.1.052-.197.087-.24.061-.031-.018.043-.087.043-.087s.52-.56.726-.814c.118-.148.258-.323.406-.52v.057c0 .669-.647 1.12-.935 1.303m3.2-.73c-.075-.053-.062-.228.188-.774a2.9 2.9 0 0 1 .712-.918c.044.14.075.275.07.402-.004.844-.607 1.159-.97 1.29\"/></g><defs><clipPath id=\"a\"><path fill=\"#fff\" d=\"M0 0h24v18H0z\"/></clipPath></defs></g>","height":18},"techs/tailwindcss":{"body":"<g fill=\"none\"><g clip-path=\"url(#a)\"><path fill=\"#38BDF8\" d=\"M12 5.3q-4.8 0-6 4.8 1.8-2.4 4.2-1.8c.914.228 1.566.89 2.29 1.624C13.664 11.118 15.026 12.5 18 12.5q4.8 0 6-4.8-1.8 2.4-4.2 1.8c-.912-.228-1.564-.89-2.288-1.624C16.337 6.682 14.975 5.3 12.001 5.3m-6 7.2q-4.8 0-6 4.8 1.8-2.4 4.2-1.8c.914.228 1.566.89 2.29 1.624C7.665 18.318 9.026 19.7 12 19.7q4.8 0 6-4.8-1.8 2.4-4.2 1.8c-.912-.228-1.564-.89-2.288-1.624-1.176-1.194-2.537-2.576-5.511-2.576\"/></g><defs><clipPath id=\"a\"><path fill=\"#fff\" d=\"M0 .5h24v24H0z\"/></clipPath></defs></g>","height":25},"techs/typescript":{"body":"<g fill=\"none\"><g clip-path=\"url(#a)\"><path fill=\"#fff\" d=\"M4.25 8.813h18.69v13.813H4.25z\"/><path fill=\"#007ACC\" d=\"M.281 11.983v11.719H23.72V.264H.28zm18.887-.937c.562.13 1.072.424 1.466.843q.328.342.563.75c0 .03-1.013.715-1.63 1.097-.022.015-.112-.082-.211-.23a1.33 1.33 0 0 0-1.101-.662c-.71-.049-1.168.324-1.164.937a.86.86 0 0 0 .1.439c.157.324.447.518 1.358.911 1.678.722 2.397 1.198 2.843 1.875.499.75.61 1.962.272 2.858-.375.975-1.294 1.637-2.593 1.856a7.2 7.2 0 0 1-1.785-.019 4.3 4.3 0 0 1-2.385-1.243c-.216-.238-.636-.859-.61-.904a2 2 0 0 1 .216-.136l.868-.48.673-.39.14.208c.238.34.54.628.89.85.75.395 1.773.34 2.28-.115a1.02 1.02 0 0 0 .129-1.298c-.188-.26-.563-.48-1.61-.937-1.21-.522-1.731-.844-2.208-1.358a3.1 3.1 0 0 1-.643-1.172 4.7 4.7 0 0 1-.041-1.5c.25-1.168 1.125-1.984 2.404-2.225a6 6 0 0 1 1.78.048zm-5.501.982v.96h-3.043v8.668H8.466v-8.67H5.415v-.937a9 9 0 0 1 .022-.97c.015-.017 1.875-.017 4.126-.017h4.093z\"/></g><defs><clipPath id=\"a\"><path fill=\"#fff\" d=\"M0 0h24v24H0z\"/></clipPath></defs></g>"},"techs/wordpress":{"body":"<path fill=\"currentColor\" d=\"M8 1.333C4.327 1.333 1.333 4.327 1.333 8S4.327 14.667 8 14.667 14.667 11.673 14.667 8 11.673 1.333 8 1.333M2.007 8c0-.867.186-1.693.52-2.44l2.86 7.833c-2-.973-3.38-3.02-3.38-5.393M8 13.993a6 6 0 0 1-1.693-.246l1.8-5.227 1.84 5.047c.013.026.026.06.04.08A5.8 5.8 0 0 1 8 13.993m.827-8.806c.36-.02.686-.06.686-.06.32-.04.287-.514-.04-.494 0 0-.973.074-1.6.074a28 28 0 0 1-1.58-.074c-.32-.013-.36.48-.033.5 0 0 .307.04.627.06l.933 2.56-1.313 3.934-2.18-6.5c.36-.014.686-.054.686-.054.32-.04.287-.513-.04-.493 0 0-.973.073-1.6.073-.113 0-.246 0-.386-.006A6.01 6.01 0 0 1 8 2.007c1.56 0 2.98.593 4.047 1.573-.027 0-.054-.007-.08-.007-.587 0-1.007.514-1.007 1.067 0 .493.287.913.587 1.407.226.4.493.913.493 1.653 0 .513-.2 1.107-.453 1.94l-.6 2zm4.433-.06a5.993 5.993 0 0 1-2.247 8.053l1.834-5.293c.34-.854.453-1.54.453-2.147 0-.22-.013-.427-.04-.613\"/>","width":16,"height":16}},"width":24,"height":24}};

const defaultIconDimensions = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
);
const defaultIconTransformations = Object.freeze({
  rotate: 0,
  vFlip: false,
  hFlip: false
});
const defaultIconProps = Object.freeze({
  ...defaultIconDimensions,
  ...defaultIconTransformations
});
const defaultExtendedIconProps = Object.freeze({
  ...defaultIconProps,
  body: "",
  hidden: false
});

const defaultIconSizeCustomisations = Object.freeze({
  width: null,
  height: null
});
const defaultIconCustomisations = Object.freeze({
  // Dimensions
  ...defaultIconSizeCustomisations,
  // Transformations
  ...defaultIconTransformations
});

function mergeIconTransformations(obj1, obj2) {
  const result = {};
  if (!obj1.hFlip !== !obj2.hFlip) {
    result.hFlip = true;
  }
  if (!obj1.vFlip !== !obj2.vFlip) {
    result.vFlip = true;
  }
  const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
  if (rotate) {
    result.rotate = rotate;
  }
  return result;
}

function mergeIconData(parent, child) {
  const result = mergeIconTransformations(parent, child);
  for (const key in defaultExtendedIconProps) {
    if (key in defaultIconTransformations) {
      if (key in parent && !(key in result)) {
        result[key] = defaultIconTransformations[key];
      }
    } else if (key in child) {
      result[key] = child[key];
    } else if (key in parent) {
      result[key] = parent[key];
    }
  }
  return result;
}

function getIconsTree(data, names) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  const resolved = /* @__PURE__ */ Object.create(null);
  function resolve(name) {
    if (icons[name]) {
      return resolved[name] = [];
    }
    if (!(name in resolved)) {
      resolved[name] = null;
      const parent = aliases[name] && aliases[name].parent;
      const value = parent && resolve(parent);
      if (value) {
        resolved[name] = [parent].concat(value);
      }
    }
    return resolved[name];
  }
  (names || Object.keys(icons).concat(Object.keys(aliases))).forEach(resolve);
  return resolved;
}

function internalGetIconData(data, name, tree) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  let currentProps = {};
  function parse(name2) {
    currentProps = mergeIconData(
      icons[name2] || aliases[name2],
      currentProps
    );
  }
  parse(name);
  tree.forEach(parse);
  return mergeIconData(data, currentProps);
}
function getIconData(data, name) {
  if (data.icons[name]) {
    return internalGetIconData(data, name, []);
  }
  const tree = getIconsTree(data, [name])[name];
  return tree ? internalGetIconData(data, name, tree) : null;
}

const unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
const unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size, ratio, precision) {
  if (ratio === 1) {
    return size;
  }
  precision = precision || 100;
  if (typeof size === "number") {
    return Math.ceil(size * ratio * precision) / precision;
  }
  if (typeof size !== "string") {
    return size;
  }
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber = !isNumber;
  }
}

function splitSVGDefs(content, tag = "defs") {
  let defs = "";
  const index = content.indexOf("<" + tag);
  while (index >= 0) {
    const start = content.indexOf(">", index);
    const end = content.indexOf("</" + tag);
    if (start === -1 || end === -1) {
      break;
    }
    const endEnd = content.indexOf(">", end);
    if (endEnd === -1) {
      break;
    }
    defs += content.slice(start + 1, end).trim();
    content = content.slice(0, index).trim() + content.slice(endEnd + 1);
  }
  return {
    defs,
    content
  };
}
function mergeDefsAndContent(defs, content) {
  return defs ? "<defs>" + defs + "</defs>" + content : content;
}
function wrapSVGContent(body, start, end) {
  const split = splitSVGDefs(body);
  return mergeDefsAndContent(split.defs, start + split.content + end);
}

const isUnsetKeyword = (value) => value === "unset" || value === "undefined" || value === "none";
function iconToSVG(icon, customisations) {
  const fullIcon = {
    ...defaultIconProps,
    ...icon
  };
  const fullCustomisations = {
    ...defaultIconCustomisations,
    ...customisations
  };
  const box = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height
  };
  let body = fullIcon.body;
  [fullIcon, fullCustomisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push(
          "translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")"
        );
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push(
        "translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")"
      );
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift(
          "rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
      case 2:
        transformations.unshift(
          "rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")"
        );
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift(
          "rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== box.top) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) {
      body = wrapSVGContent(
        body,
        '<g transform="' + transformations.join(" ") + '">',
        "</g>"
      );
    }
  });
  const customisationsWidth = fullCustomisations.width;
  const customisationsHeight = fullCustomisations.height;
  const boxWidth = box.width;
  const boxHeight = box.height;
  let width;
  let height;
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    width = calculateSize(height, boxWidth / boxHeight);
  } else {
    width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
    height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
  }
  const attributes = {};
  const setAttr = (prop, value) => {
    if (!isUnsetKeyword(value)) {
      attributes[prop] = value.toString();
    }
  };
  setAttr("width", width);
  setAttr("height", height);
  const viewBox = [box.left, box.top, boxWidth, boxHeight];
  attributes.viewBox = viewBox.join(" ");
  return {
    attributes,
    viewBox,
    body
  };
}

const cache = /* @__PURE__ */ new WeakMap();

const $$Astro$6 = createAstro("https://www.augustinseminel.com");
const $$Icon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Icon;
  class AstroIconError extends Error {
    constructor(message) {
      super(message);
      this.hint = "";
    }
  }
  const req = Astro2.request;
  const { name = "", title, desc, "is:inline": inline = false, ...props } = Astro2.props;
  const map = cache.get(req) ?? /* @__PURE__ */ new Map();
  const i = map.get(name) ?? 0;
  map.set(name, i + 1);
  cache.set(req, map);
  const includeSymbol = !inline && i === 0;
  let [setName, iconName] = name.split(":");
  if (!setName && iconName) {
    const err = new AstroIconError(`Invalid "name" provided!`);
    throw err;
  }
  if (!iconName) {
    iconName = setName;
    setName = "local";
    if (!icons[setName]) {
      const err = new AstroIconError('Unable to load the "local" icon set!');
      throw err;
    }
    if (!(iconName in icons[setName].icons)) {
      const err = new AstroIconError(`Unable to locate "${name}" icon!`);
      throw err;
    }
  }
  const collection = icons[setName];
  if (!collection) {
    const err = new AstroIconError(`Unable to locate the "${setName}" icon set!`);
    throw err;
  }
  const iconData = getIconData(collection, iconName ?? setName);
  if (!iconData) {
    const err = new AstroIconError(`Unable to locate "${name}" icon!`);
    throw err;
  }
  const id = `ai:${collection.prefix}:${iconName ?? setName}`;
  if (props.size) {
    props.width = props.size;
    props.height = props.size;
    delete props.size;
  }
  const renderData = iconToSVG(iconData);
  const normalizedProps = { ...renderData.attributes, ...props };
  const normalizedBody = renderData.body;
  const { viewBox } = normalizedProps;
  if (includeSymbol) {
    delete normalizedProps.viewBox;
  }
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(normalizedProps)}${addAttribute(name, "data-icon")}>
  ${title && renderTemplate`<title>${title}</title>`}
  ${desc && renderTemplate`<desc>${desc}</desc>`}
  ${inline ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "id": id }, { "default": ($$result2) => renderTemplate`${unescapeHTML(normalizedBody)}` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${includeSymbol && renderTemplate`<symbol${addAttribute(id, "id")}${addAttribute(viewBox, "viewBox")}>${unescapeHTML(normalizedBody)}</symbol>`}<use${addAttribute(`#${id}`, "href")}></use>
      ` })}`}
</svg>`;
}, "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/node_modules/.pnpm/astro-icon@1.1.5/node_modules/astro-icon/components/Icon.astro", void 0);

const $$ToggleSwitch = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<label aria-label="Toggle" data-astro-cid-yyktn5se>
  <input class="toggle" type="checkbox" data-astro-cid-yyktn5se>
  <span class="toggle-thumb" data-astro-cid-yyktn5se>
    ${renderComponent($$result, "Icon", $$Icon, { "name": "moon", "size": 16, "data-astro-cid-yyktn5se": true })}
    ${renderComponent($$result, "Icon", $$Icon, { "name": "sun", "size": 16, "data-astro-cid-yyktn5se": true })}
  </span>
</label>`;
}, "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/src/components/ToggleSwitch.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro$5 = createAstro("https://www.augustinseminel.com");
const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Navbar;
  const links = t("navbar", { returnObjects: true });
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<nav id="menu" data-astro-cid-5blmo7yk>\n  <ul data-astro-cid-5blmo7yk>\n    ', '\n    <li data-astro-cid-5blmo7yk>\n      <a class="language"', " data-astro-cid-5blmo7yk>\n        <span data-astro-cid-5blmo7yk>\n          ", "\n        </span>\n        <span data-astro-cid-5blmo7yk>\n          ", "\n        </span>\n      </a>\n    </li>\n    <li data-astro-cid-5blmo7yk>\n      ", '\n    </li>\n  </ul>\n  <button id="menu-button" data-astro-cid-5blmo7yk>\n    ', "\n  </button>\n</nav>\n\n<dialog data-astro-cid-5blmo7yk>\n  <nav data-astro-cid-5blmo7yk>\n    ", '\n    <a class="language"', " data-astro-cid-5blmo7yk>\n      <span data-astro-cid-5blmo7yk>\n        ", "\n      </span>\n      <span data-astro-cid-5blmo7yk>\n        ", "\n      </span>\n    </a>\n    <div data-astro-cid-5blmo7yk>\n      ", '\n    </div>\n  </nav>\n  <button id="close" aria-label="Fermer" data-astro-cid-5blmo7yk>\n    ', "\n  </button>\n</dialog>\n\n<!-- Este script se ejecuta cuando se carga la p\xE1gina y pueda aplicar el estilo correspondiente a .toggle-thumb -->\n<script>\n  if (localStorage.getItem('dark-theme') === 'true') {\n    document.querySelector('.toggle-thumb').classList.add('active')\n  } else {\n    document.querySelector('.toggle-thumb').classList.remove('active')\n  }\n<\/script>\n\n\n\n", "\n\n", "\n\n", ""])), maybeRenderHead(), links.map(({ label, href }, index) => renderTemplate`<li data-astro-cid-5blmo7yk>
          <a${addAttribute({ active: index === 0 }, "class:list")}${addAttribute(href, "href")} data-astro-cid-5blmo7yk>
            ${label}
          </a>
        </li>`), addAttribute(Astro2.url.pathname.includes("/en") ? switchLocalePath("fr") : switchLocalePath("en"), "href"), renderComponent($$result, "Icon", $$Icon, { "name": "language", "size": 18, "data-astro-cid-5blmo7yk": true }), Astro2.url.pathname.includes("/en") ? "Fran\xE7ais" : "English", renderComponent($$result, "ToggleSwitch", $$ToggleSwitch, { "data-astro-cid-5blmo7yk": true }), renderComponent($$result, "Icon", $$Icon, { "name": "menu", "size": 36, "data-astro-cid-5blmo7yk": true }), links.map(({ label, href }) => renderTemplate`<a${addAttribute(href, "href")} data-astro-cid-5blmo7yk>${label}</a>`), addAttribute(Astro2.url.pathname.includes("/en") ? switchLocalePath("fr") : switchLocalePath("en"), "href"), renderComponent($$result, "Icon", $$Icon, { "name": "language", "size": 18, "data-astro-cid-5blmo7yk": true }), Astro2.url.pathname.includes("/en") ? "Fran\xE7ais" : "English", renderComponent($$result, "ToggleSwitch", $$ToggleSwitch, { "data-astro-cid-5blmo7yk": true }), renderComponent($$result, "Icon", $$Icon, { "name": "close", "size": 28, "data-astro-cid-5blmo7yk": true }), renderScript($$result, "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/src/components/Navbar.astro?astro&type=script&index=0&lang.ts"), renderScript($$result, "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/src/components/Navbar.astro?astro&type=script&index=1&lang.ts"), renderScript($$result, "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/src/components/Navbar.astro?astro&type=script&index=2&lang.ts"));
}, "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/src/components/Navbar.astro", void 0);

const $$Social = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<aside class="socials" data-astro-cid-yxtifmrq>
  <nav data-astro-cid-yxtifmrq>
    <a href="https://github.com/gusgusgusgusgus" aria-label="GitHub" target="_blank" rel="noopener noreferrer" data-astro-cid-yxtifmrq>
      ${renderComponent($$result, "Icon", $$Icon, { "name": "github", "size": 28, "data-astro-cid-yxtifmrq": true })}
    </a>
    <a href="https://www.linkedin.com/in/augustinseminel/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" data-astro-cid-yxtifmrq>
      ${renderComponent($$result, "Icon", $$Icon, { "name": "linkedin", "size": 28, "data-astro-cid-yxtifmrq": true })}
    </a>
    <a href="#" aria-label="Mail" data-astro-cid-yxtifmrq>
      ${renderComponent($$result, "Icon", $$Icon, { "name": "mail", "size": 28, "data-astro-cid-yxtifmrq": true })}
    </a>
  </nav>
</aside>`;
}, "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/src/components/Social.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$4 = createAstro("https://www.augustinseminel.com");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Layout;
  const { options } = Astro2.props;
  const { title, description, metaRobots } = options;
  return renderTemplate(_a || (_a = __template(['<html class="dark"', '>\n  <head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n\n    <title>', "</title>\n\n    ", "\n\n    ", "\n\n    ", "\n\n    <style>\n      :root {\n        --scrollbar: #e5e5e5;\n        --scrollbar-thumb: #c0c0c0;\n        --scrollbar-thumb-hover: #909090;\n        --scrollbar-dark: #898989;\n        --scrollbar-thumb-dark: #5d5d5d;\n        --scrollbar-thumb-hover-dark: #3f3f3f;\n      }\n\n      @view-transition {\n        navigation: auto;\n      }\n\n      body::-webkit-scrollbar {\n        width: 7px;\n        height: 7px;\n        background: var(--scrollbar);\n        transition: background 150ms cubic-bezier(0.4, 0, 0.2, 1);\n        will-change: background;\n      }\n\n      body::-webkit-scrollbar-thumb {\n        background: var(--scrollbar-thumb);\n        border-radius: 0.25rem;\n      }\n\n      @media (any-hover: hover) {\n        body::-webkit-scrollbar-thumb:hover {\n          background: var(--scrollbar-thumb-hover);\n        }\n      }\n\n      html.dark body::-webkit-scrollbar {\n        background: var(--scrollbar-dark);\n        transition: background 150ms cubic-bezier(0.4, 0, 0.2, 1);\n        will-change: background;\n      }\n\n      html.dark body::-webkit-scrollbar-thumb {\n        background: var(--scrollbar-thumb-dark);\n      }\n\n      @media (any-hover: hover) {\n        html.dark body::-webkit-scrollbar-thumb:hover {\n          background: var(--scrollbar-thumb-hover-dark);\n        }\n      }\n\n      @supports not selector(::-webkit-scrollbar) {\n        html,\n        body {\n          scrollbar-color: var(--scrollbar) var(--scrollbar-thumb);\n          scrollbar-width: thin;\n          scrollbar-gutter: stable;\n        }\n\n        html.dark,\n        html.dark body {\n          scrollbar-color: var(--scrollbar-dark) var(--scrollbar-thumb-dark);\n        }\n      }\n    </style>\n\n    ", '\n\n    <link rel="preload" as="font" crossorigin="anonymous"', ` type="font/woff2">

    <script>
      if (localStorage.getItem('dark-theme') === 'true') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    <\/script>

    `, "\n\n    ", '\n\n    <meta name="robots"', ">\n    ", "\n    ", "\n    ", '\n    <meta name="author" content="Augustin Seminel - https://www.augustinseminel.com">\n    <meta name="generator"', ">\n\n    ", "\n\n    ", "\n\n    ", "\n\n    ", "\n  ", "</head>\n  <body>\n    ", "\n\n    ", "\n\n    ", "\n\n    ", "\n    ", "\n  </body></html>"])), spreadAttributes(getHtmlAttrs()), title, renderSlot($$result, $$slots["preconnect"]), renderSlot($$result, $$slots["async-script"]), renderSlot($$result, $$slots["critical-css"]), renderSlot($$result, $$slots["stylesheet"]), addAttribute(inter, "href"), renderSlot($$result, $$slots["preload"]), renderSlot($$result, $$slots["defer-script"]), addAttribute(metaRobots || "index, follow", "content"), description && renderTemplate`<meta name="description"${addAttribute(description, "content")}>`, description && renderTemplate`<link${addAttribute(Astro2.url.href, "href")} rel="canonical">`, renderComponent($$result, "I18NHead", $$I18NHead, {}), addAttribute(Astro2.generator, "content"), description && renderTemplate`${renderComponent($$result, "Schema", $$Schema, { "item": {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Augustin Seminel",
    url: "https://www.augustinseminel.com",
    image: "https://augustinseminel.com/img/augustinseminel.jpg",
    sameAs: [
      "https://augustinseminel.com",
      "https://www.linkedin.com/in/augustinseminel/",
      "https://github.com/gusgusgusgusgus"
    ],
    jobTitle: "D\xE9veloppeur Web Fullstack"
  } })}`, renderSlot($$result, $$slots["schema"]), renderComponent($$result, "Favicons", $$Favicons, {}), renderSlot($$result, $$slots["social-media"]), renderHead(), renderComponent($$result, "Navbar", $$Navbar, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}), renderComponent($$result, "Social", $$Social, {}), renderSlot($$result, $$slots["dynamic-components"]));
}, "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/src/layouts/Layout.astro", void 0);

const augustinseminel = new Proxy({"src":"/_astro/augustinseminel.CdWsog8Y.jpg","width":500,"height":500,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/src/images/augustinseminel.jpg";
							}
							
							return target[name];
						}
					});

const $$About = createComponent(($$result, $$props, $$slots) => {
  const {
    title,
    subtitle,
    description1,
    description2,
    description3,
    description4
  } = t("about", {
    returnObjects: true
  });
  const normalizeTitle = title.toLowerCase().replaceAll(" ", "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(normalizeTitle, "id")} class="about" data-astro-cid-vqbephrr>
  <h2 data-astro-cid-vqbephrr>${title}</h2>
  <section class="info" data-astro-cid-vqbephrr>
    <div class="picture" data-astro-cid-vqbephrr>
      ${renderComponent($$result, "Picture", $$Picture, { "src": augustinseminel, "alt": "Augustin Seminel", "width": 366, "height": 361, "formats": ["avif", "webp"], "fallbackFormat": "webp", "data-astro-cid-vqbephrr": true })}
    </div>
    <div class="description" data-astro-cid-vqbephrr>
      <h3 class="headline-2" data-astro-cid-vqbephrr>${subtitle}</h3>
      <p data-astro-cid-vqbephrr>${description1}</p>
      <p data-astro-cid-vqbephrr>${description2}</p>
      <p data-astro-cid-vqbephrr>${description3}</p>
      <p data-astro-cid-vqbephrr>${description4}</p>
    </div>
  </section>
</section>`;
}, "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/src/pages/_home/About.astro", void 0);

const $$Astro$3 = createAstro("https://www.augustinseminel.com");
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Button;
  const { href, class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(className, "class")}${addAttribute(href, "href")} data-astro-cid-vnzlvqnm>
  ${renderSlot($$result, $$slots["default"])}
</a>`;
}, "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/src/components/Button.astro", void 0);

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  const { cta } = t("hero", {
    returnObjects: true
  });
  const { title, subtitle } = t("contact", {
    returnObjects: true
  });
  return renderTemplate`${maybeRenderHead()}<section class="contact" data-astro-cid-ld6nigpc>
  <h2 class="headline-1" data-astro-cid-ld6nigpc>${title}</h2>
  <h3 class="headline-2" data-astro-cid-ld6nigpc>${subtitle}</h3>
  <div class="buttons-container" data-astro-cid-ld6nigpc>
    ${renderComponent($$result, "Button", $$Button, { "class": "filled", "href": "#", "data-astro-cid-ld6nigpc": true }, { "default": ($$result2) => renderTemplate`${cta}` })}
    ${renderComponent($$result, "Button", $$Button, { "href": "#", "data-astro-cid-ld6nigpc": true }, { "default": ($$result2) => renderTemplate`
      ${renderComponent($$result2, "Icon", $$Icon, { "name": "linkedin", "size": 24, "data-astro-cid-ld6nigpc": true })}
      <span data-astro-cid-ld6nigpc>LinkedIn</span>
    ` })}
  </div>
  <canvas id="grid" data-astro-cid-ld6nigpc></canvas>
</section>



${renderScript($$result, "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/src/pages/_home/Contact.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/src/pages/_home/Contact.astro", void 0);

const $$Astro$2 = createAstro("https://www.augustinseminel.com");
const $$CardContributions = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$CardContributions;
  const { src, alt, title, description, techs, repo, repoLabel, commits } = Astro2.props;
  const images = /* #__PURE__ */ Object.assign({"/src/images/contributions/advanced-periodontics.jpg": () => import('./advanced-periodontics_CQMZdsdJ.mjs'),"/src/images/contributions/ana-cards.jpg": () => import('./ana-cards_COD7hDzQ.mjs')

});
  if (!images[src])
    throw new Error(
      `"${src}" no existe en: "/src/images/contributions/*.{jpeg,jpg,png}"`
    );
  return renderTemplate`${maybeRenderHead()}<section class="card-contributions" data-astro-cid-zpf2rfts>
  <div data-astro-cid-zpf2rfts>
    <a${addAttribute(repo, "href")} data-astro-cid-zpf2rfts>
      ${renderComponent($$result, "Picture", $$Picture, { "src": images[src](), "alt": alt, "width": 293, "height": 168, "formats": ["avif", "webp"], "fallbackFormat": "webp", "data-astro-cid-zpf2rfts": true })}
    </a>
  </div>
  <h3 data-astro-cid-zpf2rfts><a${addAttribute(repo, "href")} data-astro-cid-zpf2rfts>${title}</a></h3>
  <p data-astro-cid-zpf2rfts>
    ${description}
  </p>
  <div class="badges" data-astro-cid-zpf2rfts>
    ${techs.map((tech) => {
    const techLower = tech.toLowerCase().replaceAll(" ", "-");
    return renderTemplate`<span${addAttribute(`badge-tech ${techLower}`, "class")} data-astro-cid-zpf2rfts>
            ${renderComponent($$result, "Icon", $$Icon, { "name": `techs/${techLower}`, "size": 16, "data-astro-cid-zpf2rfts": true })}
            <span data-astro-cid-zpf2rfts>${tech}</span>
          </span>`;
  })}
  </div>
  <div class="links" data-astro-cid-zpf2rfts>
    <a${addAttribute(repo, "href")} data-astro-cid-zpf2rfts>
      ${renderComponent($$result, "Icon", $$Icon, { "name": "github", "size": 16, "data-astro-cid-zpf2rfts": true })}
      ${repoLabel}
    </a>
    <a${addAttribute(commits, "href")} data-astro-cid-zpf2rfts>
      ${renderComponent($$result, "Icon", $$Icon, { "name": "link", "size": 16, "data-astro-cid-zpf2rfts": true })}
      Commits
    </a>
  </div>
</section>`;
}, "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/src/components/CardContributions.astro", void 0);

const $$Contributions = createComponent(($$result, $$props, $$slots) => {
  const { title, contributions } = t("contributions", {
    returnObjects: true
  });
  return renderTemplate`${maybeRenderHead()}<section class="contributions" data-astro-cid-sxkrbu74>
  <h2 data-astro-cid-sxkrbu74>
    <span data-astro-cid-sxkrbu74>${title}</span>
  </h2>
  <div class="card-contributions" data-astro-cid-sxkrbu74>
    ${contributions.map(
    ({
      src,
      alt,
      title: title2,
      description,
      techs,
      repo,
      repo_label: repoLabel,
      commits
    }) => renderTemplate`${renderComponent($$result, "CardContributions", $$CardContributions, { "src": src, "alt": alt, "title": title2, "description": description, "techs": techs, "repo": repo, "repoLabel": repoLabel, "commits": commits, "data-astro-cid-sxkrbu74": true })}`
  )}
  </div>
</section>`;
}, "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/src/pages/_home/Contributions.astro", void 0);

const $$Experience = createComponent(($$result, $$props, $$slots) => {
  const { title, jobs } = t("experience", {
    returnObjects: true
  });
  const { jobs_title: jobsTitle, jobs_description: jobsDescription } = jobs;
  const normalizeTitle = title.toLowerCase().replaceAll(" ", "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(normalizeTitle, "id")} class="experience" data-astro-cid-tsv6ktmd>
  <h2 data-astro-cid-tsv6ktmd>${title}</h2>
  <section class="jobs" data-astro-cid-tsv6ktmd>
    <div class="job-title" data-astro-cid-tsv6ktmd>
      ${jobsTitle.map((title2, index) => renderTemplate`<button${addAttribute([
    "headline-3 tabbutton",
    {
      active: index === 0
    }
  ], "class:list")} data-astro-cid-tsv6ktmd>
            ${title2}
          </button>`)}
    </div>
    <div class="jobs-descriptions" data-astro-cid-tsv6ktmd>
      ${jobsDescription.map(({ title: title2, time, description, list }, index) => renderTemplate`<div${addAttribute(["description tabcontent", { active: index === 0 }], "class:list")} data-astro-cid-tsv6ktmd>
            <h3 data-astro-cid-tsv6ktmd>${title2}</h3>
            <div class="job-time" data-astro-cid-tsv6ktmd>
              ${time.map((time2, index2) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-tsv6ktmd": true }, { "default": ($$result2) => renderTemplate`
                  <time class="headline-4"${addAttribute(time2, "datetime")} data-astro-cid-tsv6ktmd>
                    ${time2}
                  </time>
                  ${index2 % 2 === 0 && renderTemplate`<span data-astro-cid-tsv6ktmd>—</span>`}` })}`)}
              ${time.length <= 1 && renderTemplate`<span class="badge" data-astro-cid-tsv6ktmd>maintenant</span>`}
            </div>
            <p data-astro-cid-tsv6ktmd>${description}</p>
            <ul data-astro-cid-tsv6ktmd>
              ${list.map((item) => renderTemplate`<li data-astro-cid-tsv6ktmd>${item}</li>`)}
            </ul>
          </div>`)}
    </div>
  </section>
</section>



${renderScript($$result, "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/src/pages/_home/Experience.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/src/pages/_home/Experience.astro", void 0);

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const {
    job_availability: jobAvailability,
    title,
    job_title: jobTitle,
    description,
    cta
  } = t("hero", {
    returnObjects: true
  });
  return renderTemplate`${maybeRenderHead()}<section class="hero" data-astro-cid-6ffyhvbn>
  <div data-astro-cid-6ffyhvbn>
    <div class="badge" data-astro-cid-6ffyhvbn>
      <span class="dot" data-astro-cid-6ffyhvbn></span>
      <span data-astro-cid-6ffyhvbn>${jobAvailability}</span>
    </div>
    <h1 data-astro-cid-6ffyhvbn>${title}</h1>
    <section data-astro-cid-6ffyhvbn>
      <p data-astro-cid-6ffyhvbn>${unescapeHTML(jobTitle)}</p>
      <p data-astro-cid-6ffyhvbn>${description}</p>
    </section>
    <section class="button-container" data-astro-cid-6ffyhvbn>
      ${renderComponent($$result, "Button", $$Button, { "class": "filled", "href": "#", "data-astro-cid-6ffyhvbn": true }, { "default": ($$result2) => renderTemplate`${cta}` })}
      ${renderComponent($$result, "Button", $$Button, { "href": "https://www.linkedin.com/in/augustinseminel/", "aria-label": "LinkedIn", "data-astro-cid-6ffyhvbn": true }, { "default": ($$result2) => renderTemplate`
        ${renderComponent($$result2, "Icon", $$Icon, { "name": "linkedin", "size": 24, "data-astro-cid-6ffyhvbn": true })}
        <span data-astro-cid-6ffyhvbn>Mon LinkedIn</span>
      ` })}
    </section>
    <canvas id="stars" data-astro-cid-6ffyhvbn></canvas>
  </div>
</section>



${renderScript($$result, "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/src/pages/_home/Hero.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/src/pages/_home/Hero.astro", void 0);

const $$Astro$1 = createAstro("https://www.augustinseminel.com");
const $$CardProject = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CardProject;
  const { src, alt, title, description, techs, code, preview } = Astro2.props;
  const images = /* #__PURE__ */ Object.assign({"/src/images/projects/ana-rangel-portafolio.jpg": () => import('./ana-rangel-portafolio_icnA5aaT.mjs'),"/src/images/projects/calculadora-payoneer-project.jpg": () => import('./calculadora-payoneer-project_Dqv0faz5.mjs'),"/src/images/projects/esteli-buses-project.jpg": () => import('./esteli-buses-project_B27dhD9O.mjs')

});
  if (!images[src])
    throw new Error(
      `"${src}" no existe en: "/src/images/projects/*.{jpeg,jpg,png}"`
    );
  return renderTemplate`${maybeRenderHead()}<section class="card-project" data-astro-cid-3qibyvd4>
  <div data-astro-cid-3qibyvd4>
    <a href="#" data-astro-cid-3qibyvd4>
      ${renderComponent($$result, "Picture", $$Picture, { "src": images[src](), "alt": alt, "width": 434, "height": 288, "formats": ["avif", "webp"], "fallbackFormat": "webp", "data-astro-cid-3qibyvd4": true })}
    </a>
  </div>
  <div class="description" data-astro-cid-3qibyvd4>
    <h3 data-astro-cid-3qibyvd4><a href="#" data-astro-cid-3qibyvd4>${title}</a></h3>
    <div class="badges" data-astro-cid-3qibyvd4>
      ${techs.map((tech) => {
    const techLower = tech.toLowerCase().replaceAll(" ", "-");
    return renderTemplate`<span${addAttribute(`badge-tech ${techLower}`, "class")} data-astro-cid-3qibyvd4>
              ${renderComponent($$result, "Icon", $$Icon, { "name": `techs/${techLower}`, "size": 24, "data-astro-cid-3qibyvd4": true })}
              <span data-astro-cid-3qibyvd4>${tech}</span>
            </span>`;
  })}
    </div>
    <p data-astro-cid-3qibyvd4>${description}</p>
    <div class="links" data-astro-cid-3qibyvd4>
      <a href="#" data-astro-cid-3qibyvd4>
        ${renderComponent($$result, "Icon", $$Icon, { "name": "github", "size": 24, "data-astro-cid-3qibyvd4": true })}
        ${code}
      </a>
      <a href="#" data-astro-cid-3qibyvd4>
        ${renderComponent($$result, "Icon", $$Icon, { "name": "link", "size": 24, "data-astro-cid-3qibyvd4": true })}
        ${preview}
      </a>
    </div>
  </div>
</section>`;
}, "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/src/components/CardProject.astro", void 0);

const $$Projects = createComponent(($$result, $$props, $$slots) => {
  const { title, projects } = t("projects", {
    returnObjects: true
  });
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(title.toLowerCase(), "id")} class="projects" data-astro-cid-pwkhmixj>
  <h2 data-astro-cid-pwkhmixj>
    <span data-astro-cid-pwkhmixj>${title}</span>
  </h2>
  ${projects.map(({ title: title2, description, image, techs, code, preview }) => renderTemplate`${renderComponent($$result, "CardProject", $$CardProject, { "src": image, "alt": title2, "title": title2, "description": description, "techs": techs, "code": code, "preview": preview, "data-astro-cid-pwkhmixj": true })}`)}
</section>`;
}, "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/src/pages/_home/Projects.astro", void 0);

const $$Astro = createAstro("https://www.augustinseminel.com");
const $$OpenGraph = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$OpenGraph;
  const { information, image } = Astro2.props;
  const { title, description } = information;
  return renderTemplate`<meta${addAttribute(title, "content")} property="og:title">
<meta${addAttribute(description, "content")} property="og:description">
<meta${addAttribute(image, "content")} property="og:image">
<meta${addAttribute(title, "content")} property="og:image:alt">
<meta property="og:image:type" content="image/png">
<meta content="website" property="og:type">
<meta content="Portfolio Felix Rangel" property="og:site_name">
<meta${addAttribute(Astro2.url.href, "content")} property="og:url">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title"${addAttribute(title, "content")}>
<meta name="twitter:description"${addAttribute(description, "content")}>
<meta name="twitter:image"${addAttribute(image, "content")}>
<meta name="twitter:image:alt"${addAttribute(title, "content")}>`;
}, "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/src/components/OpenGraph.astro", void 0);

export { $$Layout as $, URL as U, $$OpenGraph as a, $$Hero as b, $$About as c, $$Experience as d, $$Projects as e, $$Contributions as f, $$Contact as g, t };
