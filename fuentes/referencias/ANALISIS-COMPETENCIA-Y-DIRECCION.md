# Pollerías en Perú — Análisis de competencia web y dirección de diseño

Base: las 5 capturas de la carpeta (`1P`–`5P.png`) y los 5 sitios del documento `PAG WEBS POLLOS.docx`.

---

## 1. Lo que revisé

| Marca | URL | Qué es realmente |
|---|---|---|
| Pardos Chicken | `pardoschicken.pe/categorias/pardos-brasa` | Catálogo e-commerce con carrito |
| Roky's | `rokys.com` | Catálogo e-commerce con carrito |
| Mediterráneo | `mediterraneo.com.pe/home` | Catálogo e-commerce con carrito |
| Don Belisario | `donbelisario.com.pe` | Catálogo e-commerce, delivery gratis +S/25 |
| La Panka | `lapanka.pe` | Landing mínima + pedidos tercerizados en Justo |

**Conclusión de una línea: ninguno tiene una web. Los cinco tienen un menú digital con botón de pagar.**

---

## 2. Fallas concretas que documenté

**Pardos (capturas 1P, 2P, 3P)**
- El popup *"¿No es tu ubicación? Cámbiala aquí"* tapa el logo y parte de la navegación en **las tres** capturas. Es el primer elemento que ve el usuario.
- Dirección de arte inconsistente dentro de la misma grilla: unas fotos sobre pizarra negra, otras sobre tabla de madera clara, otras sobre mesa gris. Cuatro fondos distintos en una sola pantalla.
- Ficha de producto (3P): una foto a la izquierda y **la mitad derecha de la pantalla en blanco**. La descripción completa del producto es *"Este producto incluye salsas"*.
- Precio mal formateado: `S/ 60.5` en lugar de `S/ 60.50`.

**Roky's (4P)**
- Tres familias cromáticas peleando: verde institucional, amarillo del logo, rojo de los botones, más fondos planos verde y naranja en las promos.
- Fotos de producto recortadas sobre blanco mezcladas con fotos ambientadas. Ningún criterio.
- Barra de categorías con flechas de carrusel: el usuario no ve todo lo que existe.

**Mediterráneo (5P)**
- Botella de gaseosa de marca en 4 de las 5 fotos destacadas. Le está regalando el espacio visual a otra marca, y esas fotos caducan si cambia el proveedor.
- Header rojo saturado con borde ondulado + logo script: estética de los 2000.

**Transversales a los cinco**
- WhatsApp verde flotante encima de todo el contenido.
- Cero movimiento. Ningún scroll design, ninguna transición, ninguna pieza en video.
- Tipografía de sistema, sin display, sin jerarquía real.
- **Nadie muestra el proceso**: ni el carbón, ni el rotombo, ni el aderezo, ni las cremas hechas en casa.
- **Nadie usa el activo simbólico más fuerte del plato**: es Patrimonio Cultural de la Nación (R.D.N. N° 1066/INC, 2004) y se celebra el tercer domingo de julio. Ninguna marca lo capitaliza en su web.

Tenías razón: **no hay una sola web bonita en el sector.**

---

## 3. Por qué eso pasa (y por qué es tu ventaja)

Los cinco optimizaron para conversión de delivery. Cuando la web es un catálogo, todo se subordina a la ficha de producto: fondo blanco, foto plana, botón de agregar. Es una decisión razonable para vender — y es exactamente por eso que ninguno tiene marca.

**Tú dijiste que por ahora no vendes desde la página.** Eso te libera de la restricción que aplastó a los cinco. Puedes hacer lo que ninguno puede: una web que sea una *pieza de marca*, no un carrito.

---

## 4. Dirección elegida: "Brasa criolla premium"

La fórmula del video de BurgerLab (fondo oscuro, producto aislado, luz de brasa, scroll cinematográfico) trasladada a la paleta peruana del plato.

**El principio:** el sector entero está en blanco con rojo y amarillo. Ir a negro carbón con brasa naranja y ají amarillo produce diferenciación instantánea, sin necesidad de que la marca exista todavía.

**El eje de credibilidad:** mostrar el proceso. Aderezo → carbón → rotombo → despiece → cremas. Nadie lo hace, y es lo único que no se puede copiar con una foto de banco.

**El sello técnico:** la piel. El pollo a la brasa peruano es **caoba-cobre laqueado**, no dorado pálido — por el sillao, la cerveza negra y el ají panca. Si las imágenes generadas salen doradas, salió un rotisserie gringo y hay que regenerar. Esa regla está escrita en todos los prompts.

---

## 5. Qué te dejo listo

| Archivo | Contenido |
|---|---|
| `copy/brand-kit.md` | Identidad, tono, paleta con HEX, tipografía, lista de "evitar". Fuente de verdad del proyecto. |
| `copy/image-prompts.md` | 14 prompts listos para Higgsfield / GPT Image 2, con bloque de estilo compartido y checklist de cumplimiento. |
| `copy/video-brief.md` | Prompt Seedance 2.0 para el fondo del hero + el comando ffmpeg all-keyframe que hace posible el scroll-scrubbing. |
| `copy/asset-plan.md` | Inventario de assets, rutas exactas, orden de generación y estructura de las 8 secciones de la web. |

---

## 6. Pendientes antes de publicar

- Definir la marca real y reemplazar `{{MARCA}}` en los cuatro archivos (nombre de trabajo sugerido: **BRASA MADRE**).
- Libro de Reclamaciones virtual.
- Aviso de privacidad y consentimiento si el formulario de contacto captura datos personales.
