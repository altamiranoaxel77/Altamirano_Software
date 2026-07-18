import Image from "next/image";
import logoHorizontal from "@/public/brand/logo-horizontal.png";
import MobileNav from "./MobileNav";
import { NAV_LINKS } from "./navLinks.data";

/**
 * Header — landing pública.
 *
 * Logo horizontal oficial (Altamirano_Logo_Horizontal_MonogramaA_Color.png)
 * en /public/brand/. Se usa next/image con import estático para
 * optimización automática y evitar layout shift (dimensiones conocidas).
 *
 * Navegación responsive según spec de DEV-08: nav completa (horizontal)
 * desde `md` en adelante; por debajo, botón hamburguesa (MobileNav.tsx).
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-crema bg-white/90 backdrop-blur">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" aria-label="Altamirano Software — inicio" className="shrink-0">
          <Image
            src={logoHorizontal}
            alt="Altamirano Software"
            className="h-10 w-auto md:h-11"
            priority
          />
        </a>

        {/* Nav completa — solo visible desde md en adelante */}
        <nav aria-label="Navegación principal" className="hidden gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-tinta hover:text-terracota"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contacto"
            className="rounded-full bg-terracota px-5 py-2 text-sm font-semibold text-white transition hover:bg-terracota/90"
          >
            Hablemos
          </a>

          {/* Botón hamburguesa — solo visible por debajo de md */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
