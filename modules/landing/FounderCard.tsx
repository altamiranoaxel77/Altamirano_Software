interface FounderCardProps {
  name: string;
  role: string;
  bio: string;
  photoSrc?: string;
}

/**
 * FounderCard — tarjeta de presentación del fundador.
 *
 * BLOQUEADO PARCIALMENTE: el handoff no incluye nombre, foto ni bio real
 * del fundador. Se implementa el componente recibiendo estos datos por
 * props (no hardcodeados) para no inventar información de una persona real.
 * Content Strategist / Brand Strategist deben proveer estos datos antes
 * del despliegue a producción; mientras tanto se usa un valor de ejemplo
 * explícitamente marcado como placeholder.
 */
export default function FounderCard({
  name,
  role,
  bio,
  photoSrc,
}: FounderCardProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-crema bg-white p-8 text-center shadow-sm md:flex-row md:items-start md:text-left">
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full bg-crema">
        {photoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photoSrc} alt={`Foto de ${name}`} className="h-full w-full object-cover" />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-sm text-tinta/40"
            aria-hidden="true"
          >
            Foto
          </div>
        )}
      </div>
      <div>
        <p className="text-lg font-semibold text-tinta">{name}</p>
        <p className="text-sm font-medium text-terracota">{role}</p>
        <p className="mt-2 text-sm text-tinta/80">{bio}</p>
      </div>
    </div>
  );
}
