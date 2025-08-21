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
const backgroundSongImage = document.getElementById("background-song-image");
// Elementos interactivos
const barContainer = document.getElementById("bar-container");
const audioProgress = document.getElementById("audio-progress");
const prevBtn = document.getElementById("prev-button");
const playBtn = document.getElementById("play-button");
const pauseBtn = document.getElementById("pause-button");
const stopBtn = document.getElementById("stop-button");
const nextBtn = document.getElementById("next-button");
const autoPlayBtn = document.getElementById("autoplay-button");
const modal = document.getElementById("modal");
const modalBtn = document.getElementById("modal-button");

// **Variables globales**
let isPlaying = false;
let autoPlay = false;
let currentSong = 0;
let currentLine = null;
let bgImages = [];
let currentBgImageIndex = 0;
const btnAudio = new Audio();
btnAudio.src = "assets/audio/cassette-player-button.mp3";

// === CONFIG ===
let playPauseKey = "c";
let stopKey = "x";
let nextKey = "ArrowRight";
let prevKey = "ArrowLeft";
let autoPlayKey = "z";

// === FUNCIONES DE CONTROL ===
function playSong() {
	audio.play();
	isPlaying = true;
	document.title = "Reproduciendo - " + window.songs[currentSong].title;
	actualizarBotones();
}

function pauseSong() {
	audio.pause();
	isPlaying = false;
	document.title = "Pausado - " + window.songs[currentSong].title;
	actualizarBotones();
}

function stopSong() {
	audio.pause();
	audio.currentTime = 0;
	isPlaying = false;
	document.title = "Detenido - " + window.songs[currentSong].title;
	actualizarBotones();
}

function nextSong() {
	currentSong = (currentSong + 1) % window.songs.length;
	cargarCancion(currentSong);
	audio.currentTime = 0;
	playSong();
}

function prevSong() {
	currentSong = (currentSong - 1 + window.songs.length) % window.songs.length;
	cargarCancion(currentSong);
	audio.currentTime = 0;
	playSong();
}

function toggleAutoPlay() {
	autoPlay = !autoPlay;
	autoPlayBtn.classList.toggle("disabled", !autoPlay);
	btnAudio.currentTime = 0;
	btnAudio.play();
}

// === TECLADO ===
document.addEventListener("keydown", (e) => {
	const key = e.key;

	switch (key) {
		case playPauseKey:
			isPlaying ? pauseSong() : playSong();
			break;
		case stopKey:
			stopSong();
			break;
		case nextKey:
			nextSong();
			break;
		case prevKey:
			prevSong();
			break;
		case autoPlayKey:
			toggleAutoPlay();
			break;
	}
});

// === BOTONES ===
playBtn.addEventListener("click", playSong);
pauseBtn.addEventListener("click", pauseSong);
stopBtn.addEventListener("click", stopSong);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
autoPlayBtn.addEventListener("click", toggleAutoPlay);

// === EVENTOS EXTRA ===
audio.addEventListener("ended", () => {
	isPlaying = false;
	audio.currentTime = 0;
	actualizarBotones();
	if (autoPlay) nextSong();
});

// === BOTONES DE ESTADO ===
function actualizarBotones() {
	if (isPlaying) {
		playBtn.classList.add("hidden");
		pauseBtn.classList.remove("hidden");
	} else {
		playBtn.classList.remove("hidden");
		pauseBtn.classList.add("hidden");
	}
	btnAudio.currentTime = 0;
	btnAudio.play();
}


modalBtn.addEventListener("click", () => {
	ocultarModal();
});
document.addEventListener("keydown", (e) => {
	if (e.key === "Escape") {
		ocultarModal();
	}
});
function ocultarModal() {
	modal.classList.add("hidden");
	btnAudio.currentTime = 0;
	btnAudio.play();
}

// **Carga dinámica desde JSON**
fetch("lyrics.json")
	.then((res) => res.json())
	.then((data) => {
		window.songs = data.lyrics; // todas las canciones
		cargarCancion(currentSong);
	});

function cargarCancion(index) {
	const song = window.songs[index];

	// Info de la canción
	titleEl.textContent = song.title;
	artistEl.textContent = song.artist;
	albumEl.textContent = song.album;
	coverEl.src = "assets/img/" + song.image;
	audio.src = "assets/audio/" + song.song;
	// Verificar si tiene backgroundImage
	if (song.backgroundImage && song.backgroundImage.length > 0) {
		bgImages = song.backgroundImage;
		currentBgImageIndex = 0;
		backgroundSongImage.src = "assets/img/" + bgImages[currentBgImageIndex].image;
		backgroundSongImage.style.display = "block"; // Mostrar si estaba oculto
	} else {
		bgImages = [];
		currentBgImageIndex = 0;
		backgroundSongImage.src = ""; // O un fondo por defecto
		backgroundSongImage.style.display = "none"; // Ocultar elemento si no hay imagen
	}

	// Resetear lyrics
	karaokeEl.innerHTML = "";
	window.lyrics = song.song_lyrics; // letras de ESTA canción
	currentLine = null;

	// Crear dinámicamente las líneas
	window.lyrics.forEach((line, index) => {
		const p = document.createElement("p");
		p.className = "lyrics";
		p.id = "line" + (index + 1);
		p.textContent = line.lyrics;
		karaokeEl.appendChild(p);

		// Guardar tiempos
		const [start, end] = line.time.split("-").map(Number);
		line.start = start;
		line.end = end;
		line.id = p.id;
	});
}

// Alternar background
function alternarBackground() {
	if (bgImages.length === 0) return;

	currentBgImageIndex = (currentBgImageIndex + 1) % bgImages.length;
	backgroundSongImage.src = "assets/img/" + bgImages[currentBgImageIndex].image;
}

// Ejemplo de auto-rotación cada 5 segundos
setInterval(alternarBackground, 5000);

if (window.innerWidth >= 360 && window.innerWidth <= 600) {
	document.querySelector(".panelsup").style.backgroundImage = `url("assets/img/${song.image}")`;
	document.querySelector(".panelsup").style.backgroundSize = "cover";
	document.querySelector(".panelsup").style.backgroundPosition = "center center";
	document.querySelector(".panelsup").style.backgroundRepeat = "no-repeat";
	document.querySelector(".panelsup").style.backgroundBlendMode = "darken";
	document.querySelector(".panelsup").style.backgroundColor = "rgba(0, 0, 0, 0.5)";
}

// Estados de botones
function actualizarBotones() {
	if (isPlaying) {
		playBtn.classList.add("hidden");
		pauseBtn.classList.remove("hidden");
	} else {
		playBtn.classList.remove("hidden");
		pauseBtn.classList.add("hidden");
	}
	btnAudio.currentTime = 0;
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
