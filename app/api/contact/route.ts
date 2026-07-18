import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";
import { sendContactEmail } from "@/lib/email/gmail";
import { checkRateLimit } from "@/lib/rate-limit";

/**
 * POST /api/contact
 *
 * Contrato (PRJ-01_HO_DEV01_a_DEV03, sección 6):
 *   Body: { nombre, email, mensaje }
 *   200 → envío exitoso
 *   400 → validación fallida
 *   429 → rate limit excedido
 *   500 → error de envío (falla del servicio de email)
 *
 * Seguridad: rate limiting básico por IP + honeypot (campo "website")
 * para mitigar spam, conforme a la mitigación de riesgo documentada
 * en el handoff (sección 9).
 */
export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const { allowed, retryAfterSeconds } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Intentá nuevamente en unos minutos." },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "El cuerpo de la solicitud no es JSON válido." },
      { status: 400 }
    );
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validación fallida.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  // Honeypot: si el campo trampa viene con contenido, es un bot.
  // Respondemos 200 sin enviar el email, sin revelar que fue detectado.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  try {
    await sendContactEmail({
      nombre: parsed.data.nombre,
      email: parsed.data.email,
      mensaje: parsed.data.mensaje,
    });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("[api/contact] Error al enviar el email:", error);
    return NextResponse.json(
      { error: "No pudimos enviar tu mensaje. Probá nuevamente en unos minutos." },
      { status: 500 }
    );
  }
}
