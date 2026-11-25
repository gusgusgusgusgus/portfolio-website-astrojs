export const CONTACT_MAX = { name: 100, email: 254, message: 5000 } as const

const EMAIL_RE =
  /^[^\s@<>"',;:()[\]\\]+@[^\s@<>"',;:()[\]\\]+\.[^\s@<>"',;:()[\]\\]+$/

export type ContactField = "name" | "email" | "message"
export type ContactValues = Record<ContactField, string>
export type ContactErrors = Partial<Record<ContactField, string>>

// Caractères Unicode de direction/séparation (ex. U+202E) qui permettent de
// falsifier l'affichage d'un texte ; on ne retire pas les ZWJ/ZWNJ (emojis).
const BIDI_RE = /[\u061C\u200E\u200F\u2028\u2029\u202A-\u202E\u2066-\u2069]/g

// Retire les caractères de contrôle (dont CR/LF, vecteurs d'injection
// d'en-têtes e-mail) et de direction Unicode. Les sauts de ligne sont
// conservés pour le message.
export const cleanText = (value: unknown, multiline = false) => {
  const text =
    typeof value === "string" ? value.normalize("NFC").replace(BIDI_RE, "") : ""
  let result = ""
  for (const char of text) {
    const code = char.charCodeAt(0)
    const isControl = code < 32 || code === 127
    const isNewline = code === 10 || code === 13
    if (!isControl || (multiline && isNewline)) result += char
  }
  return result.trim()
}

export const validateContact = (values: ContactValues): ContactErrors => {
  const { name, email, message } = values
  const errors: ContactErrors = {}

  if (!name) errors.name = "Indiquez votre nom."
  else if (name.length > CONTACT_MAX.name)
    errors.name = `Le nom ne doit pas dépasser ${CONTACT_MAX.name} caractères.`

  if (!email || email.length > CONTACT_MAX.email || !EMAIL_RE.test(email))
    errors.email = "Indiquez une adresse e-mail valide."

  if (!message) errors.message = "Écrivez votre message."
  else if (message.length > CONTACT_MAX.message)
    errors.message = `Le message ne doit pas dépasser ${CONTACT_MAX.message} caractères.`

  return errors
}
