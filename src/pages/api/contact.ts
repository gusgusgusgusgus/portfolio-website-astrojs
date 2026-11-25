import {
  CONTACT_FROM_EMAIL,
  CONTACT_TO_EMAIL,
  RESEND_API_KEY,
} from "astro:env/server"
import type { APIRoute } from "astro"
import { Resend } from "resend"
import { cleanText, validateContact } from "../../lib/contact"
import { rateLimit } from "../../lib/rate-limit"

export const prerender = false

const SITE_NAME = "madebyaugustin.com"
const MAX_BODY = 32_000

const json = (body: unknown, status = 200, headers: HeadersInit = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  })

export const POST: APIRoute = async ({ request }) => {
  // 1. Same-origin
  const origin = request.headers.get("origin")
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host")
  let originHost: string | null = null
  try {
    originHost = origin ? new URL(origin).host : null
  } catch {
    originHost = null
  }
  if (!originHost || !host || originHost !== host) {
    return json({ error: "Origine refusée." }, 403)
  }

  // 2. Taille
  const contentLength = Number(request.headers.get("content-length") ?? 0)
  if (contentLength > MAX_BODY) {
    return json({ error: "Requête trop volumineuse." }, 413)
  }
  const raw = await request.text()
  if (raw.length > MAX_BODY) {
    return json({ error: "Requête trop volumineuse." }, 413)
  }

  // 3. Rate limit par IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  const limit = rateLimit(ip, { limit: 5, windowMs: 10 * 60 * 1000 })
  if (!limit.ok) {
    return json(
      { error: "Trop de messages envoyés. Réessayez dans quelques minutes." },
      429,
      { "Retry-After": String(limit.retryAfter) }
    )
  }

  // 4. Parse JSON
  let data: Record<string, unknown>
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("not an object")
    }
    data = parsed as Record<string, unknown>
  } catch {
    return json({ error: "Requête invalide." }, 400)
  }

  // 5. Honeypot : faux succès
  if (cleanText(data.website)) return json({ ok: true })

  // 6. Validation
  const values = {
    name: cleanText(data.name),
    email: cleanText(data.email),
    message: cleanText(data.message, true),
  }
  const errors = validateContact(values)
  if (Object.keys(errors).length > 0) {
    return json({ error: "Champs invalides.", errors }, 400)
  }

  // 7. Config
  const apiKey = RESEND_API_KEY
  const to = CONTACT_TO_EMAIL
  const from = CONTACT_FROM_EMAIL || "onboarding@resend.dev"
  if (!apiKey || !to) {
    console.error("Contact: RESEND_API_KEY ou CONTACT_TO_EMAIL manquant.")
    return json({ error: "Envoi indisponible pour le moment." }, 500)
  }

  // 8. Envoi
  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      replyTo: values.email,
      subject: `Demande de contact de ${values.name} reçue depuis ${SITE_NAME}`,
      text: `Bonjour,

Vous avez reçu un message depuis le formulaire de contact de ${SITE_NAME}.

Nom : ${values.name}
Email : ${values.email}

Message :
${values.message}

—
Répondez directement à cet email pour écrire à l'expéditeur.`,
    })
    if (error) {
      console.error("Contact: erreur Resend", error)
      return json({ error: "L'envoi a échoué. Réessayez plus tard." }, 500)
    }
  } catch (err) {
    console.error("Contact: exception à l'envoi", err)
    return json({ error: "L'envoi a échoué. Réessayez plus tard." }, 500)
  }

  // 9. Succès
  return json({ ok: true })
}
