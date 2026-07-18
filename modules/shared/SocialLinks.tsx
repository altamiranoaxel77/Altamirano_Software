import type { SocialLink } from "@/lib/types/social-link";
import { getSocialIcon } from "./icons";

interface SocialLinksProps {
  links: SocialLink[];
  /** Tamaño del ícono en píxeles. Default: 20. */
  size?: number;
  className?: string;
}

/**
 * SocialLinks — fila de íconos clickeables para redes sociales o contacto.
 *
 * Reutilizable en cualquier parte de la landing (equipo, contacto, footer,
 * etc.). Recibe un arreglo de SocialLink y se encarga de:
 *   1. Filtrar los links deshabilitados o sin URL cargada.
 *   2. Elegir el ícono correcto según la plataforma.
 *   3. Abrir en pestaña nueva los links externos (todo excepto email).
 *
 * Si no queda ningún link visible, no renderiza nada (evita dejar un
 * contenedor vacío en el layout).
 */
export default function SocialLinks({ links, size = 20, className = "" }: SocialLinksProps) {
  // Solo se muestran los links habilitados (enabled: true) y con href cargado.
  const visibleLinks = links.filter((link) => link.enabled && link.href.trim() !== "");

  if (visibleLinks.length === 0) return null;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {visibleLinks.map((link) => {
        const Icon = getSocialIcon(link.platform);
        // Los links de email no deben abrir pestaña nueva (es un mailto:).
        const isExternalLink = link.platform !== "email";

        return (
          <a
            key={link.platform}
            href={link.href}
            aria-label={link.label}
            title={link.label}
            {...(isExternalLink ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-tinta/15 text-tinta/70 transition hover:border-terracota hover:text-terracota"
          >
            <Icon size={size} strokeWidth={1.75} aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}
