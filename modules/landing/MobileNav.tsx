"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "./navLinks.data";

/**
 * MobileNav — botón hamburguesa + panel desplegable con los links de
 * navegación, visible solo por debajo del breakpoint `md`.
 *
 * Requerimiento de DEV-08 (validación PRJ-01_HO_DEV08_a_DEV01): "Header:
 * nav completa desde md en adelante; menú colapsado (hamburguesa) por
 * debajo." Este componente es la parte "por debajo" — la nav completa
 * de desktop vive directamente en Header.tsx.
 *
 * Es un Client Component (necesita estado de abierto/cerrado); el resto
 * del Header sigue siendo Server Component.
 */
export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  /** Abre o cierra el panel del menú. */
  const toggleMenu = () => setIsOpen((prev) => !prev);

  /** Cierra el panel — se llama al tocar cualquier link de la lista. */
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        className="flex h-10 w-10 items-center justify-center rounded-full text-tinta hover:bg-crema"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {isOpen && (
        <nav
          id="mobile-nav-panel"
          aria-label="Navegación principal (mobile)"
          className="absolute left-0 right-0 top-full border-b border-crema bg-white px-6 py-4 shadow-sm"
        >
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="block text-base font-medium text-tinta hover:text-terracota"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
