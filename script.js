// ============================================
// LECTEUR DE MUSIQUE AVEC PLAYLIST (Fonctionnel)
// ============================================

// 1. On récupère tous les éléments du DOM
const audio = document.getElementById("site-music");
const playPauseBtn = document.getElementById("play-pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const volumeSlider = document.getElementById("volume-slider");
const currentCover = document.getElementById("current-cover");
const currentTitle = document.getElementById("current-title");
const currentArtist = document.getElementById("current-artist");
const playlistSongs = document.querySelectorAll("#playlist-songs li");

// 2. On stocke les musiques dans un tableau
const songs = [];
playlistSongs.forEach(song => {
    songs.push({
        src: song.getAttribute("data-src"),
        cover: song.getAttribute("data-cover"),
        title: song.getAttribute("data-title"),
        artist: song.getAttribute("data-artist"),
        element: song
    });
});

// 3. Variables pour gérer la lecture
let currentSongIndex = 0;
let isPlaying = false;

// 4. Fonction pour charger une musique
function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    currentCover.src = song.cover;
    currentTitle.textContent = song.title;
    currentArtist.textContent = song.artist;

    // On met en surbrillance la musique active dans la playlist
    playlistSongs.forEach(song => song.classList.remove("active"));
    song.element.classList.add("active");

    // On réinitialise l'animation de la pochette
    currentCover.classList.remove("spin-animation");
    if (isPlaying) {
        currentCover.classList.add("spin-animation");
    }
}

// 5. Fonction pour jouer/pause
function playPause() {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.innerHTML = "▶️";
        currentCover.classList.remove("spin-animation");
    } else {
        audio.play();
        playPauseBtn.innerHTML = "⏸️";
        currentCover.classList.add("spin-animation");
    }
    isPlaying = !isPlaying;
}

// 6. Fonction pour passer à la musique suivante
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        audio.play();
    }
}

// 7. Fonction pour revenir à la musique précédente
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        audio.play();
    }
}

// 8. Événements (clics sur les boutons)
playPauseBtn.addEventListener("click", playPause);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// 9. Gestion du volume
volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
});

// 10. Clic sur une musique de la playlist
playlistSongs.forEach((song, index) => {
    song.addEventListener("click", () => {
        currentSongIndex = index;
        loadSong(currentSongIndex);
        if (isPlaying) {
            audio.play();
        }
    });
});

// 11. Quand une musique se termine, on passe à la suivante
audio.addEventListener("ended", nextSong);

// 12. On charge la première musique au démarrage
loadSong(currentSongIndex);