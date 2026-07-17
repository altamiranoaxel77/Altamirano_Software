/**
 * AboutSection — presentación de la empresa.
 * Copy provisorio basado en Kit_de_Marca_Altamirano_v1.0 (sección 1).
 * PENDIENTE de revisión final por Copywriter Agent (MK-04).
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
            sitios web, sistemas administrativos, dashboards y automatizaciones a medida
            para pymes y profesionales.
          </p>
          <p>
            Trabajamos bajo un modelo de mensualidad fija que incluye desarrollo y
            mantenimiento continuo: no te dejamos solo el día después de la entrega.
          </p>
        </div>
      </div>
    </section>
  );
}
