/**
 * Rate limiting básico en memoria para el endpoint /api/contact.
 *
 * Limitación conocida: al vivir en memoria del proceso, no persiste entre
 * despliegues ni escala entre múltiples instancias del servidor. Es
 * suficiente para el alcance de este incremento (VPS con una sola instancia,
 * EMP-05). Si el proyecto escala a múltiples instancias, migrar a un store
 * compartido (ej. Redis/Upstash) — dejar reportado a DEV-01 si esto ocurre.
 */

const WINDOW_MS = 60 * 1000; // 1 minuto
const MAX_REQUESTS = 3; // máximo 3 envíos por IP por minuto

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function checkRateLimit(identifier: string): {
  allowed: boolean;
  retryAfterSeconds: number;
} {
  const now = Date.now();
  const bucket = buckets.get(identifier);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (bucket.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
