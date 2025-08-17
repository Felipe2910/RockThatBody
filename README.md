# RockThatBody

## Reproductor de Música Tipo Karaoke

Este proyecto es un reproductor de música interactivo con soporte para letras estilo karaoke.
Permite reproducir canciones, mostrar información del artista, álbum y caratula, además de mostrar la letra sincronizada.

---

## Características

- Reproducción de audio con controles Básicos:
  `Play` :arrow_forward:, `Pause` :pause_button:, `Next` :next_track_button:, `Prev` :previous_track_button: y `Stop` :stop_button:.
   y Avanzados: `Autoplay` :arrows_counterclockwise: (Deshabilitada por defecto).
- Visualización dinámica de:
  - **Título** `string`
  - **Artista** `string`
  - **Álbum** `string`
  - **Caratula** `src`
  - _**Imagen(s) de Fondo**_ `array`
  - **Letra en formato karaoke** `array`
- Sincronización de letra con tiempo de la canción.
- Fondos Dinámicos.
- Estructura modular en JavaScript.

---

## Estructura del Código

### **Elementos del DOM**

```javascript
const audio = document.getElementById("audio-karaoke");
const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");
const albumEl = document.getElementById("album");
const coverEl = document.getElementById("cover-image");
const karaokeEl = document.getElementById("karaoke");
```

### **Funciones principales**

- Manejo de eventos para reproducción y pausa.
- Responsividad.
- Actualización dinámica de la letra.
- Control de sincronización entre audio y texto.

---

## Archivos principales

- **index.html** → Interfaz del reproductor. :page_with_curl:
- **style.css** → Estilos del reproductor. :art::paintbrush:
- **script.js** → Lógica del reproductor y sincronización karaoke. :control_knobs:
- **/media** → Carpeta que contiene audios e imágenes. :musical_note::framed_picture:
- **lyrics.json** → Base de datos tipo NoSQL. :floppy_disk:

---

## Cómo usarlo

1. Colocar tus canciones dentro de la carpeta `/media/audio`.
2. Colocar las imágenes de portada en `/media/img`.
3. Editar el archivo `lyrics.json` para agregar canciones y letras.
4. Abrir `index.html` en tu navegador.

---

## Screenshots

_Desktop Screenshot 1_
![Preview1](assets\img\preview0.png)

_Desktop Screenshot 2 (con Imagen de Fondo)_
![Preview2](assets\img\preview1.png)

_Desktop Screenshot 3 (con Imagen de Fondo)_
![Preview3](assets\img\preview2.png)

> Mobile Preview Screenshot
![Preview4](assets\img\preview3.png)

---

### Futuras posibles mejoras

- [ ] Lista de reproducción dinámica.
- [ ] Mejoras o Cambios Responsive y de Display general.
- [ ] Soporte para letras descargadas automáticamente.
- [ ] Integración con APIs externas (Spotify o YouTube).

The MIT License (MIT)

Copyright (c) 2025
