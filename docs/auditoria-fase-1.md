# Auditoría de HUCA — Fase 1

**Fecha de revisión:** 3 de noviembre de 2026  
**Alcance:** sitio público `https://hucaconstructora.com`, sitemap, `robots.txt` y páginas enlazadas.  
**Estado:** auditoría completada; no se ha iniciado la implementación de Astro.

## Resumen ejecutivo

- La web pública utiliza WordPress con el tema actual y Elementor.
- La portada `/` es actualmente el listado de proyectos (la página de WordPress tiene slug `proyectos`). **No hay una portada corporativa independiente**, ni páginas públicas de Empresa/Quiénes somos o de listado de Servicios.
- La navegación visible tiene dos enlaces: **Proyectos** y **Contacto**. El teléfono de contacto aparece en la cabecera.
- El diseño publicado de HUCA es en español y usa como color de marca principal el verde agua `#8FC1B4`. La referencia visual facilitada está en inglés, usa naranja `#F45B1E` y tiene más secciones y enlaces. Sirve como referencia del tema, pero **no es una reproducción del contenido actual de HUCA**.
- Hay tres páginas de servicios publicadas que parecen conservar contenido de demostración en inglés, referencias a “Mountjoy” y datos de contacto ajenos a HUCA. No conviene migrar ese texto como contenido real sin validación.
- La estructura general del portfolio y sus imágenes sí están publicadas: dos proyectos, cada uno con galería y ficha.

## Inventario de rutas públicas

El sitemap de WordPress (`/wp-sitemap.xml`) anuncia las siguientes páginas editoriales:

| Tipo | URL actual | Contenido observado |
|---|---|---|
| Portada/listado | `/` | Página “Proyectos”; listado filtrable con dos tarjetas. Título HTML: `HUCA – Building Solutions`. |
| Contacto | `/contacto/` | Presentación, datos de dos contactos, formulario y mapa. |
| Proyecto | `/proyecto/renovacion-total-vivienda-sant-climent/` | Renovación de vivienda unifamiliar en Sant Climent. |
| Proyecto | `/proyecto/reforma-integral-oficinas-cobalt-122/` | Reforma de oficinas en l’Hospitalet de Llobregat. |
| Servicio | `/service/reformas-rehabilitaciones/` | Título en español; contenido de plantilla mayoritariamente en inglés. |
| Servicio | `/service/obra-nueva/` | Título en español; contenido de plantilla mayoritariamente en inglés. |
| Servicio | `/service/obra-civil/` | Título en español; contenido de plantilla mayoritariamente en inglés. |

También aparecen estas rutas generadas por WordPress:

- `/proyecto/reforma/` aparece como archivo de categoría en el sitemap, pero al resolverla el navegador termina en el detalle de **Reforma integral de oficinas – Carrer Cobalt 122**. Hay que corregir o retirar esta ruta durante la migración.
- `/proyecto/` y `/proyectos/` terminan mostrando la portada `/`; el listado real hoy está en la raíz.
- `/author/paulg/` es un archivo de autor incluido en el sitemap, no enlazado en la navegación.
- El sitemap publica **83 URLs `/pxl-template/...`**. Son plantillas/piezas de Elementor (cabeceras, pies, títulos, pestañas, ventanas emergentes, etc.), no páginas editoriales de HUCA. No deberían reproducirse como páginas del nuevo sitio ni entrar en su sitemap.
- No se encontró un sitemap de entradas/blog.

Las variantes `http://` y `www.hucaconstructora.com` terminan en el dominio canónico `https://hucaconstructora.com/`.

No están publicadas las páginas `/empresa/`, `/sobre-nosotros/`, `/servicios/` o `/blog/` (responden como no encontradas). Los enlaces del pie “Aviso Legal”, “Política de privacidad” y “Política de cookies” apuntan a `#`; las rutas equivalentes probadas devuelven 404.

## Navegación y componentes comunes

### Cabecera

- Altura de escritorio observada: aproximadamente **110 px**.
- Logotipo HUCA en un bloque oscuro a la izquierda.
- Menú centrado con `PROYECTOS` y `CONTACTO`.
- Bloque oscuro a la derecha con icono de teléfono, texto “Contáctanos” y `+34 671.774.262`.
- Enlaces tipográficos DM Sans, mayúsculas, 15 px, peso 600, espaciado de letras 1,28 px.
- El tema incluye comportamiento de cabecera sticky.

