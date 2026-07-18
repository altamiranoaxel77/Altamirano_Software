import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import ContactSection from "./ContactSection";

function fillValidForm() {
  fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Axel Altamirano" } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "axel@example.com" } });
  fireEvent.change(screen.getByLabelText("Mensaje"), {
    target: { value: "Quiero cotizar un sistema para mi negocio." },
  });
}

describe("ContactSection — estados de UI", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("estado vacío: muestra el formulario con el botón habilitado y sin errores", () => {
    render(<ContactSection />);
    expect(screen.getByRole("button", { name: "Enviar mensaje" })).toBeEnabled();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("estado de carga: deshabilita el botón y muestra 'Enviando...' mientras espera la respuesta", async () => {
    let resolveFetch: (value: unknown) => void = () => {};
    (global.fetch as jest.Mock).mockReturnValue(
      new Promise((resolve) => {
        resolveFetch = resolve;
      })
    );

    render(<ContactSection />);
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Enviando..." })).toBeDisabled();
    });

    resolveFetch({ status: 200, json: async () => ({ ok: true }) });
  });

  it("estado de error: muestra el mensaje de error ante una respuesta 500", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      status: 500,
      json: async () => ({ error: "No pudimos enviar tu mensaje." }),
    });

    render(<ContactSection />);
    fillValidForm();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));
    });

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "No pudimos enviar tu mensaje. Probá nuevamente en unos minutos."
    );
  });

  it("estado de error: muestra mensaje específico ante rate limit (429)", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      status: 429,
      json: async () => ({ error: "Demasiadas solicitudes." }),
    });

    render(<ContactSection />);
    fillValidForm();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));
    });

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Muchos mensajes seguidos. Esperá unos minutos e intentá de nuevo."
    );
  });

  it("estado de éxito: muestra el mensaje de agradecimiento y oculta el formulario", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: async () => ({ ok: true }),
    });

    render(<ContactSection />);
    fillValidForm();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));
    });

    expect(await screen.findByRole("status")).toHaveTextContent("¡Gracias! Recibimos tu mensaje.");
    expect(screen.queryByRole("button", { name: "Enviar mensaje" })).not.toBeInTheDocument();
  });

  it("no envía la solicitud si el mensaje tiene menos de 10 caracteres (validación de cliente)", async () => {
    render(<ContactSection />);
    fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Axel" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "axel@example.com" } });
    fireEvent.change(screen.getByLabelText("Mensaje"), { target: { value: "corto" } });
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));

    await waitFor(() => {
      expect(screen.getByText("El mensaje debe tener al menos 10 caracteres")).toBeInTheDocument();
    });
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
