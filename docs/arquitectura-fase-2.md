# Arquitectura Astro — Fase 2

## Versiones y compatibilidad

- Astro **7.4.5**, versión publicada actualmente en npm durante esta fase.
- La guía oficial de Astro exige Node.js **22.23.4 o posterior**; el proyecto se configura para Node **24.21.0** (npm **11.3.0**).
- `@astrojs/check` **0.9.12** y TypeScript **6.0.3** para validación estática.
- Se usó `npm.cmd` porque la política de PowerShell bloquea el wrapper `npm.ps1`; no se modificó la política de ejecución.

Referencias oficiales:

- [Instalar Astro](https://docs.astro.build/en/install-and-setup/)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Imágenes](https://docs.astro.build/en/guides/images/)
- [API `astro:assets`](https://docs.astro.build/en/reference/modules/astro-assets/)

## Decisiones de implementación

- Salida estática (`output: 'static'`) con `site` fijado al dominio canónico de HUCA.
- Colección de proyectos en `src/content/projects/`, registrada en `src/content.config.ts` mediante el loader oficial `glob()` y validada con Zod.
- Slug en minúsculas con guiones; los estados posibles son `draft`, `published` y `archived`. Las páginas públicas deberán filtrar solo proyectos `published`.
- Campos tipados para resumen y descripción, portada, galería, localización, tipo, año, superficie construida, datos adicionales de la ficha, destacado, orden y metadatos SEO.
- Las imágenes se expresan como rutas relativas al Markdown (por ejemplo `../../assets/projects/<slug>/cover.jpg`) y se validan con el helper `image()` de Astro Content Collections. De esta forma, Astro puede descubrir y procesar imágenes nuevas asociadas al contenido durante el build sin imports escritos manualmente por cada proyecto.
- `astro.config.mjs` habilita el layout de imagen constrained y los estilos responsive de Astro. La elección concreta de tamaños y formatos (`<Image />`/`<Picture />`, WebP/AVIF) se hará al implementar componentes y se probará en la Fase 4.

El flujo de Content Collections con `image()` se eligió frente a un manifiesto generado porque mantiene juntos el dato y la referencia relativa a su imagen y evita un script de imports innecesario. La Fase 4 ya confirmó que Astro descubre y procesa las referencias Markdown sin imports manuales. La subida desde la interfaz real de Pages CMS todavía requiere conectar el repositorio a la GitHub App.

## Alcance y limitaciones actuales

- La colección y sus validaciones ya existen, pero aún no contiene entradas ni archivos de imagen. Por eso Astro muestra el aviso esperado de que no encuentra Markdown en la colección.
- `src/pages/index.astro` es una página temporal `noindex` para verificar el build; no representa el diseño final y debe sustituirse en la Fase 5.
- No se añadió `.pages.yml`, configuración de Netlify, redirecciones ni formularios en esta fase.
