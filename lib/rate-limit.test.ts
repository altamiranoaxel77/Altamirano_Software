import { checkRateLimit } from "./rate-limit";

describe("checkRateLimit", () => {
  const REAL_NOW = Date.now;

  afterEach(() => {
    Date.now = REAL_NOW;
  });

  it("permite las primeras 3 solicitudes de la misma IP dentro de la ventana", () => {
    const ip = "1.1.1.1";
    expect(checkRateLimit(ip).allowed).toBe(true);
    expect(checkRateLimit(ip).allowed).toBe(true);
    expect(checkRateLimit(ip).allowed).toBe(true);
  });

  it("bloquea la 4ta solicitud dentro de la misma ventana de 1 minuto", () => {
    const ip = "2.2.2.2";
    checkRateLimit(ip);
    checkRateLimit(ip);
    checkRateLimit(ip);
    const fourth = checkRateLimit(ip);
    expect(fourth.allowed).toBe(false);
    expect(fourth.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("no afecta a otras IPs (los buckets son independientes)", () => {
    const ipA = "3.3.3.3";
    const ipB = "4.4.4.4";
    checkRateLimit(ipA);
    checkRateLimit(ipA);
    checkRateLimit(ipA);
    expect(checkRateLimit(ipA).allowed).toBe(false);
    expect(checkRateLimit(ipB).allowed).toBe(true);
  });

  it("resetea el contador una vez pasada la ventana de 1 minuto", () => {
    const ip = "5.5.5.5";
    let now = 1_000_000;
    Date.now = () => now;

    checkRateLimit(ip);
    checkRateLimit(ip);
    checkRateLimit(ip);
    expect(checkRateLimit(ip).allowed).toBe(false);

    // Avanzamos 61 segundos: la ventana ya venció.
    now += 61 * 1000;
    expect(checkRateLimit(ip).allowed).toBe(true);
  });
});
