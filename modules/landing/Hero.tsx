/**
 * Hero — landing pública.
 * Copy final aprobado por Copywriter Agent (MK-04), ver
 * PRJ-01_Copy_Final_Landing_v1.0 (respuesta a PRJ-01_HO_DEV03_a_MK04_v1.0).
 */
export default function Hero() {
  return (
    <section id="top" className="bg-crema">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-24 md:py-32">
        <h1 className="max-w-2xl text-4xl font-bold leading-tight text-tinta md:text-5xl">
          Software a medida, con acompañamiento real después de la entrega.
        </h1>
        <p className="max-w-xl text-lg text-tinta/80">
          Desarrollamos tu sitio, sistema o dashboard y seguimos ahí después: mantenimiento
          incluido en una mensualidad fija, sin pago aparte por el desarrollo.
        </p>
        <a
          href="#contacto"
          className="rounded-full bg-ambar px-8 py-3 text-base font-semibold text-tinta transition hover:bg-ambar/90"
        >
          Contanos tu proyecto
        </a>
      </div>
    </section>
  );
}