### Pie

- Fondo carbón con motivo gráfico geométrico.
- Columnas de marca, menú (“Proyectos”, “Contacto”) e información de contacto.
- Dirección: Av. de la Pineda, 2, 08860 Castelldefels, Barcelona.
- Teléfonos: 671.774.262 y 663.275.750. Email visible: `info@hucaconstructora.com`.
- Horario mostrado: `8.00 Am - 17.00 Pm`.
- Copyright `© 2025 HUCA Building Solutions S.L.` y enlaces legales.
- Hallazgos: algunos enlaces de email usan el esquema `mail:` en vez de `mailto:`; los enlaces legales apuntan a `#`.

## Estructura visual y secciones

### Portada actual (`/`)

1. Cabecera común.
2. Hero a ancho completo, dos columnas 50/50. A la izquierda: plano decorativo, rótulo “DESCUBRE EL TRABAJO QUE HEMOS REALIZADO”, título “Proyectos”, texto introductorio y breadcrumb. A la derecha: fotografía de interior/obra. A 1424 px de ancho, el hero mide aproximadamente 404 px.
3. Filtros `All` y `Reforma`, línea divisoria y cuadrícula masonry. Hay dos tarjetas: una ocupa aproximadamente un tercio y la otra dos tercios del ancho; muestran categoría/título sobre la fotografía y efecto hover.
4. Pie común.

La portada no contiene las secciones “Quiénes somos”, servicios, cifras, testimonios o llamada a presupuesto que aparecen en las capturas de la demo.

### Contacto (`/contacto/`)

1. Hero partido 50/50 con fondo verde agua, titular “Contacto”, introducción y breadcrumb; fotografía de oficinas a la derecha. Altura observada: aproximadamente 418 px.
2. Bloque en dos columnas: texto “Contacta con nosotros”, introducción y contactos individuales a la izquierda; formulario a la derecha.
3. Mapa de Google Maps incrustado para Av. de la Pineda, 2, Castelldefels.
4. Pie común.

El bloque de contactos identifica a Diego Huelin (`671.774.262`, `dhuelin@hucaconstructora.com`) y Arnau Lopez (`663.275.750`, `alopez@hucaconstructora.com`). En la captura del navegador, el mapa se mostró como un rectángulo negro; conviene comprobar el embed en el entorno publicado.

### Fichas de proyecto

Las dos fichas comparten plantilla:

1. Hero partido con color de marca, rótulo, título, texto introductorio y breadcrumb.
2. Título de proyecto y metadatos en una cuadrícula de ocho campos.
3. Galería fotográfica con controles anterior/siguiente.
4. Bloques “Sobre el proyecto”, “Desafío del cliente” y “Enfoque y solución”.
5. Navegación a proyecto anterior/siguiente y acceso al listado.
6. Pie común.

| Proyecto | Cliente | Ubicación | Año | Sector/subsector | Datos no informados |
|---|---|---|---|---|---|
| Renovación Total de Vivienda – Sant Climent | Privado | Cataluña, Sant Climent | 2025 | Residencial / Renovación integral | Presupuesto y tamaño aparecen como “–”. |
| Reforma integral de oficinas – Carrer Cobalt 122 | HV | Cataluña, Hospitalet de Llobregat | 2025 | Oficinas / Renovación integral | Presupuesto y tamaño aparecen como “–”. |

La categoría `Reforma` está asignada a la primera tarjeta; la segunda no tiene categoría visible. Las URLs actuales usan el prefijo singular `/proyecto/`.

### Fichas de servicio

Las rutas actuales son `/service/reformas-rehabilitaciones/`, `/service/obra-nueva/` y `/service/obra-civil/`. Comparten una página larga de dos columnas: hero naranja, contenido principal con imagen, listas, pestañas “Solutions”, beneficios, proceso, bloque de vídeo y acordeón FAQ; barra lateral con categorías, “Why Choose Us”, descargas y contacto.

