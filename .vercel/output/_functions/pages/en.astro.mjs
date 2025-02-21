import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DXJvspxA.mjs';
import { t, $ as $$Layout, a as $$OpenGraph, U as URL, b as $$Hero, c as $$About, d as $$Experience, e as $$Projects, f as $$Contributions, g as $$Contact } from '../chunks/OpenGraph_k_0wQjdg.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const options = {
    title: t("common:title"),
    description: t("common:description")
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "options": options, "data-astro-cid-sabz5usx": true }, { "default": ($$result2) => renderTemplate`
  ${renderComponent($$result2, "OpenGraph", $$OpenGraph, { "information": options, "image": `${URL}/og/augustin-seminel-og.png`, "data-astro-cid-sabz5usx": true })}

  ${maybeRenderHead()}<main data-astro-cid-sabz5usx>
    ${renderComponent($$result2, "Hero", $$Hero, { "data-astro-cid-sabz5usx": true })}
    ${renderComponent($$result2, "About", $$About, { "data-astro-cid-sabz5usx": true })}
    ${renderComponent($$result2, "Experience", $$Experience, { "data-astro-cid-sabz5usx": true })}
    ${renderComponent($$result2, "Projects", $$Projects, { "data-astro-cid-sabz5usx": true })}
    ${renderComponent($$result2, "Contributions", $$Contributions, { "data-astro-cid-sabz5usx": true })}
    ${renderComponent($$result2, "Contact", $$Contact, { "data-astro-cid-sabz5usx": true })}
  </main>
` })}`;
}, "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/.astro/astro-i18n/entrypoints/en/index.astro", void 0);

const $$file = "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/.astro/astro-i18n/entrypoints/en/index.astro";
const $$url = undefined;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
