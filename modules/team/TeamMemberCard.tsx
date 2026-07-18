import SocialLinks from "@/modules/shared/SocialLinks";
import type { TeamMember } from "./team.data";

interface TeamMemberCardProps {
  member: TeamMember;
}

/**
 * TeamMemberCard — tarjeta individual de un integrante del equipo.
 *
 * Muestra foto (o placeholder si no hay), nombre, rol, bio y la fila de
 * íconos de redes sociales (solo los que estén `enabled: true` en los
 * datos — ver SocialLinks.tsx). No contiene datos hardcodeados: todo
 * llega por props desde TeamSection.tsx / team.data.ts.
 */
export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const { name, role, bio, photoSrc, socialLinks } = member;

  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-crema bg-white p-8 text-center shadow-sm md:flex-row md:items-start md:text-left">
      {/* Foto o placeholder circular */}
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

      {/* Info textual + links sociales */}
      <div>
        <p className="text-lg font-semibold text-tinta">{name}</p>
        <p className="text-sm font-medium text-terracota">{role}</p>
        <p className="mt-2 text-sm text-tinta/80">{bio}</p>
        <SocialLinks links={socialLinks} className="mt-3 justify-center md:justify-start" />
      </div>
    </div>
  );
}
