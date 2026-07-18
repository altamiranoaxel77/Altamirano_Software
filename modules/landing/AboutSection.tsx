/**
 * AboutSection — presentación de la empresa.
 * Copy final aprobado por Copywriter Agent (MK-04), ver
 * PRJ-01_Copy_Final_Landing_v1.0.
 *
 * Layout apilado (título arriba, texto abajo) — se cambió desde un
 * diseño a 2 columnas que dejaba mucho espacio vacío bajo el título
 * corto, y además queda consistente con el resto de las secciones
 * (Gallery, TeamSection), que también usan título de ancho completo.
 */
export default function AboutSection() {
  return (
    <section id="nosotros" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="mb-6 text-3xl font-bold text-tinta">Quiénes somos</h2>
      <div className="max-w-2xl space-y-4 text-tinta/80">
        <p>
          Somos una software factory con base en Corrientes, Argentina. Desarrollamos
          sitios web, sistemas administrativos, dashboards y automatizaciones a medida,
          para pymes y profesionales que buscan resultados concretos.
        </p>
        <p>
          Trabajamos con una mensualidad fija que incluye desarrollo y mantenimiento
          continuo: no te dejamos solo el día después de la entrega. Así entendemos el
          acompañamiento.
        </p>
      </div>
    </section>
  );
}
