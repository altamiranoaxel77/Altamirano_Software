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
   * Controla si el link se muestra o no en pantalla.
   * Poné `false` para ocultarlo sin necesidad de borrar el resto de los
   * datos — útil mientras todavía no tenés la URL definitiva. Cuando la
   * tengas, completá `href` y cambiá esto a `true`.
   */
  enabled: boolean;
}
