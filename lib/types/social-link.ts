/**
 * Tipos compartidos para links de redes sociales / contacto.
 *
 * Se usa tanto para los links de cada integrante del equipo
 * (modules/team) como para los links de la sección de contacto
 * (modules/landing/contactLinks.data.ts).
 */

/** Plataformas soportadas. Agregar acá una nueva antes de usarla en un link. */
export type SocialPlatform =
  | "linkedin"
  | "github"
  | "instagram"
  | "portfolio"
  | "whatsapp"
  | "email";

export interface SocialLink {
  /** Identifica la plataforma — se usa para elegir el ícono correcto. */
  platform: SocialPlatform;
  /** Texto accesible (aria-label / title) que describe el link. */
  label: string;
  /**
   * URL de destino.
   * - Email: usar formato "mailto:direccion@dominio.com"
   * - WhatsApp: usar formato "https://wa.me/<numero-con-codigo-pais>"
   */
  href: string;
  /**
   * Texto legible para mostrar en pantalla y copiar (ej. la dirección de
   * email o el @usuario de Instagram). Opcional: si no se completa, en los
   * lugares que lo usan se cae de nuevo a `label`. Sirve para que el
   * visitante pueda copiar y pegar el dato sin depender de que el link
   * funcione (por ejemplo, si todavía no tiene WhatsApp Web configurado).
   */
  displayText?: string;
  /**
   * Controla si el link se muestra o no en pantalla.
   * Poné `false` para ocultarlo sin necesidad de borrar el resto de los
   * datos — útil mientras todavía no tenés la URL definitiva. Cuando la
   * tengas, completá `href` y cambiá esto a `true`.
   */
  enabled: boolean;
}
