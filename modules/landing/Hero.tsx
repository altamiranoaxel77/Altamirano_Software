/**
 * Hero — landing pública.
 *
 * Copy de carácter provisorio, escrito respetando el tono de marca
 * (claro, cercano, sin adjetivos vacíos — Kit de Marca sección 5).
 * PENDIENTE de revisión final por Copywriter Agent (MK-04), conforme
 * a la tarea pendiente #11 del handoff de origen (DEV-08 → DEV-01).
 */
export default function Hero() {
  return (
    <section id="top" className="bg-crema">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-24 md:py-32">
        <h1 className="max-w-2xl text-4xl font-bold leading-tight text-tinta md:text-5xl">
          Software a medida, con alguien que te acompaña después de entregarlo.
        </h1>
        <p className="max-w-xl text-lg text-tinta/80">
          Desarrollamos tu sitio, sistema o dashboard y seguimos ahí con mantenimiento
          continuo incluido, por una mensualidad fija. Sin sorpresas después de la entrega.
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
