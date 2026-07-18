import type { SocialLink } from "@/lib/types/social-link";

/**
 * Links de contacto mostrados en ContactSection, junto al formulario.
 *
 * Mismo mecanismo que team.data.ts: `enabled: false` oculta el link sin
 * borrar el resto de los datos. Para activarlo, completar `href` y poner
 * `enabled: true`.
 */
export const CONTACT_LINKS: SocialLink[] = [
  {
    platform: "whatsapp",
    label: "Escribinos por WhatsApp",
    href: "", // TODO: completar con el link de wa.me, ej: https://wa.me/5493794000000
    displayText: "", // TODO: completar con el numero visible, ej: +54 9 379 400-0000
    enabled: false,
  },
  {
    platform: "email",
    label: "Escribinos por email",
    href: "mailto:altamiranosoftware@gmail.com",
    displayText: "altamiranosoftware@gmail.com",
    enabled: true,
  },
  {
    platform: "instagram",
    label: "Seguinos en Instagram",
    href: "https://instagram.com/altamiranosoft",
    displayText: "@altamiranosoft",
    enabled: true,
  },
  {
    platform: "linkedin",
    label: "Seguinos en LinkedIn",
    href: "", // TODO: completar con la URL de LinkedIn cuando esté disponible
    displayText: "", // TODO: completar con el nombre visible, ej: Altamirano Software
    enabled: false,
  },
];
