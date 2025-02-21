import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DXJvspxA.mjs';
import { t, $ as $$Layout, a as $$OpenGraph, U as URL, b as $$Hero, c as $$About, d as $$Experience, e as $$Projects, f as $$Contributions, g as $$Contact } from '../chunks/OpenGraph_k_0wQjdg.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const options = {
    title: t("common:title"),
    description: t("common:description")
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "options": options, "data-astro-cid-3hjtptk4": true }, { "default": ($$result2) => renderTemplate`
  ${renderComponent($$result2, "OpenGraph", $$OpenGraph, { "information": options, "image": `${URL}/og/augustin-seminel-og.png`, "data-astro-cid-3hjtptk4": true })}

  ${maybeRenderHead()}<main data-astro-cid-3hjtptk4>
    ${renderComponent($$result2, "Hero", $$Hero, { "data-astro-cid-3hjtptk4": true })}
    ${renderComponent($$result2, "About", $$About, { "data-astro-cid-3hjtptk4": true })}
    ${renderComponent($$result2, "Experience", $$Experience, { "data-astro-cid-3hjtptk4": true })}
    ${renderComponent($$result2, "Projects", $$Projects, { "data-astro-cid-3hjtptk4": true })}
    ${renderComponent($$result2, "Contributions", $$Contributions, { "data-astro-cid-3hjtptk4": true })}
    ${renderComponent($$result2, "Contact", $$Contact, { "data-astro-cid-3hjtptk4": true })}
  </main>
` })}`;
}, "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/.astro/astro-i18n/entrypoints/fr/index.astro", void 0);

const $$file = "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/.astro/astro-i18n/entrypoints/fr/index.astro";
const $$url = undefined;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
