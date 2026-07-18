"use client";

import { useState } from "react";
import type { SocialLink } from "@/lib/types/social-link";
import { getSocialIcon } from "./icons";

interface ContactLinksListProps {
  links: SocialLink[];
  className?: string;
}

/**
 * ContactLinksList — variante de SocialLinks pensada para datos de
 * contacto (email, WhatsApp, etc.) que el visitante puede necesitar
 * copiar y pegar, no solo clickear.
 *
 * Cada fila muestra: ícono + texto visible (displayText) + botón
 * "Copiar". El texto también es seleccionable directamente por el
 * usuario, el botón es solo un atajo.
 *
 * Igual que SocialLinks, filtra automáticamente los links con
 * `enabled: false` o sin `href` cargado.
 */
export default function ContactLinksList({ links, className = "" }: ContactLinksListProps) {
  // Solo se muestran los links habilitados y con URL cargada.
  const visibleLinks = links.filter((link) => link.enabled && link.href.trim() !== "");

  if (visibleLinks.length === 0) return null;

  return (
    <ul className={`space-y-3 ${className}`}>
      {visibleLinks.map((link) => (
        <ContactLinkRow key={link.platform} link={link} />
      ))}
    </ul>
  );
}

/**
 * ContactLinkRow — una fila individual de ContactLinksList.
 * Maneja su propio estado de "Copiado" para dar feedback visual sin
 * afectar a las demás filas.
 */
function ContactLinkRow({ link }: { link: SocialLink }) {
  const [copied, setCopied] = useState(false);
  const Icon = getSocialIcon(link.platform);
  const textToShow = link.displayText || link.label;
  const isExternalLink = link.platform !== "email";

  /**
   * handleCopy — copia el texto visible al portapapeles usando la
   * Clipboard API y muestra "Copiado" por 2 segundos como confirmación.
   */
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToShow);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Si el navegador bloquea el acceso al portapapeles (poco común),
      // no rompemos la UI: el texto sigue siendo seleccionable a mano.
    }
  };

  return (
    <li className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-tinta/15 text-tinta/70">
        <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
      </span>

      <a
        href={link.href}
        aria-label={link.label}
        {...(isExternalLink ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="select-all text-sm text-tinta/80 underline-offset-2 hover:text-terracota hover:underline"
      >
        {textToShow}
      </a>

      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copiar ${textToShow}`}
        className="text-xs font-medium text-terracota/80 transition hover:text-terracota"
      >
        {copied ? "¡Copiado!" : "Copiar"}
      </button>
    </li>
  );
}
