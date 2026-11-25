import { t } from "i18n:astro"

export const links = {
  linkedin: "https://www.linkedin.com/in/augustinseminel/",
  github: "https://github.com/gusgusgusgusgus",
} as const

// Ancre de la section contact, dérivée du titre traduit (même calcul que
// l'id de la section dans Contact.astro).
export const contactAnchor = () => {
  const { title } = t("contact", { returnObjects: true })
  return `#${title
    .toLowerCase()
    .replaceAll(" ", "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")}`
}
