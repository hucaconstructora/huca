# HUCA Building Solutions — Web Corporativa

[![Netlify Status](https://api.netlify.com/api/v1/badges/a550136f-1ecc-4454-b574-bba3af390c49/deploy-status)](https://app.netlify.com/projects/hucaconstructora/deploys)

Web corporativa de [HUCA Building Solutions S.L.](https://hucaconstructora.com), empresa de construcción con sede en Barcelona, especializada en obra civil y reformas integrales.

## 🏗️ Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| [Astro](https://astro.build) | 7.4.5 | Framework SSG |
| [TypeScript](https://typescriptlang.org) | 6.0.3 | Tipado estático |
| [Netlify](https://netlify.com) | — | Hosting y CI/CD |
| [Pages CMS](https://pagescms.org) | — | CMS headless (Git-based) |
| [Leaflet](https://leafletjs.com) | 1.9.4 | Mapas interactivos |
| [Remix Icons](https://remixicon.com) | 4.9.1 | Iconografía |
| [@fontsource](https://fontsource.org) | 5.3.0 | Tipografías (Barlow, DM Sans) |

## 📁 Estructura del proyecto

```
src/
├── assets/
│   ├── projects/          # Imágenes de proyectos
│   ├── services/          # Imágenes de servicios
│   └── site/              # Logos, patrones, imágenes de hero
├── components/            # Componentes Astro reutilizables
├── content/
│   ├── projects/          # Proyectos en Markdown
│   └── services/          # Servicios en Markdown
├── data/                  # Datos de empresa (company.ts)
├── layouts/               # Layouts (MainLayout.astro)
├── pages/                 # Páginas y rutas
│   ├── proyectos/         # Listado y detalle de proyectos
│   ├── service/           # Detalle de servicios
│   └── ...                # Resto de páginas
├── styles/                # CSS global
└── content.config.ts      # Esquema de colecciones (Zod)
```

## 🚀 Desarrollo local

### Requisitos

- Node.js 24+
- npm 11+

### Instalación

```bash
npm install
```

### Comandos

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo (localhost:4321) |
| `npm run build` | Build de producción |
| `npm run preview` | Preview del build |
| `npm run check` | Verificación de tipos TypeScript |

## 📝 Gestión de contenido

El contenido se gestiona a través de **Pages CMS**, que genera commits en GitHub automáticamente.

### Colecciones

- **projects**: Proyectos con 24 campos (título, slug, tipo, ubicación, fecha, superficie, cliente, descripción, galería de imágenes, etc.)
- **services**: Servicios con campos de título, descripción, imagen, orden, etc.

### Añadir un proyecto

1. Accede a Pages CMS con tu invitación por email.
2. Crea un nuevo proyecto en la colección "Proyectos".
3. Sube las imágenes (se guardan en `src/assets/projects/`).
4. Publica → se genera un commit → Netlify despliega automáticamente.

### Añadir un servicio

1. Accede a Pages CMS.
2. Crea un nuevo servicio en la colección "Servicios".
3. Sube la imagen de portada.
4. Publica.

## 🎨 Diseño

- **Color principal**: `#8FC1B4` (verde agua)
- **Fuentes**: Barlow (cuerpo), DM Sans (encabezados)
- **Iconos**: Remix Icons 4.9.1
- **Logos**: SVG vectoriales
- **Container**: 1440px máximo
- **Responsive**: Mobile-first con breakpoints en 1200px, 1023px y 560px

## 🔍 SEO

- Meta tags (title, description, canonical, OG, Twitter Card)
- JSON-LD: LocalBusiness, WebSite, BreadcrumbList, Service
- Sitemap XML automático (`@astrojs/sitemap`)
- Redirects 301 desde WordPress (`public/_redirects`)
- Robots.txt
- Open Graph images

## 📄 Páginas

| Página | Ruta | Descripción |
|---|---|---|
| Inicio | `/` | Hero, bienvenida, valores, servicios, proyectos |
| Proyectos | `/proyectos/` | Listado con filtros por tipo |
| Proyecto | `/proyectos/[slug]/` | Detalle con galería |
| Servicios | `/servicios/` | Listado de servicios |
| Servicio | `/service/[slug]/` | Detalle del servicio |
| Empresa | `/empresa/` | Quiénes somos |
| Por qué elegirnos | `/por-que-elegirnos/` | Valores y principios |
| Contacto | `/contacto/` | Formulario, equipo, mapa |
| Aviso legal | `/aviso-legal/` | Texto legal (pendiente) |
| Privacidad | `/politica-de-privacidad/` | Política de privacidad (pendiente) |
| Cookies | `/politica-de-cookies/` | Política de cookies (pendiente) |
| 404 | `/404` | Página no encontrada |

## 🚢 Despliegue

El despliegue es automático en Netlify:

1. Push a `develop` → Netlify detecta el cambio.
2. Build: `npm run build` (Node 24).
3. Deploy a producción.

### Configuración Netlify

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 24

## 📚 Documentación

- [`docs/auditoria-fase-1.md`](docs/auditoria-fase-1.md) — Auditoría de la web WordPress original
- [`docs/pages-cms-fase-3.md`](docs/pages-cms-fase-3.md) — Configuración de Pages CMS
- [`docs/imagenes-fase-4.md`](docs/imagenes-fase-4.md) — Pipeline de imágenes
- [`docs/contenido-fase-5.md`](docs/contenido-fase-5.md) — Migración de contenido
- [`docs/arquitectura-fase-2.md`](docs/arquitectura-fase-2.md) — Arquitectura del sistema
- [`docs/cliente.md`](docs/cliente.md) — Guía para el cliente
- [`docs/tecnico.md`](docs/tecnico.md) — Documentación técnica

## 📋 Estado del proyecto

- ✅ Fase 1: Auditoría WordPress
- ✅ Fase 2: Proyecto Astro con colecciones
- ✅ Fase 3: Configuración Pages CMS
- ✅ Fase 4: Imágenes y assets
- ✅ Fase 5: Diseño completo
- ✅ Fase 6: Netlify y redirects
- ✅ Fase 7: SEO completo
- ✅ Fase 8: Documentación
- ⏳ Pendiente: Textos legales aprobados
- ⏳ Pendiente: Secciones con datos verificados (proceso, premios, testimonios)

## 🔗 Enlaces

- **Web**: [hucaconstructora.com](https://hucaconstructora.com)
- **CMS**: Pages CMS (acceso por invitación)
- **Repositorio**: GitHub (público)

## 📄 Licencia

Proyecto privado. Todos los derechos reservados © HUCA Building Solutions S.L.