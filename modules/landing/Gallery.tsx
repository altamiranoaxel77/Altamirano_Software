interface GalleryItem {
  id: string;
  title: string;
  imageSrc: string;
}

/**
 * Gallery — muestra de trabajos/proyectos.
 *
 * BLOQUEADO PARCIALMENTE: no hay proyectos/capturas reales entregados
 * en este handoff. Se implementa el grid recibiendo los items por prop
 * con un arreglo vacío de ejemplo — completar con capturas reales de
 * proyectos aprobados antes del despliegue.
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <figure
                key={item.id}
                className="overflow-hidden rounded-xl border border-tinta/10 bg-white"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="aspect-video w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="p-4 text-sm font-medium text-tinta">
                  {item.title}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
