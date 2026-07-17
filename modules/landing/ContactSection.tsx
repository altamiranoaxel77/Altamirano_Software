"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact";

/**
 * ContactSection — formulario de contacto.
 *
 * Consume POST /api/contact (contrato documentado en
 * PRJ-01_HO_DEV01_a_DEV03, sección 6). Implementa los 4 estados de UI
 * requeridos: vacío, carga, error, éxito — mismo patrón que el login
 * de DEV-08.
 *
 * Incluye campo honeypot ("website") oculto visualmente pero accesible
 * a bots, con tabIndex=-1 y autoComplete="off" para no interferir con
 * navegación por teclado de usuarios reales.
 */
type SubmitState = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { nombre: "", email: "", mensaje: "", website: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitState("loading");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.status === 200) {
        setSubmitState("success");
        reset();
        return;
      }

      if (response.status === 429) {
        setErrorMessage("Muchos mensajes seguidos. Esperá unos minutos e intentá de nuevo.");
        setSubmitState("error");
        return;
      }

      if (response.status === 400) {
        setErrorMessage("Revisá los datos ingresados e intentá nuevamente.");
        setSubmitState("error");
        return;
      }

      setErrorMessage("No pudimos enviar tu mensaje. Probá nuevamente en unos minutos.");
      setSubmitState("error");
    } catch {
      setErrorMessage("No pudimos conectarnos. Revisá tu conexión e intentá de nuevo.");
      setSubmitState("error");
    }
  };

  return (
    <section id="contacto" className="mx-auto max-w-2xl px-6 py-20">
      <h2 className="mb-2 text-3xl font-bold text-tinta">Contanos tu proyecto</h2>
      <p className="mb-8 text-tinta/70">
        Te respondemos a la brevedad. Sin compromiso.
      </p>

      {submitState === "success" ? (
        <div
          role="status"
          className="rounded-xl border border-ambar/40 bg-ambar/10 p-6 text-tinta"
        >
          <p className="font-semibold">¡Gracias! Recibimos tu mensaje.</p>
          <p className="mt-1 text-sm text-tinta/70">Te vamos a responder a la brevedad.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          {/* Honeypot — invisible para personas, visible para bots */}
          <div className="absolute left-[-9999px]" aria-hidden="true">
            <label htmlFor="website">No completar este campo</label>
            <input
              id="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("website")}
            />
          </div>

          <div>
            <label htmlFor="nombre" className="mb-1 block text-sm font-medium text-tinta">
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              autoComplete="name"
              className="w-full rounded-lg border border-tinta/20 px-4 py-2.5 text-tinta focus-visible:border-ambar"
              aria-invalid={!!errors.nombre}
              aria-describedby={errors.nombre ? "nombre-error" : undefined}
              {...register("nombre")}
            />
            {errors.nombre && (
              <p id="nombre-error" className="mt-1 text-sm text-terracota">
                {errors.nombre.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-tinta">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full rounded-lg border border-tinta/20 px-4 py-2.5 text-tinta focus-visible:border-ambar"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-terracota">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="mensaje" className="mb-1 block text-sm font-medium text-tinta">
              Mensaje
            </label>
            <textarea
              id="mensaje"
              rows={5}
              className="w-full rounded-lg border border-tinta/20 px-4 py-2.5 text-tinta focus-visible:border-ambar"
              aria-invalid={!!errors.mensaje}
              aria-describedby={errors.mensaje ? "mensaje-error" : undefined}
              {...register("mensaje")}
            />
            {errors.mensaje && (
              <p id="mensaje-error" className="mt-1 text-sm text-terracota">
                {errors.mensaje.message}
              </p>
            )}
          </div>

          {submitState === "error" && errorMessage && (
            <p role="alert" className="text-sm text-terracota">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={submitState === "loading"}
            className="w-full rounded-full bg-terracota px-6 py-3 text-base font-semibold text-white transition hover:bg-terracota/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitState === "loading" ? "Enviando..." : "Enviar mensaje"}
          </button>
        </form>
      )}
    </section>
  );
}
