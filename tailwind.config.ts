import type { Config } from "tailwindcss";

/**
 * Tokens de marca — Altamirano Software
 * Fuente: Kit_de_Marca_Altamirano_v1.0 (CEO Agent / Brand Strategist Agent)
 *
 * Uso exclusivo para logo/isotipo/favicon: terracota, tinta, ámbar, crema.
 * "Oliva" es de uso exclusivo para redes sociales — NO se incluye acá
 * porque no aplica a interfaz de producto (ver Kit de Marca, sección 2).
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./modules/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terracota: "#D85A30", // Color primario de marca
        tinta: "#2C2C2A", // Texto y trazos base
        ambar: "#EF9F27", // Acento — botones, links, viñetas
        crema: "#FAECE7", // Fondo claro
      },
      fontFamily: {
        // Inter: tipografía oficial para interfaz de producto (Kit de Marca, sección 3)
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        // Fraunces: uso exclusivo de wordmark/marca, NO para texto de interfaz
        wordmark: ["var(--font-fraunces)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
