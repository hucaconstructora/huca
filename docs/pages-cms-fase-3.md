# Pages CMS — Fase 3

**Documentación revisada:** Pages CMS 2.x, el 3 de noviembre de 2026.  
**Configuración local:** `.pages.yml` en la raíz del repositorio.

## Compatibilidad con el flujo solicitado

- La documentación vigente define `.pages.yml` con `media`, `content`, `settings` y opciones de colección; no se usó el formato antiguo de configuración.
- La persona propietaria del repositorio inicia Pages CMS e instala la GitHub App. Después puede invitar al cliente por email como **collaborator**; la documentación indica que el colaborador no necesita cuenta de GitHub.
- Un collaborator puede editar contenido y medios, pero no administrar `.pages.yml`, invitar a otros colaboradores ni usar funciones de administración de caché.
- El contenido se escribe directamente en GitHub mediante la GitHub App. En `.pages.yml` se dejó `settings.commit.identity: app`.
- Pages CMS mantiene datos operativos (autenticación, colaboradores y caché) en su servicio, pero su documentación indica que **el contenido permanece en GitHub**. No se añade una base de datos de proyectos a Astro.
- La web oficial anuncia que el servicio alojado y el software son gratuitos actualmente. No se encontró un límite de uso publicado en la documentación consultada; esto no garantiza que las condiciones no cambien.

Referencias oficiales:

- [Quick start](https://pagescms.org/docs/quick-start/)
- [Configuración `.pages.yml`](https://pagescms.org/docs/configuration/)
- [Media y rutas de archivos](https://pagescms.org/docs/configuration/media/)
- [Colecciones y campos](https://pagescms.org/docs/configuration/content/)
- [Campo de imagen](https://pagescms.org/docs/configuration/fields/image/)
- [Colaboradores por email y permisos](https://pagescms.org/docs/configuration/collaborators/)
- [Base de datos operativa de Pages CMS](https://pagescms.org/docs/development/database/)
- [Plan gratuito anunciado por Pages CMS](https://pagescms.org/)

## Configuración del cliente

`.pages.yml` presenta una colección única llamada **Proyectos**, con campos de título, slug, descripción breve/completa, portada, galería con textos alternativos, localización, tipo, año, superficie, metadatos adicionales, estado, destacado, orden y SEO.

- El cliente puede crear entradas y editar las existentes.
- La colección permite una galería de 1 a 24 fotos; cada foto tiene su texto alternativo.
- El estado usa `Borrador`, `Publicado` o `Retirado`. Las entradas nuevas empiezan en borrador.
- Se permite retirar mediante estado, pero no borrar permanentemente desde el CMS (`operations.delete: false`) para evitar perder una URL sin tratamiento. La página y las reglas de redirección para proyectos retirados se implementarán en las fases de rutas/SEO.
- No se permite renombrar archivos de contenido desde la operación de colección; el cliente puede cambiar el campo visible **URL del proyecto (slug)**.
- Las fotos se guardan en `src/assets/projects/`. Se permiten JPG, JPEG, PNG, WebP y AVIF; SVG y documentos quedan excluidos.

La carpeta de medios es plana dentro de `src/assets/projects/`. Pages CMS configura una única ruta de `input` para la colección y no ofrece en esta configuración una carpeta dinámica distinta por slug. Las imágenes se renombran de forma aleatoria para no sobrescribir accidentalmente dos archivos con el mismo nombre; el cliente elige la foto desde la biblioteca y rellena su texto alternativo.

## Rutas de imágenes para Astro

La configuración usa `media.input: src/assets/projects` y `media.output: ../../assets/projects`. Pages CMS documenta `input` como carpeta del repositorio y `output` como la ruta que se escribe en el contenido. La versión actual del código de Pages CMS permite rutas de `output` relativas; el mapeo produce referencias como `../../assets/projects/<archivo>` en `src/content/projects/<slug>.md`.

Astro Content Collections resuelve esas rutas relativas con `image()` y las transforma desde `src/` durante el build. No hay imports escritos uno a uno. Se probará la subida real de una nueva imagen una vez que el repositorio esté conectado a Pages CMS.

## Pruebas y límites de verificación

- Se comprobó que `.pages.yml` se puede leer como YAML y que contiene una sola colección `projects`, el directorio de medios esperado y la configuración de commits de la GitHub App.
- `npm.cmd run check` y `npm.cmd run build` completaron correctamente después de añadir `.pages.yml` y ajustar el esquema.
- No se pudo probar el login, instalación de la GitHub App, invitación a un cliente, guardado de commit ni subida desde la interfaz: el repositorio aún no está conectado a una instalación de Pages CMS y no se han proporcionado acceso administrativo ni email de invitación.
- Un propietario con acceso de administración debe conectar el repositorio e invitar al cliente desde Pages CMS. Esa acción no está almacenada en `.pages.yml`.
