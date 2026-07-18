import { render, screen } from "@testing-library/react";
import ContactLinksList from "./ContactLinksList";
import type { SocialLink } from "@/lib/types/social-link";

const LINKS: SocialLink[] = [
  { platform: "whatsapp", label: "Escribinos por WhatsApp", href: "", displayText: "", enabled: false },
  {
    platform: "email",
    label: "Escribinos por email",
    href: "mailto:altamiranosoftware@gmail.com",
    displayText: "altamiranosoftware@gmail.com",
    enabled: true,
  },
  {
    platform: "instagram",
    label: "Seguinos en Instagram",
    href: "https://instagram.com/altamiranosoft",
    displayText: "@altamiranosoft",
    enabled: true,
  },
  { platform: "linkedin", label: "Seguinos en LinkedIn", href: "", displayText: "", enabled: false },
];

describe("ContactLinksList", () => {
  it("solo renderiza los links con enabled=true y href cargado", () => {
    render(<ContactLinksList links={LINKS} />);

    expect(screen.getByText("altamiranosoftware@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("@altamiranosoft")).toBeInTheDocument();
    expect(screen.queryByLabelText("Escribinos por WhatsApp")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Seguinos en LinkedIn")).not.toBeInTheDocument();
  });

  it("no renderiza un link enabled=true si el href está vacío", () => {
    const links: SocialLink[] = [
      { platform: "linkedin", label: "Seguinos en LinkedIn", href: "", displayText: "", enabled: true },
    ];
    render(<ContactLinksList links={links} />);
    expect(screen.queryByLabelText("Seguinos en LinkedIn")).not.toBeInTheDocument();
  });

  it("no renderiza nada (retorna null) si no hay links visibles", () => {
    const links: SocialLink[] = [
      { platform: "whatsapp", label: "Escribinos por WhatsApp", href: "", displayText: "", enabled: false },
    ];
    const { container } = render(<ContactLinksList links={links} />);
    expect(container).toBeEmptyDOMElement();
  });
});
