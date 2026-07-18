import {
  Linkedin,
  Github,
  Instagram,
  Globe,
  Mail,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import type { SocialPlatform } from "@/lib/types/social-link";

/**
 * Mapa de plataforma -> componente de ícono (lucide-react).
 *
 * Nota: lucide-react son íconos genéricos (líneas), no los logos de marca
 * oficiales de cada red. Para WhatsApp se usa un ícono de globo de chat
 * (MessageCircle) porque lucide no incluye el logo real de WhatsApp. Si
 * más adelante hace falta el logo exacto de alguna red, reemplazar acá
 * por un SVG de marca sin tocar el resto del código (SocialLinks.tsx no
 * necesita cambios).
 */
const ICONS_BY_PLATFORM: Record<SocialPlatform, LucideIcon> = {
  linkedin: Linkedin,
  github: Github,
  instagram: Instagram,
  portfolio: Globe,
  whatsapp: MessageCircle,
  email: Mail,
};

/** Devuelve el componente de ícono correspondiente a una plataforma dada. */
export function getSocialIcon(platform: SocialPlatform): LucideIcon {
  return ICONS_BY_PLATFORM[platform];
}
