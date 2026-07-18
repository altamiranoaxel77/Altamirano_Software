import type { SocialLink } from "@/lib/types/social-link";

export interface TeamMember {
  /** Identificador único, usado como key de React. Sin espacios. */
  id: string;
  name: string;
  role: string;
  bio: string;
  /** Ruta de la foto en /public. Si se omite, se muestra un placeholder. */
  photoSrc?: string;
  socialLinks: SocialLink[];
}

/**
 * Integrantes que se muestran en la sección "Nuestro equipo" de la landing.
 *
 * Para sumar un integrante nuevo: agregar un objeto más a este arreglo.
 * TeamSection.tsx ya recorre esta lista automáticamente — no hace falta
 * tocar ningún otro archivo.
 *
 * Para activar un link social: completar el `href` y cambiar `enabled`
 * a `true`. Mientras `enabled` sea `false`, el ícono no se muestra.
 */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "axel-altamirano",
    name: "Axel Altamirano",
    role: "Fundador",
    bio: "Estudiante avanzado de la Licenciatura en Sistemas de Información (UNNE). Desarrolla con Python, SQL y JavaScript. Formación en IA (AWS Certified AI Practitioner, en curso) y datos (Bootcamp Data Analyst, Devlights).",
    photoSrc: "/brand/founder-axel.jpg",
    socialLinks: [
      { platform: "linkedin", label: "LinkedIn de Axel Altamirano", href: "", enabled: false },
      { platform: "github", label: "GitHub de Axel Altamirano", href: "", enabled: false },
      { platform: "instagram", label: "Instagram de Axel Altamirano", href: "", enabled: false },
      { platform: "portfolio", label: "Portfolio de Axel Altamirano", href: "", enabled: false },
    ],
  },
  // Para el próximo integrante, copiar este bloque y completar los datos:
  // {
  //   id: "nombre-apellido",
  //   name: "Nombre Apellido",
  //   role: "Rol",
  //   bio: "Bio corta.",
  //   photoSrc: "/brand/nombre-apellido.jpg",
  //   socialLinks: [
  //     { platform: "linkedin", label: "LinkedIn de Nombre Apellido", href: "https://...", enabled: true },
  //   ],
  // },
];
