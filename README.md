# BRASANTO — Web

Sitio estático de **BRASANTO**, pollería a la brasa en Magdalena del Mar, Lima.

Una sola página, sin build ni dependencias: se sirve tal cual desde cualquier
hosting estático (GitHub Pages, Netlify, Vercel, Nginx).

## Estructura

```
index.html            La página completa (estilos y keyframes en línea)
support.js            Comportamiento: brasas del hero, reveal on scroll,
                      barra de progreso, estado del nav, secuencia del plato,
                      CTA flotante y autoplay tolerante del video
assets/
  brand/              Logo (isotipo + logotipo) y tarjeta social
  img/                Fotografía de carta, cremas, local
  fonts/              Anton + Archivo (woff2, self-hosted)
  video/              Clip del plato
```

## Desarrollo

Necesita un servidor HTTP — abrir `index.html` con `file://` no resuelve las
rutas relativas de los assets.

```bash
python -m http.server 4173
```

## Notas

- Tipografías **self-hosted**: la página no pide nada a Google Fonts en runtime.
- Respeta `prefers-reduced-motion`: las brasas del hero no se generan.
- El menú del nav se colapsa por debajo de 860 px de ancho.
