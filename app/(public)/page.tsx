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
export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutSection />

        <section className="mx-auto max-w-6xl px-6 py-20">
          {/* TODO: reemplazar con datos reales del fundador antes de producción */}
          <FounderCard
            name="[Nombre del fundador — pendiente]"
            role="Fundador"
            bio="[Bio pendiente de contenido — Content Strategist / Brand Strategist Agent]"
          />
        </section>

        <Gallery />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