Hallazgos de contenido: textos en inglés sobre “Mountjoy”, preguntas genéricas/fragmentos de relleno y un bloque lateral con teléfonos, dirección y email de demostración (incluye `+1.809.120.6705` y `Gracontruction@gmail.com`). La cabecera y el pie sí muestran datos de HUCA. Además, el hero usa `#F45B1E`, no el verde agua de las páginas de proyectos/contacto.

## Estilo, tipografía y responsive

| Elemento | Observación |
|---|---|
| Color principal HUCA | Verde agua `#8FC1B4` en portada, contacto y proyectos. |
| Color de servicio | Naranja `#F45B1E`; parece conservar el valor por defecto del tema. |
| Colores de apoyo | Carbón `#1E2023`, títulos `#121315`, navegación `#2C2C2C`, texto `#666666`, texto del pie `#CDCDCD`, fondo blanco. |
| Tipografía | Barlow para texto; DM Sans para titulares y navegación. El tema solicita además familias adicionales de Google Fonts. |
| Escala observada | Hero 55/70 px; títulos principales interiores 45/55 px; subtítulos de sección 30 px; texto habitual 16/26 px (el estilo global de body indica 18 px). |
| Ancho de contenido | Contenedores Elementor de hasta 1200 px; secciones hero a ancho completo. |
| Breakpoints encontrados | CSS del tema/Elementor contiene reglas en torno a 1200, 1024, 991 y 767 px; el título de hero baja a aproximadamente 35/45 px en móvil. |

La revisión visual se hizo en escritorio (captura de portada a 1424 px). Se localizaron reglas responsive, pero no se validó aquí cada menú/estado a un viewport móvil emulado; eso debe incluirse en las pruebas de implementación.

### Animaciones e interacción

- Efecto sticky de cabecera y fondos de hero con clase de parallax.
- Clases de entrada/animación del tema (`WOW`/Animate) y efectos hover de imagen en tarjetas.
- Filtro de categorías y cuadrícula masonry del portfolio.
- Controles de galería y navegación anterior/siguiente en proyectos.
- En servicios: pestañas, vídeo con botón play y acordeón de preguntas frecuentes.
- Transiciones observadas en enlaces/botones de aproximadamente 0,25 s y en algunos fondos de 0,3 s.

## Imágenes y otros recursos

Los recursos públicos identificados se sirven desde el dominio de WordPress, no desde un CDN de imágenes externo. Referencias principales:

- Logotipo: `wp-content/uploads/2024/07/HUCA.png` (263×233 en la respuesta observada); icono HUCA `wp-content/uploads/2025/09/HUCA-ICON-1.png` (450×450).
- Hero común de portada/proyectos: `F1A6438-HDR-Editar-scaled.jpg`; hero de contacto: `F1A7925-Editar-scaled.jpg`.
- Tarjetas de proyectos: `F1A6536-Editar-scaled-740x812.jpg` y `F1A7851-Editar-scaled-740x812.jpg`.
- Galería Sant Climent: `HUCA-sant-climent-4.png`, `-1.png`, `-2.png`, `-3.png`.
- Galería Cobalt: `HUCA-cobalt-1.png`, `-2.png`, `-3.png`, `-4.png`, `-5.png`, `-6.png`.
- Recursos de fondo: `g4.png` (pie), `ptt1-1.webp`, `ptt-contact-1.webp`, `ptt-service.webp` y `bg-ct1-1.webp`.
- Las galerías de proyecto se sirven como PNG de aproximadamente 1170×720; las tarjetas como JPG de 740×812. Se observan variantes WebP en recursos de plantilla/servicio.
- Las páginas de servicio cargan fotografías de plantilla como `svd1.webp`–`svd5.webp`.

Los atributos `alt` están vacíos en varias imágenes de galería/logotipo y en otras contienen nombres de archivo, no descripciones. Antes de trasladar las imágenes genéricas de las páginas de servicio, hay que confirmar derechos/origen y si deben conservarse. No se descargaron archivos durante esta fase.

## Formulario y accesibilidad

