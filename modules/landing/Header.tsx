import Image from "next/image";
import logoHorizontal from "@/public/brand/logo-horizontal.png";

/**
 * Header — landing pública.
 *
 * Logo horizontal oficial (Altamirano_Logo_Horizontal_MonogramaA_Color.png)
 * en /public/brand/. Se usa next/image con import estático para
 * optimización automática y evitar layout shift (dimensiones conocidas).
 *
 * Pendiente (flagueado a DEV-08): validar espaciados exactos del header
 * contra el Figma cuando esté disponible.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-crema bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" aria-label="Altamirano Software — inicio" className="shrink-0">
          <Image
            src={logoHorizontal}
            alt="Altamirano Software"
            className="h-12 w-auto md:h-14"
            priority
          />
        </a>

        <nav aria-label="Navegación principal" className="hidden gap-8 md:flex">
          <a href="#nosotros" className="text-sm font-medium text-tinta hover:text-terracota">
            Nosotros
          </a>
          <a href="#galeria" className="text-sm font-medium text-tinta hover:text-terracota">
            Trabajos
          </a>
          <a href="#contacto" className="text-sm font-medium text-tinta hover:text-terracota">
            Contacto
          </a>
        </nav>

        <a
          href="#contacto"
          className="rounded-full bg-terracota px-5 py-2 text-sm font-semibold text-white transition hover:bg-terracota/90"
        >
          Hablemos
        </a>
      </div>
    </header>
  );
}
