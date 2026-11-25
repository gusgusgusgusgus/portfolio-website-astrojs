// Rate limiting en mémoire, fenêtre glissante, par clé (ex. IP).
// Limite : état propre à chaque instance, réinitialisé au redémarrage.
// Suffisant contre les robots basiques ; pour une garantie stricte, passer à
// Upstash Redis (@upstash/ratelimit) en gardant cette signature.
const hits = new Map<string, number[]>()

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): { ok: boolean; retryAfter: number } {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)

  if (recent.length >= limit) {
    hits.set(key, recent)
    return {
      ok: false,
      retryAfter: Math.ceil((recent[0] + windowMs - now) / 1000),
    }
  }

  recent.push(now)
  hits.set(key, recent)

  // Purge occasionnelle pour éviter une croissance illimitée de la Map.
  if (hits.size > 1000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= windowMs)) hits.delete(k)
    }
  }
  return { ok: true, retryAfter: 0 }
}
