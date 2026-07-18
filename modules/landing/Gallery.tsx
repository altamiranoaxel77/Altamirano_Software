interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  href?: string; // URL del proyecto en producción. Vacío/undefined = "Próximamente".
}

/**
 * Gallery — muestra de trabajos/proyectos.
 *
 * Cada item puede llevar `href` con el link al proyecto en vivo. Mientras
 * el link no esté disponible, se deja `href` vacío y la card se muestra
 * como no clickeable con la etiqueta "Próximamente" — no hace falta tocar
 * la estructura del componente cuando el link esté listo, solo completar
 * el dato en `PROJECT_ITEMS` (app/(public)/page.tsx) o donde se use.
 */
interface GalleryProps {
  items?: GalleryItem[];
}

export default function Gallery({ items = [] }: GalleryProps) {
  return (
    <section id="galeria" className="bg-crema/60">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-10 text-3xl font-bold text-tinta">Algunos de nuestros trabajos</h2>

        {items.length === 0 ? (
          <p className="text-sm text-tinta/60">
            Galería pendiente de contenido — se completará con proyectos aprobados.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => {
              const CardContent = (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="aspect-video w-full object-cover"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-tinta">{item.title}</p>
                      {!item.href && (
                        <span className="shrink-0 rounded-full bg-tinta/10 px-2.5 py-0.5 text-xs font-medium text-tinta/60">
                          Próximamente
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-tinta/70">{item.description}</p>
                  </div>
                </>
              );

              const cardClasses =
                "block overflow-hidden rounded-xl border border-tinta/10 bg-white transition";

              return item.href ? (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cardClasses} hover:border-terracota/40 hover:shadow-md`}
                  aria-label={`Ver proyecto ${item.title} (abre en una pestaña nueva)`}
                >
                  {CardContent}
                </a>
              ) : (
                <div key={item.id} className={cardClasses} aria-disabled="true">
                  {CardContent}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
