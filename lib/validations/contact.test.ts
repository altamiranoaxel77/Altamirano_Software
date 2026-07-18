import { contactFormSchema } from "./contact";

describe("contactFormSchema", () => {
  const valid = {
    nombre: "Axel Altamirano",
    email: "axel@example.com",
    mensaje: "Quiero cotizar un sistema para mi negocio.",
    website: "",
  };

  it("acepta un payload válido", () => {
    const result = contactFormSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rechaza nombre con menos de 2 caracteres", () => {
    const result = contactFormSchema.safeParse({ ...valid, nombre: "A" });
    expect(result.success).toBe(false);
  });

  it("rechaza nombre de más de 100 caracteres", () => {
    const result = contactFormSchema.safeParse({ ...valid, nombre: "A".repeat(101) });
    expect(result.success).toBe(false);
  });

  it("rechaza email vacío", () => {
    const result = contactFormSchema.safeParse({ ...valid, email: "" });
    expect(result.success).toBe(false);
  });

  it("rechaza email con formato inválido", () => {
    const result = contactFormSchema.safeParse({ ...valid, email: "no-es-un-email" });
    expect(result.success).toBe(false);
  });

  it("rechaza mensaje con menos de 10 caracteres", () => {
    const result = contactFormSchema.safeParse({ ...valid, mensaje: "corto" });
    expect(result.success).toBe(false);
  });

  it("rechaza mensaje con más de 2000 caracteres", () => {
    const result = contactFormSchema.safeParse({ ...valid, mensaje: "a".repeat(2001) });
    expect(result.success).toBe(false);
  });

  it("acepta payload sin el campo website (honeypot opcional)", () => {
    const { website, ...withoutWebsite } = valid;
    const result = contactFormSchema.safeParse(withoutWebsite);
    expect(result.success).toBe(true);
  });

  it("acepta el honeypot vacío (usuario real)", () => {
    const result = contactFormSchema.safeParse({ ...valid, website: "" });
    expect(result.success).toBe(true);
  });

  it("rechaza el honeypot con contenido (bot) vía el propio schema", () => {
    // El schema exige max(0); cualquier contenido en "website" debe fallar
    // acá, aunque la ruta lo maneje además como caso de negocio aparte.
    const result = contactFormSchema.safeParse({ ...valid, website: "http://spam.example" });
    expect(result.success).toBe(false);
  });

  it("recorta espacios en blanco (trim) de nombre y mensaje", () => {
    const result = contactFormSchema.safeParse({
      ...valid,
      nombre: "  Axel Altamirano  ",
      mensaje: "  Quiero cotizar un sistema.  ",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.nombre).toBe("Axel Altamirano");
      expect(result.data.mensaje).toBe("Quiero cotizar un sistema.");
    }
  });
});
