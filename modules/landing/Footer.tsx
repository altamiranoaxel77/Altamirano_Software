/**
 * Footer — landing pública.
 * PENDIENTE: agregar link a Instagram (@altamiranosoft) cuando
 * Community Manager confirme la URL final del perfil.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-crema bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-tinta/60 md:flex-row">
        <p>© {year} Altamirano Software. Todos los derechos reservados.</p>
        <p>Corrientes, Argentina</p>
      </div>
    </footer>
  );
}
