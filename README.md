# MiMaipú · Ecosistema Nervioso Urbano

Mockup web interactivo de un centro de despacho municipal y de un canal ciudadano tipo WhatsApp para Maipú. Funciona sin instalaciones ni backend, con un mapa real de OpenStreetMap.

**Demo en línea:** [https://roninwuajkja.github.io/mimaipu-mockup/](https://roninwuajkja.github.io/mimaipu-mockup/)

## Abrir

Abre `index.html` directamente en Chrome, Edge o Firefox. También puedes servirlo como archivo estático:

```powershell
python -m http.server 8000
```

Luego visita `http://localhost:8000`.

El mapa base necesita conexión a Internet para descargar las teselas de OpenStreetMap. MapLibre GL JS está incluido localmente en `assets/vendor/maplibre`.

## Vistas

- **Despacho municipal:** impacto eco-eficiente del turno, mapa semafórico por macrozonas, filtros por capa y estado, tickets priorizados, despacho agrupado y telemetría de flota.
- **Canal ciudadano:** simulador de chat con reporte por voz, foto o texto, confirmación con folio y visita, reprogramación, cierre con evidencia antes/después, huella reducida y puntos canjeables.

La navegación utiliza `#despacho` y `#ciudadano`, por lo que funciona el botón Atrás del navegador.

## Interacciones principales

- Alterna entre **Semáforo** e **Incidentes**. Los filtros de capa, riesgo y macrozona actualizan el mapa y la cola de tickets.
- Selecciona dos o más tickets y usa **Despacho agrupado** para asignar una cuadrilla multifuncional.
- Abre una ficha de flota para revisar cámara IA, vibración y estado de conexión. El Camión 09 incluye una simulación de cola local offline.
- En el canal ciudadano, graba una nota simulada, envía una foto local o escribe un mensaje. Confirma la ubicación para generar el folio, autoriza o reprograma la visita y revisa el cierre.
- El recorrido de tres etapas permite saltar a **Reporta**, **Confirma** y **Cierre** para una demostración rápida.
- En el cierre puedes canjear puntos de demostración por recompensas y ver el saldo actualizado.

## Criterios de diseño

- **Estructura:** la cola de tickets y la flota se leen como registros operativos continuos, separados por líneas finas, no como pilas de tarjetas. Se eliminan contenedores anidados y sombras decorativas para priorizar jerarquía y lectura.
- **Paleta:** azul marino institucional, papel cálido, blanco y salvia. El rojo, ámbar y verde del semáforo se reservan para los datos de riesgo y siempre van acompañados de texto e íconos, nunca solo color.
- **Tipografía:** Archivo para titulares y cifras de operación; Public Sans para lectura de interfaz y chat por su alta legibilidad. Ambas se cargan localmente desde `assets/fonts`.
- **Lectura:** chat a 16 px, botones de al menos 44 px y mensajes de estado redundantes (color + palabra + ícono).
- **Mapa:** base real de OpenStreetMap navegable con MapLibre GL JS, zoom, arrastre y marcadores georreferenciados. Las macrozonas son áreas operativas circulares de demostración, no límites administrativos oficiales.
- **Movimiento:** transiciones breves para cambios de estado y mensajes. Respeta `prefers-reduced-motion`.
- **Accesibilidad:** navegación por teclado, foco visible, diálogos nativos cerrables con Escape, etiquetas accesibles, contraste WCAG AA, regiones activas y nombres de estado significativos.
- **Dependencias:** fuentes, estilos, íconos y librería de mapas son locales. Solo las teselas del mapa se cargan desde OpenStreetMap y requieren conexión.

## Datos y límites

Todos los folios, tiempos, costos, ahorros, puntos, recompensas y estados operativos son ficticios y están señalados en la interfaz como datos de demostración. Las direcciones usan calles y sectores reales, sin numeración domiciliaria.

La nota de voz es una simulación de interfaz: no accede al micrófono, no graba audio ni envía mensajes. La foto se abre y muestra localmente, sin subirse a ningún servidor. La evidencia antes/después es una ilustración de demostración.

La marca MiMaipú, la asistente MIMA y el sistema visual son propuestas de trabajo para este mockup, no activos oficiales entregados por la municipalidad.

## Estructura

```text
index.html                       estructura, textos e íconos SVG
styles.css                       sistema visual, mapa y diseño responsive
app.js                           datos de demostración e interacciones
assets/favicon.svg               favicon
assets/fonts/                    fuentes locales y sus licencias
assets/vendor/maplibre/          MapLibre GL JS, CSS y licencia BSD
README.md
```

Fuentes: Archivo y Public Sans, SIL Open Font License. MapLibre GL JS, licencia BSD 3-Clause. Datos cartográficos © OpenStreetMap contributors, disponibles bajo la Open Database License.
