import { z } from "zod";

/**
 * Esquema de validación del formulario de contacto.
 * Se usa tanto en el cliente (ContactSection.tsx) como en el servidor
 * (app/api/contact/route.ts) — nunca confiar solo en la validación de cliente,
 * conforme a la decisión técnica documentada en PRJ-01_HO_DEV01_a_DEV03 (sección 5).
 */
export const contactFormSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre es demasiado largo"),
  email: z
    .string()
    .trim()
    .min(1, "El email es obligatorio")
    .email("Ingresá un email válido"),
  mensaje: z
    .string()
    .trim()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(2000, "El mensaje es demasiado largo"),
  // Honeypot: campo invisible para el usuario real. Si llega con contenido,
  // se trata como bot y se responde 200 sin enviar el email (no se revela
  // al bot que fue detectado).
  website: z.string().max(0, "campo inválido").optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
