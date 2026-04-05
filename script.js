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

// ============================================
// MAGIE DE LA SECTION "À PROPOS" (Bulles & Couleurs)
// ============================================

// --- INTERACTION 1 : L'anneau qui change de couleur ---
const badges = document.querySelectorAll('.badge');
const glowRing = document.getElementById('glow-ring');

// Quand la souris passe sur un badge, l'anneau prend la couleur du badge !
badges.forEach(badge => {
    badge.addEventListener('mouseenter', () => {
        // On récupère la couleur cachée dans le HTML (data-color)
        const color = badge.getAttribute('data-color');
        glowRing.style.background = color;
        glowRing.style.boxShadow = `0 0 40px ${color}`; // Lueur intense
        badge.style.borderColor = color;
        badge.style.color = color;
    });

    // Quand la souris part, on remet le badge normal
    badge.addEventListener('mouseleave', () => {
        badge.style.borderColor = "rgba(255, 255, 255, 0.2)";
        badge.style.color = "#ffffff";
    });
});


// --- INTERACTION 2 : Les Bulles Flottantes et Éclatantes ---
const bubbleContainer = document.getElementById('bubbles-container');

// Fonction pour créer une bulle
function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    // Taille aléatoire entre 10px et 40px
    const size = Math.random() * 30 + 10;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    // Position horizontale aléatoire (0% à 100% de l'écran)
    bubble.style.left = `${Math.random() * 100}vw`;

    // Durée de l'animation aléatoire (pour qu'elles aillent à des vitesses différentes)
    bubble.style.animationDuration = `${Math.random() * 5 + 5}s`;

    // Quand on clique sur une bulle, elle éclate !
    bubble.addEventListener('click', () => {
        bubble.classList.add('pop'); // Ajoute la classe d'explosion CSS
        // Supprime la bulle du code après 300ms (le temps de l'animation)
        setTimeout(() => {
            bubble.remove();
        }, 300);
    });

    // On ajoute la bulle dans l'écran
    bubbleContainer.appendChild(bubble);

    // On supprime la bulle après 10 secondes pour ne pas surcharger l'ordinateur
    setTimeout(() => {
        if (bubble.parentNode) {
            bubble.remove();
        }
    }, 10000);
}

// Créer une nouvelle bulle toutes les 800 millisecondes (presque 1 seconde)
setInterval(createBubble, 800);
// ============================================
// MAGIE DE LA SECTION ACCUEIL (Hero)
// ============================================

// --- 1. L'EFFET PROJECTEUR (La lumière suit la souris) ---
const heroSection = document.getElementById('hero');
const spotlight = document.getElementById('hero-spotlight');

// Quand la souris bouge sur la section Accueil
heroSection.addEventListener('mousemove', (e) => {
    // On donne à la lumière les coordonnées X et Y de la souris
    spotlight.style.left = `${e.clientX}px`;
    spotlight.style.top = `${e.clientY}px`;
});


// --- 2. L'EFFET MACHINE À ÉCRIRE ---
const words = [
    "Développeuse Web 💻", 
    "Écrivaine Passionnée ✍️", 
    "Créatrice de Solutions 🚀", 
    "Vendeuse d'Innovations 🛍️"
];

let wordIndex = 0; // Quel mot on tape
let charIndex = 0; // Quelle lettre du mot on tape
let isDeleting = false; // Est-ce qu'on efface ?
const typingElement = document.getElementById('typing-text');

function typeEffect() {
    const currentWord = words[wordIndex];
    
    // Si on efface
    if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } 
    // Si on écrit
    else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    // Gérer la vitesse d'écriture et d'effacement
    let typeSpeed = isDeleting ? 50 : 100;

    // Si le mot est fini d'écrire, on fait une pause
    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pause de 2 secondes avant d'effacer
        isDeleting = true;
    } 
    // Si le mot est totalement effacé, on passe au suivant
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length; // Passe au mot suivant
        typeSpeed = 500; // Petite pause avant d'écrire le nouveau mot
    }

    // On rappelle la fonction en boucle avec la vitesse calculée
    setTimeout(typeEffect, typeSpeed);
}

// On lance la machine à écrire au chargement de la page
typeEffect();
// ============================================
// MAGIE DU PANNEAU DE CONNEXION (Modal)
// ============================================

// On va chercher le bouton du menu, le fond noir, et la croix
const btnLoginMenu = document.querySelector('.btn-login');
const loginModal = document.getElementById('login-modal');
const closeModal = document.getElementById('close-modal');

// 1. Quand on clique sur "Connexion" dans le menu
btnLoginMenu.addEventListener('click', (event) => {
    event.preventDefault(); // Empêche la page de sauter ou de recharger
    loginModal.classList.add('active'); // Fait apparaître le panneau
});

// 2. Quand on clique sur la petite croix (X)
closeModal.addEventListener('click', () => {
    loginModal.classList.remove('active'); // Fait disparaître le panneau
});

// 3. (Astuce Pro) Si l'utilisateur clique sur le fond noir flou, ça ferme aussi !
window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
        loginModal.classList.remove('active');
    }
});
