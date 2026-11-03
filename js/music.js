let musicContext = null;
let musicMaster = null;
let musicTimer = null;

let musicEnabled = true;
let musicPlaying = false;
let musicStep = 0;

const melody = [
    196, 220, 261.63, 220,
    174.61, 196, 220, 164.81,
    196, 261.63, 293.66, 261.63,
    174.61, 196, 164.81, 146.83
];

const bassNotes = [
    65.41, 65.41, 73.42, 73.42,
    58.27, 58.27, 65.41, 65.41
];

function initializeMusic() {
    const button = document.getElementById("musicToggleButton");

    if (button) {
        button.textContent = musicEnabled ? "MUSIC: ON" : "MUSIC: OFF";
    }
}

function createMusicContext() {
    if (musicContext) return;

    const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
        console.warn("Web Audio API is not supported.");
        return;
    }

    musicContext = new AudioContextClass();

    musicMaster = musicContext.createGain();
    musicMaster.gain.value = 0.35;
    musicMaster.connect(musicContext.destination);
}

function playMusicNote(frequency, duration, volume, type) {
    if (!musicContext || !musicMaster) return;

    const oscillator = musicContext.createOscillator();
    const gain = musicContext.createGain();

    const now = musicContext.currentTime;

    oscillator.type = type || "triangle";
    oscillator.frequency.setValueAtTime(frequency, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + duration
    );

    oscillator.connect(gain);
    gain.connect(musicMaster);

    oscillator.start(now);
    oscillator.stop(now + duration + 0.05);
}

function playDungeonMusicStep() {
    if (!musicContext || !musicPlaying) return;

    const melodyNote = melody[musicStep % melody.length];
    const bassNote = bassNotes[musicStep % bassNotes.length];

    playMusicNote(
        melodyNote,
        0.8,
        0.09,
        "triangle"
    );

    if (musicStep % 2 === 0) {
        playMusicNote(
            bassNote,
            1.2,
            0.12,
            "sine"
        );
    }

    if (musicStep % 4 === 0) {
        playMusicNote(
            melodyNote * 1.5,
            1.8,
            0.025,
            "sine"
        );
    }

    musicStep++;
}

async function startBackgroundMusic() {
    if (!musicEnabled || musicPlaying) return;

    createMusicContext();

    if (!musicContext) return;

    try {
        await musicContext.resume();
    } catch (error) {
        console.warn("Unable to start background music:", error);
        return;
    }

    musicPlaying = true;
    musicStep = 0;

    playDungeonMusicStep();

    musicTimer = setInterval(function() {
        playDungeonMusicStep();
    }, 450);
}

function stopBackgroundMusic() {
    musicPlaying = false;

    if (musicTimer !== null) {
        clearInterval(musicTimer);
        musicTimer = null;
    }
}

function toggleBackgroundMusic() {
    musicEnabled = !musicEnabled;

    const button = document.getElementById("musicToggleButton");

    if (button) {
        button.textContent = musicEnabled ? "MUSIC: ON" : "MUSIC: OFF";
    }

    if (musicEnabled) {
        startBackgroundMusic();
    } else {
        stopBackgroundMusic();
    }
}

initializeMusic();