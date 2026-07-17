# Altamirano Software

Plataforma interna de Altamirano Software — Fase 1.

## Estado actual

Primer incremento: landing pública (sin sesión), implementada según el Handoff
`PRJ-01_HO_DEV01_a_DEV03_v1.0` (DEV-01 → DEV-03).

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- React Hook Form + Zod (validación de formularios)
- Nodemailer + Gmail SMTP (envío del formulario de contacto)

## Cómo correr el proyecto localmente

```bash
npm install
cp .env.example .env.local   # completar GMAIL_USER y GMAIL_APP_PASSWORD
npm run dev
```

Abrir http://localhost:3000

## Estructura

```
app/
  (public)/page.tsx     -> landing publica
  api/contact/route.ts  -> endpoint del formulario de contacto
  icon.png              -> favicon (avatar de marca)
modules/landing/         -> componentes de la landing
lib/
  email/gmail.ts         -> cliente Nodemailer
  validations/contact.ts -> esquema Zod compartido (cliente + servidor)
  rate-limit.ts          -> rate limiting basico del endpoint de contacto
public/brand/             -> assets de marca (logo)
```

## Pendientes conocidos

- Validacion visual contra el diseno de Figma (DEV-08).
- Contenido real de la seccion "Fundador" y de la galeria de trabajos.
- Revision final de copy por Copywriter Agent (MK-04).
