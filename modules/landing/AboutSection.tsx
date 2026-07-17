/**
 * AboutSection — presentación de la empresa.
 * Copy final aprobado por Copywriter Agent (MK-04), ver
 * PRJ-01_Copy_Final_Landing_v1.0.
 */
export default function AboutSection() {
  return (
    <section id="nosotros" className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="text-3xl font-bold text-tinta">Quiénes somos</h2>
        </div>
        <div className="space-y-4 text-tinta/80">
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
      </div>
    </section>
  );
}
