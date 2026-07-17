import Header from "@/modules/landing/Header";
import Hero from "@/modules/landing/Hero";
import AboutSection from "@/modules/landing/AboutSection";
import FounderCard from "@/modules/landing/FounderCard";
import Gallery from "@/modules/landing/Gallery";
import ContactSection from "@/modules/landing/ContactSection";
import Footer from "@/modules/landing/Footer";

/**
 * Landing pública (logged-out) — Primer Incremento, PRJ-01.
 *
 * Server Component: no requiere sesión ni llamadas a Supabase Auth,
 * conforme a la decisión técnica del handoff (sección 5).
 *
 * La sección oculta "Software Inteligente" queda fuera de alcance de
 * este incremento — se implementa junto al Middleware en el handoff
 * del panel/login (handoff sección 4).
 */

// Proyectos de la galería. Completar `href` cuando el proyecto esté
// desplegado en producción — mientras tanto la card se muestra como
// "Próximamente" (ver modules/landing/Gallery.tsx).
const PROJECT_ITEMS = [
  {
    id: "mediturnos",
    title: "MediTurnos",
    description: "Gestión de turnos médicos, simple y a medida.",
    imageSrc: "/projects/mediturnos.jpg",
    href: "", // TODO: completar con la URL de producción cuando esté disponible
  },
];

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutSection />

        <section className="mx-auto max-w-6xl px-6 py-20">
          <FounderCard
            name="Axel Altamirano"
            role="Fundador"
            bio="Estudiante avanzado de la Licenciatura en Sistemas de Información (UNNE). Desarrolla con Python, SQL y JavaScript. Formación en IA (AWS Certified AI Practitioner, en curso) y datos (Bootcamp Data Analyst, Devlights)."
            photoSrc="/brand/founder-axel.jpg"
          />
        </section>

        <Gallery items={PROJECT_ITEMS} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
