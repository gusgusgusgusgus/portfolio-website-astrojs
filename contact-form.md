# Tâche : ajouter un formulaire de contact en bas de la single page

Reproduire le formulaire de contact d'un autre site (Next.js), en Astro, intégré
en bas de la page unique du portfolio (section `#contact`). Envoi des e-mails via
Resend. Avant de coder, lis la doc Astro de la version installée (endpoints
serveur, `output`, adapters) car l'API peut différer de ce que tu connais.

## 1. Prérequis Astro
- L'endpoint a besoin d'un rendu serveur. Vérifie `astro.config.*` :
  - Astro 5+ : `output: "static"` (défaut) suffit si l'endpoint déclare
    `export const prerender = false`, mais un **adapter** est requis
    (Vercel / Netlify / Cloudflare / Node selon l'hébergeur actuel).
  - Si aucun adapter n'est configuré, demande-moi quel est l'hébergeur avant de continuer.
- Installer : `resend`.
- Variables d'env (à ajouter dans `.env` et `.env.example`, jamais exposées au client) :
  ```
  RESEND_API_KEY=
  CONTACT_TO_EMAIL=
  CONTACT_FROM_EMAIL=   # ex. "Prénom Nom <contact@mondomaine.fr>" (domaine vérifié dans Resend)
  ```
  Les lire côté serveur (`import.meta.env` ou `astro:env/server` selon la version).
  Fallback de `from` pour les tests : `onboarding@resend.dev`.

## 2. Fichiers à créer
- `src/lib/contact.ts` : validation + nettoyage (code ci-dessous, à reprendre tel quel)
- `src/lib/rate-limit.ts` : limiteur en mémoire (code ci-dessous)
- `src/pages/api/contact.ts` : endpoint `POST`
- `src/components/ContactForm.astro` (ou `.tsx` si l'intégration React existe déjà ;
  sinon préférer **Astro + `<script>` vanilla**, sans ajouter React)
- Intégrer le composant dans la section contact en bas de la page, en reprenant
  les variables CSS / le design system du portfolio (pas de couleurs en dur).

## 3. Champs (identiques à l'original)
| Champ | name | Type | Contraintes | autocomplete |
|---|---|---|---|---|
| Votre nom | `name` | text | requis, max 100 | `name` |
| Votre email, pour vous recontacter | `email` | email | requis, max 254 | `email` |
| Votre message | `message` | textarea (7 lignes, resize vertical, min-height 160px) | requis, max 5000 | – |
| Honeypot | `website` | text | masqué, `tabindex=-1`, `autocomplete=off`, `aria-hidden` | – |

Bouton : « Envoyer » → « Envoi… » + `disabled` pendant la requête.

## 4. Comportement côté client
- `<form noValidate>`, soumission interceptée (`preventDefault`), `fetch("/api/contact")`
  en `POST` JSON (`Content-Type: application/json`) avec `Object.fromEntries(new FormData(form))`.
- États : `idle | loading | success | error`.
- Succès (`response.ok`) : `form.reset()` + message « Merci ! Votre message a bien été envoyé. »
- Erreur : afficher `result.error` (fallback « Une erreur est survenue. Réessayez plus tard. »)
  et les erreurs par champ `result.errors` sous chaque champ.
- Erreur réseau : « Impossible d'envoyer le message. Vérifiez votre connexion. »
- Accessibilité : `<label for>` sur chaque champ ; sur erreur, `aria-invalid="true"` et
  `aria-describedby="<champ>-error"` pointant vers `<p id="<champ>-error">` ; message
  global dans un élément `<output>` (annonce par lecteurs d'écran) ; focus visible.
- Style : champs `border: 2px solid`, rayon léger, `:focus-visible` avec outline 2px offset 2px,
  bordure d'accent si `aria-invalid`, notice succès / échec en bloc pleine largeur
  (couleurs différentes, texte en gras 600). Honeypot positionné `left: -9999px`, 1px × 1px.

## 5. Endpoint `src/pages/api/contact.ts`
`export const prerender = false;` et `export const POST: APIRoute`. Ordre des contrôles :
1. **Same-origin** : comparer `new URL(origin).host` à `x-forwarded-host ?? host`.
   Absent ou différent → 403 `{ error: "Origine refusée." }`.
2. **Taille** : `content-length` > 32 000 → 413 `{ error: "Requête trop volumineuse." }`.
   Revérifier sur `raw.length` après `await request.text()`.
3. **Rate limit** par IP (`x-forwarded-for`, premier élément, sinon `"unknown"`) :
   5 requêtes / 10 min → 429 `{ error: "Trop de messages envoyés. Réessayez dans quelques minutes." }`
   + en-tête `Retry-After`.
4. **Parse JSON** (doit être un objet) sinon 400 `{ error: "Requête invalide." }`.
5. **Honeypot** : si `cleanText(data.website)` non vide → renvoyer `200 { ok: true }`
   (faux succès, rien d'envoyé).
6. **Validation** : `cleanText` sur chaque champ puis `validateContact`. Erreurs →
   400 `{ error: "Champs invalides.", errors }`.
7. **Config** : si `RESEND_API_KEY` ou `CONTACT_TO_EMAIL` manquant → `console.error` +
   500 `{ error: "Envoi indisponible pour le moment." }`.
8. **Envoi Resend** (`new Resend(apiKey).emails.send`), dans un try/catch :
   - `from`, `to`, `replyTo: values.email`
   - `subject`: `Demande de contact de ${name} reçue depuis <nom-du-site>`
   - `text` (texte brut, pas de HTML, donc pas d'injection) :
     ```
     Bonjour,

     Vous avez reçu un message depuis le formulaire de contact de <nom-du-site>.

     Nom : ${name}
     Email : ${email}

     Message :
     ${message}

     —
     Répondez directement à cet email pour écrire à l'expéditeur.
     ```
   - `error` Resend ou exception → `console.error` + 500 `{ error: "L'envoi a échoué. Réessayez plus tard." }`
9. Succès → `200 { ok: true }`.
Réponses via `new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ... } })`.

## 6. `src/lib/contact.ts`
```ts
export const CONTACT_MAX = { name: 100, email: 254, message: 5000 } as const;

const EMAIL_RE =
  /^[^\s@<>"',;:()[\]\\]+@[^\s@<>"',;:()[\]\\]+\.[^\s@<>"',;:()[\]\\]+$/;

export type ContactField = "name" | "email" | "message";
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

// Caractères Unicode de direction/séparation (ex. U+202E) qui permettent de
// falsifier l'affichage d'un texte ; on ne retire pas les ZWJ/ZWNJ (emojis).
const BIDI_RE = /[\u061C\u200E\u200F\u2028\u2029\u202A-\u202E\u2066-\u2069]/g;

// Retire les caractères de contrôle (dont CR/LF, vecteurs d'injection
// d'en-têtes e-mail) et de direction Unicode. Les sauts de ligne sont
// conservés pour le message.
export const cleanText = (value: unknown, multiline = false) => {
  const text =
    typeof value === "string"
      ? value.normalize("NFC").replace(BIDI_RE, "")
      : "";
  let result = "";
  for (const char of text) {
    const code = char.charCodeAt(0);
    const isControl = code < 32 || code === 127;
    const isNewline = code === 10 || code === 13;
    if (!isControl || (multiline && isNewline)) result += char;
  }
  return result.trim();
};

export const validateContact = (values: ContactValues): ContactErrors => {
  const { name, email, message } = values;
  const errors: ContactErrors = {};

  if (!name) errors.name = "Indiquez votre nom.";
  else if (name.length > CONTACT_MAX.name)
    errors.name = `Le nom ne doit pas dépasser ${CONTACT_MAX.name} caractères.`;

  if (!email || email.length > CONTACT_MAX.email || !EMAIL_RE.test(email))
    errors.email = "Indiquez une adresse e-mail valide.";

  if (!message) errors.message = "Écrivez votre message.";
  else if (message.length > CONTACT_MAX.message)
    errors.message = `Le message ne doit pas dépasser ${CONTACT_MAX.message} caractères.`;

  return errors;
};
```

## 7. `src/lib/rate-limit.ts`
```ts
// Rate limiting en mémoire, fenêtre glissante, par clé (ex. IP).
// Limite : état propre à chaque instance serverless, réinitialisé à froid.
// Suffisant contre les robots basiques ; pour une garantie stricte, passer à
// Upstash Redis (@upstash/ratelimit) en gardant cette signature.
const hits = new Map<string, number[]>();

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return {
      ok: false,
      retryAfter: Math.ceil((recent[0] + windowMs - now) / 1000),
    };
  }

  recent.push(now);
  hits.set(key, recent);

  // Purge occasionnelle pour éviter une croissance illimitée de la Map.
  if (hits.size > 1000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }
  return { ok: true, retryAfter: 0 };
}
```

## 8. Adaptations à faire
- Remplacer `<nom-du-site>` par le nom/domaine du portfolio.
- Mettre à jour la page de mentions légales / confidentialité si elle existe :
  ajouter Resend comme sous-traitant (acheminement des messages du formulaire).
- Ne pas copier de dépendance au design system de l'autre site (composant `Button`,
  classes `label` / `body-md`, variables `--brand-*`) : utiliser les équivalents du portfolio.

## 9. Vérifications avant de conclure
- `astro check` et le linter/formatter du repo passent.
- Test manuel : envoi valide (mail reçu, `Reply-To` = e-mail saisi), champs vides
  (erreurs sous chaque champ), e-mail invalide, honeypot rempli (faux succès, aucun mail),
  6e envoi en < 10 min (429), clé API absente (500 propre).
- Vérifier que `RESEND_API_KEY` n'apparaît pas dans le bundle client.
