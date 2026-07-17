import nodemailer from "nodemailer";

/**
 * Cliente de envío de email — Gmail SMTP vía Nodemailer.
 *
 * Decisión técnica (PRJ-01_HO_DEV01_a_DEV03, sección 5): se aísla esta
 * capa en /lib/email para poder migrar de Gmail a otro proveedor
 * (ej. Resend) sin tocar la capa de presentación si el volumen crece.
 *
 * Seguridad (EMP-10): las credenciales viven exclusivamente en variables
 * de entorno. Nunca hardcodear usuario/contraseña de aplicación acá.
 * Ver .env.example para las variables requeridas.
 */

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const user = process.env.GMAIL_USER;
  const appPassword = process.env.GMAIL_APP_PASSWORD;

  if (!user || !appPassword) {
    throw new Error(
      "Faltan las variables de entorno GMAIL_USER / GMAIL_APP_PASSWORD. " +
        "Deben configurarse antes del despliegue (coordinar con el usuario humano de la empresa, EMP-10)."
    );
  }

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass: appPassword },
  });

  return transporter;
}

export interface ContactEmailPayload {
  nombre: string;
  email: string;
  mensaje: string;
}

export async function sendContactEmail(payload: ContactEmailPayload) {
  const destination = process.env.CONTACT_DESTINATION_EMAIL || process.env.GMAIL_USER;

  const client = getTransporter();

  await client.sendMail({
    from: `"Landing Altamirano Software" <${process.env.GMAIL_USER}>`,
    to: destination,
    replyTo: payload.email,
    subject: `Nuevo contacto desde la landing — ${payload.nombre}`,
    text: `Nombre: ${payload.nombre}\nEmail: ${payload.email}\n\nMensaje:\n${payload.mensaje}`,
    html: `
      <p><strong>Nombre:</strong> ${escapeHtml(payload.nombre)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${escapeHtml(payload.mensaje).replace(/\n/g, "<br />")}</p>
    `,
  });
}

// Sanitización mínima para evitar inyección de HTML en el cuerpo del email.
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
