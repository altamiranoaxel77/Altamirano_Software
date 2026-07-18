import TeamMemberCard from "./TeamMemberCard";
import { TEAM_MEMBERS } from "./team.data";

/**
 * TeamSection — sección "Nuestro equipo" de la landing pública.
 *
 * Recorre TEAM_MEMBERS (team.data.ts) y renderiza una TeamMemberCard por
 * cada integrante, sin límite de cantidad. Con un solo integrante se ve
 * como una tarjeta centrada (grid de 1 columna); al agregar más nombres a
 * team.data.ts pasa automáticamente a grilla de 2 columnas, sin tocar
 * este archivo.
 *
 * IMPORTANTE — pendiente de coordinación con DEV-08: el diseño validado
 * en el handoff de origen (PRJ-01_HO_DEV08_a_DEV01) especificaba la
 * tarjeta del fundador como pieza única, sin grilla, en ningún breakpoint.
 * Mientras haya un solo integrante esto se respeta. Al sumar el segundo,
 * esta sección pasa a mostrarse en grilla — hay que re-validar ese layout
 * con DEV-08 antes de sumar el segundo integrante en producción.
 */
export default function TeamSection() {
  // Si no hay integrantes cargados, no se renderiza la sección.
  if (TEAM_MEMBERS.length === 0) return null;

  const isSingleMember = TEAM_MEMBERS.length === 1;

  return (
    <section id="equipo" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="mb-10 text-3xl font-bold text-tinta">Nuestro equipo</h2>
      <div className={`grid gap-6 ${isSingleMember ? "grid-cols-1" : "sm:grid-cols-2"}`}>
        {TEAM_MEMBERS.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}
