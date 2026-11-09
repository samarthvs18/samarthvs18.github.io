# Samarth Vamshy S. — Portfolio

Redesigned with Next.js App Router, TypeScript, and static export for GitHub Pages.

## Development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```
The static site is generated in `out/`.

## EmailJS
The existing working EmailJS integration is preserved:
- Public key: `DVtOk3W0YSnV5gNfc`
- Service ID: `service_4oythfg`
- Template ID: `template_d6siy2g`
- Form field names: `from_name`, `from_email`, `subject`, `message`

The contact form uses `emailjs.sendForm` with the same service, template, and field names as the previous implementation.

## Deployment
Pull requests run type-check and build validation. GitHub Pages deployment runs only from `main`; feature branch pushes do not replace the live site.
