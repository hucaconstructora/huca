# Documentación del cliente — HUCA Building Solutions

## 1. Cómo acceder a Pages CMS

1. Abre tu navegador y visita: **https://app.pagescms.org**
2. Pulsa **"Continuar con email"** (no necesitas cuenta de GitHub).
3. Recibirás un enlace de acceso en tu correo electrónico.
4. Pulsa el enlace para entrar.
5. Verás el repositorio **hucaconstructora/huca** y la colección **Proyectos**.

> El propietario del repositorio instala la aplicación Pages CMS y envía la invitación por email. Tú no necesitas crear una cuenta de GitHub.

## 2. Cómo crear un proyecto

1. Entra en Pages CMS con tu invitación.
2. Selecciona la colección **Proyectos**.
3. Pulsa **"Crear nuevo"** (o el botón equivalente).
4. Rellena los campos:
   - **Título del proyecto** (obligatorio).
   - **URL del proyecto (slug)** (obligatorio): minúsculas, números y guiones, sin espacios ni barras. Ejemplo: `reforma-vivienda-barcelona`.
   - **Descripción corta** (obligatorio): texto breve para tarjetas y buscadores.
   - **Descripción completa** (obligatorio): texto principal de la ficha.
   - **Reto del cliente** (opcional): retos del proyecto.
   - **Enfoque y solución** (opcional): cómo se resolvió el proyecto.
   - **Imagen principal** (obligatorio): selecciona o sube la foto de portada.
   - **Texto alternativo de la imagen principal** (obligatorio): describe la foto.
   - **Galería de fotografías** (obligatorio, mínimo 1, máximo 24): añade una o varias fotos con su texto alternativo.
   - **Localización** (obligatorio): dirección o zona.
   - **Región o provincia** (opcional).
   - **Ciudad o municipio** (opcional).
   - **Tipo de proyecto** (obligatorio): Ej. Reforma, Obra nueva, Obra civil.
   - **Año de finalización** (obligatorio).
   - **Superficie construida (m²)** (opcional).
   - **Cliente** (opcional).
   - **Presupuesto** (opcional).
   - **Sector** (opcional).
   - **Subsector** (opcional).
   - **Estado de publicación**: elige **Borrador**, **Publicado** o **Retirado**.
   - **Proyecto destacado**: marca si quieres que aparezca destacado.
   - **Orden de aparición**: número para ordenar los proyectos.
   - **Título SEO** (opcional).
   - **Descripción SEO** (opcional).

5. Pulsa **"Guardar"**. Los cambios se guardan automáticamente en GitHub.

## 3. Cómo subir fotografías

1. En el campo de imagen (principal o galería), pulsa el botón de subir o seleccionar.
2. Elige una imagen de tu ordenador (formatos: JPG, JPEG, PNG, WebP o AVIF).
3. La imagen se guardará en la carpeta `src/assets/projects/` del repositorio.
4. Escribe el texto alternativo correspondiente.
5. Pulsa **"Guardar"**.

> Las fotos se optimizan automáticamente durante la compilación de la web. No necesitas cambiar su tamaño antes de subirlas.

## 4. Cómo editar proyectos existentes

1. Entra en Pages CMS y selecciona la colección **Proyectos**.
2. Haz clic en el proyecto que quieres modificar.
3. Cambia los textos, fotos o metadatos que necesites.
4. Pulsa **"Guardar"**.

> El archivo físico no se renombra cuando cambias el slug. El slug controla la URL de la web.

## 5. Cómo retirar proyectos

1. Abre el proyecto en Pages CMS.
2. En el campo **Estado de publicación**, cambia a **Retirado**.
3. Pulsa **"Guardar"**.

El proyecto dejará de aparecer en el listado de proyectos. La URL antigua seguirá redirigiendo a la página de proyectos.

## 6. Cómo comprobar que la web se ha actualizado

1. Después de guardar cambios en Pages CMS, espera unos minutos para que Netlify compile la web.
2. Visita **https://hucaconstructora.com** y comprueba que el proyecto aparece.
3. Si no se actualiza en 5 minutos, contacta con el soporte técnico.

## 7. Cómo funciona la arquitectura

```
CLIENTE
  |
  v
Pages CMS
  |
  | Guarda contenido y fotos
  v
GitHub
  |
  | Commit automático
  v
Netlify
  |
  | Ejecuta el build
  v
Astro
  |
  | Procesa contenido e imágenes
  v
WEB PUBLICADA
```

- El cliente entra en Pages CMS con su invitación por email.
- No necesita cuenta de GitHub.
- Los cambios se guardan en el repositorio de GitHub automáticamente.
- Netlify detecta el cambio y recompila la web.
- Astro optimiza las imágenes y genera la web estática.

## 8. Cómo añadir nuevos campos al CMS

1. Abre el archivo `.pages.yml` en el repositorio.
2. Añade el nuevo campo en la sección `fields` de la colección `projects`.
3. Actualiza el esquema de Astro en `src/content.config.ts`.
4. Haz commit de los cambios.
5. Netlify recompilará la web automáticamente.

> Solo el propietario del repositorio puede modificar `.pages.yml`.

## 9. Cómo realizar mantenimiento técnico

- **Actualizar dependencias**: ejecutar `npm update` y revisar cambios.
- **Validar el proyecto**: ejecutar `npm run check`.
- **Compilar localmente**: ejecutar `npm run build`.
- **Verificar imágenes**: comprobar que las fotos nuevas se guardan en `src/assets/projects/`.
- **Revisar sitemap**: comprobar `dist/sitemap-index.xml` después del build.
- **Probar formulario**: enviar un mensaje de prueba desde la web publicada.

## Notas importantes

- La web se publica automáticamente al guardar cambios en Pages CMS.
- No es necesario ejecutar comandos manuales para publicar.
- Las imágenes se optimizan durante la compilación (WebP/AVIF).
- El cliente no tiene acceso al código fuente ni a la configuración técnica.
- El servicio Pages CMS es gratuito actualmente, pero las condiciones pueden cambiar.
