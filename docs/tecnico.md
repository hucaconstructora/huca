# Documentación técnica — HUCA Building Solutions

## 1. Configuración del proyecto

### Requisitos
- Node.js >= 24.0.0 (recomendado 24.21.0 o superior)
- npm >= 11.0.0 (recomendado 11.3.0 o superior)

### Comandos
```bash
npm install          # Instalar dependencias
npm run dev          # Servidor de desarrollo (localhost:4321)
npm run check        # Validar tipos y contenido (Astro check)
npm run build        # Compilar la web estática (genera dist/)
npm run preview      # Vista previa de la build
```

### Archivos de configuración
- `astro.config.mjs` — Configuración de Astro (site, redirects, sitemap, imágenes).
- `tsconfig.json` — Configuración de TypeScript (extends astro/tsconfigs/strict).
- `package.json` — Dependencias y scripts.
- `.pages.yml` — Configuración de Pages CMS.
- `netlify.toml` — Configuración de Netlify (build command, publish dir).
- `public/_redirects` — Redirecciones de Netlify.
- `public/robots.txt` — Robots.txt con sitemap.

## 2. Arquitectura

```
CLIENTE → Pages CMS → GitHub → Netlify → Astro → Web publicada
```

- **Astro** genera una web estática en `dist/`.
- **Pages CMS** permite al cliente editar proyectos sin cuenta de GitHub.
- **GitHub** almacena el código y los contenidos (Markdown + imágenes).
- **Netlify** ejecuta `npm run build` automáticamente al detectar cambios en GitHub.
- Las imágenes se optimizan durante el build con `astro:assets`.

## 3. Estructura del proyecto

```
src/
  content/
    projects/          # Colección de proyectos (Markdown con frontmatter)
    services/          # Colección de servicios (Markdown con frontmatter)
  content.config.ts    # Esquema de colecciones (Zod)
  assets/
    projects/          # Imágenes de proyectos (gestionadas por Pages CMS)
    services/          # Imágenes de servicios (estáticas)
    site/              # Imágenes de sitio (logo, hero, patrones)
    fonts/             # Fuentes autoalojadas (Barlow, DM Sans)
  components/          # Componentes Astro reutilizables
  data/                # Datos estáticos (company.ts)
  layouts/             # Layouts (MainLayout.astro)
  pages/               # Rutas de la web
  styles/              # CSS global
  env.d.ts             # Tipos de Astro
```

## 4. Colecciones de contenido

### Proyectos (`src/content/projects/`)
- Loader: `glob()` con patrón `**/*.md`.
- Esquema validado con Zod en `src/content.config.ts`.
- Imágenes referenciadas como rutas relativas al Markdown (`../../assets/projects/...`).
- Astro resuelve las imágenes con el helper `image()` automáticamente.
- Campos: title, slug, summary, description, challenge, approach, cover, coverAlt, gallery, location, region, city, projectType, year, builtAreaM2, client, budget, sector, subSector, status, featured, order, seoTitle, seoDescription.

### Servicios (`src/content/services/`)
- Loader: `glob()` con patrón `**/*.md`.
- Esquema validado con Zod.
- Imágenes estáticas en `src/assets/services/`.
- Campos: title, slug, tagline, description, details, includes, cover, coverAlt, order.

## 5. Configuración de Pages CMS (`.pages.yml`)

### Media
- `input: src/assets/projects` — Carpeta donde se guardan las fotos subidas.
- `output: ../../assets/projects` — Ruta relativa escrita en el frontmatter del Markdown.
- Extensiones permitidas: jpg, jpeg, png, webp, avif.
- Renombrado aleatorio (`rename: random`) para evitar colisiones.

### Colección de proyectos
- Path: `src/content/projects`
- Formato: `yaml-frontmatter`
- Filename: `{slug}.md`
- Operaciones: crear (true), renombrar (false), eliminar (false).
- 24 campos con etiquetas en español.
- Estado: borrador, publicado, retirado.
- Galería: 1 a 24 imágenes, cada una con texto alternativo.

### Settings
- `commit.identity: app` — Los commits usan la identidad de la GitHub App.

## 6. Optimización de imágenes

- Todas las imágenes se almacenan en el repositorio (`src/assets/`).
- Astro procesa las imágenes durante el build con `astro:assets`.
- Formatos generados: AVIF y WebP (fallback WebP).
- Tamaños responsivos: 320px, 480px, 640px, 768px, 960px, 1024px, 1200px, 1440px.
- Lazy loading automático en imágenes por debajo del fold.
- Textos alternativos descriptivos en todos los componentes.

### Descubrimiento dinámico
- No se usan imports manuales por proyecto.
- El helper `image()` de Astro Content Collections resuelve las rutas relativas del Markdown automáticamente.
- Cuando Pages CMS sube una nueva imagen, la ruta se escribe en el frontmatter y Astro la procesa en el siguiente build.

## 7. SEO

- Meta title y description por página.
- Canonical URLs.
- Open Graph (og:title, og:description, og:image, og:url).
- Twitter Cards.
- JSON-LD (Organization).
- Sitemap XML (`@astrojs/sitemap`).
- Robots.txt con referencia al sitemap.
- Redirecciones 301 desde URLs antiguas de WordPress (`/proyecto/*` → `/proyectos/*`).
- Noindex en páginas de revisión (placeholder, legal, agradecimiento).

## 8. Formulario de contacto

- Netlify Forms con `data-netlify="true"`.
- Campos: nombre, email, teléfono, mensaje, consentimiento de privacidad.
- Honeypot para protección contra spam.
- Mensajes de éxito/error con JavaScript.
- Redirección a `/gracias/` tras envío.

## 9. Despliegue en Netlify

### Configuración
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 24
- Archivo: `netlify.toml`

### Flujo
1. Pages CMS guarda cambios en GitHub.
2. Netlify detecta el push y ejecuta `npm run build`.
3. Astro compila la web estática.
4. Netlify publica la nueva versión.

## 10. Seguridad y permisos

- Pages CMS usa GitHub App con permisos mínimos para colaboradores.
- Colaboradores (email) pueden editar contenido y media, pero no `.pages.yml` ni administrar colaboradores.
- Las extensiones de imagen se restringen a JPG, JPEG, PNG, WebP y AVIF.
- No se exponen credenciales en el repositorio.
- No hay base de datos externa para contenido.

## 11. Limitaciones y costes

- Pages CMS: gratuito actualmente ( MIT license, open source).
- GitHub: plan gratuito.
- Netlify: plan gratuito (con límites de build minutes y bandwidth).
- Las condiciones de los planes gratuitos pueden cambiar.
- No se añaden servicios de pago sin autorización.

## 12. Mantenimiento

- **Validar**: `npm run check`
- **Compilar**: `npm run build`
- **Desarrollo**: `npm run dev`
- **Actualizar dependencias**: `npm update` (revisar cambios)
- **Añadir campos al CMS**: modificar `.pages.yml` y `src/content.config.ts`
- **Añadir páginas**: crear archivo en `src/pages/`
- **Añadir componentes**: crear archivo en `src/components/`
