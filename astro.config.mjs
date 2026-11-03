import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const reviewOnlyRoutes = new Set([
  '/',
  '/empresa/',
  '/por-que-elegirnos/',
  '/contacto/',
  '/gracias/',
  '/aviso-legal/',
  '/politica-de-privacidad/',
  '/politica-de-cookies/',
  '/service/reformas-rehabilitaciones/',
  '/service/obra-nueva/',
  '/service/obra-civil/',
]);

export default defineConfig({
  site: 'https://hucaconstructora.com',
  output: 'static',
  // Redirects are handled by public/_redirects for Netlify
  // and by src/pages/proyecto/[slug].astro for local dev
  integrations: [
    sitemap({
      filter: (page) => !reviewOnlyRoutes.has(new URL(page).pathname),
    }),
  ],
  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },
});
