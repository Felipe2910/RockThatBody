// **Elementos del DOM**
// Elementos mostrados dinámicamente
const audio = document.getElementById("audio-karaoke");
const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");
const albumEl = document.getElementById("album");
const coverEl = document.getElementById("cover-image");
const karaokeEl = document.getElementById("karaoke-lyrics");
const currentTimeEl = document.getElementById("current-time");
const timeLeftEl = document.getElementById("time-left");
// Elementos interactivos
const barContainer = document.getElementById("bar-container");
const audioProgress = document.getElementById("audio-progress");
const playBtn = document.getElementById("play-button");
const pauseBtn = document.getElementById("pause-button");
const stopBtn = document.getElementById("stop-button");

// **Variables globales**
let isPlaying = false;
let currentLine = null;
const btnAudio = new Audio();
btnAudio.src = "cassette-player-button.mp3";

// **Carga dinámica desde un archivo JhonSON :v **
fetch("lyrics.json")
	.then((res) => res.json())
	.then((data) => {
		const song = data.lyrics[0];
		titleEl.textContent = song.title;
		artistEl.textContent = song.artist;
		albumEl.textContent = song.album;
		coverEl.src = 'assets/img/' + song.image;
		audio.src = 'assets/audio/' + song.song;

		// Crear las líneas de letra dinámicamente
		song.song_lyrics.forEach((line, index) => {
			const p = document.createElement("p");
			p.className = "lyrics";
			p.id = "line" + (index + 1);
			p.textContent = line.lyrics;
			karaokeEl.appendChild(p);

			// Guardar tiempo en segundos
			const [start, end] = line.time.split("-").map(Number);
			line.start = start;
			line.end = end;
			line.id = p.id;
		});

		// Guardar array para control de karaoke
		window.lyrics = song.song_lyrics;
	});

// **Controles de audio**
playBtn.addEventListener("click", () => {
	audio.play();
	isPlaying = true;
	actualizarBotones();
});
pauseBtn.addEventListener("click", () => {
	audio.pause();
	isPlaying = false;
	actualizarBotones();
});
stopBtn.addEventListener("click", () => {
	audio.pause();
	audio.currentTime = 0;
	isPlaying = false;
	actualizarBotones();
});

audio.addEventListener("ended", () => {
	isPlaying = false;
	audio.currentTime = 0;
	actualizarBotones();
});
// Estados de botones
function actualizarBotones() {
	if (isPlaying) {
		playBtn.classList.add("disabled");
		pauseBtn.classList.remove("disabled");
	} else {
		playBtn.classList.remove("disabled");
		pauseBtn.classList.add("disabled");
	}
	btnAudio.play();
}

// **Resaltar la línea actual**
audio.addEventListener("timeupdate", () => {
	const currentTime = audio.currentTime;
	if (!window.lyrics) return;

	window.lyrics.forEach((item) => {
		const lyricLine = document.getElementById(item.id);
		if (currentTime >= item.start && currentTime < item.end) {
			if (currentLine !== item.id) {
				lyricLine.classList.add("highlight");
				lyricLine.scrollIntoView({ behavior: "smooth", block: "center" });
				currentLine = item.id;
			}
		} else {
			lyricLine.classList.remove("highlight");
		}
	});

	// Actualiza barra
	if (audio.duration > 0) {
		audioProgress.style.width = (currentTime / audio.duration) * 100 + "%";
	}
});

// **Barra interactiva**
barContainer.addEventListener("click", (e) => {
	const rect = barContainer.getBoundingClientRect();
	const posX = e.clientX - rect.left;
	audio.currentTime = (posX / rect.width) * audio.duration;
});

// **Tiempo actual y tiempo restante**
function actualizarTiempo() {
	const currentTime = audio.currentTime;
	const duration = audio.duration;
	const minutes = Math.floor(currentTime / 60);
	const seconds = Math.floor(currentTime % 60);
	currentTimeEl.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	const minutesLeft = Math.floor((duration - currentTime) / 60);
	const secondsLeft = Math.floor((duration - currentTime) % 60);
	timeLeftEl.textContent = `-${minutesLeft}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
}

setInterval(actualizarTiempo, 1000);