- El formulario actual es Contact Form 7 y presenta nombre, correo electrónico, teléfono y mensaje; los campos están marcados como obligatorios por la configuración del plugin. No se envió ningún formulario durante la auditoría.
- Los campos se identifican principalmente con placeholders; no se observaron etiquetas visibles asociadas. La casilla de aceptación aparece comentada/desactivada en el markup.
- No se confirmó en esta fase la protección antispam del servidor.
- La página incluye un iframe externo de Google Maps.
- La auditoría Lighthouse de la portada dio **81/100 accesibilidad**, **100/100 buenas prácticas** y **83/100 SEO**. Señaló contraste insuficiente, orden de encabezados, enlaces sin nombre accesible, `maximum-scale=1` en el viewport y falta de meta description. Esta ejecución no generó una puntuación de rendimiento.

## SEO y comportamiento de URLs

- Las páginas revisadas tienen `<title>` y canonical; no se detectaron meta descriptions, Open Graph, Twitter Cards ni JSON-LD.
- No se detectó ningún `<h1>` en las páginas revisadas; los títulos principales están marcados como H3.
- `robots.txt` bloquea `/wp-admin/` y apunta a `/wp-sitemap.xml`.
- El sitemap incluye, además del contenido real, las 83 plantillas PXL y el archivo de autor. El nuevo sitemap debería contener únicamente URLs editoriales canónicas.
- El listado vive en `/`, aunque hay enlaces hacia `/proyectos/` y `/proyecto/`; ambos terminan en `/`.
- Los proyectos usan `/proyecto/{slug}/`; los servicios usan `/service/{slug}/`. Si se decide cambiar a `/proyectos/{slug}/` o a `/servicios/{slug}/`, habrá que definir redirecciones 301 desde todas las rutas existentes antes de publicar.
- La categoría `/proyecto/reforma/` requiere una decisión explícita: su destino actual termina siendo una ficha de proyecto, no un archivo de categoría.
- El navegador registró solicitudes bloqueadas de cuatro hojas locales de fuentes servidas por `http://` (Roboto, Roboto Slab, DM Sans y Barlow), aunque la web se carga en HTTPS. Es un error de contenido mixto que conviene eliminar al reconstruir.

## Limitaciones de esta fase y decisiones acordadas

El API REST público no expone los endpoints de los tipos `portfolio` y `service` probados (`/wp-json/wp/v2/portfolio` y `/wp-json/wp/v2/service` devuelven 404; tampoco aparecen en `/wp-json/wp/v2/types`). Para una importación fiel puede facilitarse un export de WordPress y/o un archivo de medios; las páginas públicas y sus imágenes sí son visibles, pero no se ha hecho una exportación del servidor.

Tras revisar el informe, se acordó:

1. Usar la referencia visual facilitada e incorporar también secciones de esa referencia que hoy no están en la web publicada.
2. Separar una portada corporativa en `/` del listado de proyectos en `/proyectos/`.
3. Usar los textos españoles aportados después en `reformas-rehabilitaciones.docx`, `obra-nueva.docx` y `obra-civil.docx` en lugar del texto de demo en inglés de WordPress.
4. Usar `/proyectos/{slug}/` para los nuevos proyectos y preparar redirecciones 301 desde `/proyecto/{slug}/`.
5. Utilizar únicamente imágenes ya publicadas por HUCA; no copiar imágenes de stock de terceros.
6. Usar los DOCX recibidos para “Quiénes somos” y RSE, mostrar `HUCA Building Solutions S.L.` como nombre societario y maquetar con marcadores las secciones demo sin datos HUCA aprobados.

Queda por definir el tratamiento final de `/proyecto/reforma/`, `/author/paulg/` y las 83 URLs `/pxl-template/...` en las redirecciones/SEO. Los marcadores de cifras, premios, logos, testimonios, FAQs y folletos deberán sustituirse por datos aprobados antes de quitar el `noindex` de revisión.

## Pruebas y cambios realizados

- Revisados la portada, Contacto, los dos proyectos, los tres servicios, el sitemap y `robots.txt`.
- Comprobados el destino final de rutas alias/categoría, capturas a escritorio, metadatos visibles, formulario sin enviarlo, consola y score Lighthouse de la portada.
- No se probaron envíos reales, accesos de WordPress/Pages CMS, invitaciones, GitHub ni despliegues de Netlify: no forman parte de esta fase y requieren accesos/configuración.
- No se modificó código de aplicación. El único archivo añadido es este informe.
