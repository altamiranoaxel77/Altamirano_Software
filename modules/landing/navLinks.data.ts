export interface NavLink {
  label: string;
  href: string;
}

/**
 * Links de navegación del Header. Un solo lugar de edición: se usan
 * tanto en la nav de desktop como en el menú hamburguesa de mobile
 * (Header.tsx y MobileNav.tsx), así nunca quedan desincronizados.
 */
export const NAV_LINKS: NavLink[] = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Trabajos", href: "#galeria" },
  { label: "Contacto", href: "#contacto" },
];
