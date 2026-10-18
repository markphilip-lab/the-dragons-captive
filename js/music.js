
let musicEnabled = true;
let musicContext = null;
let musicMaster = null;
let musicTimer = null;
let musicStep = 0;

const musicTempo = 240;

const dungeonMelody = [
    440, null, 523, 659, null, 587, 523, null,
    392, null, 440, 523, null, 330, 392, null,
    440, null, 523, 659, 784, null, 659, 587,
    523, null, 392, 440, null, 330, 392, null
];

const dungeonBass = [
    110, 130.81, 98, 116.54,
    110, 146.83, 98, 130.81
];

function initializeMusic() {
    if (musicContext) return true;

    const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) return false;

    musicContext = new AudioContextClass();
    musicMaster = musicContext.createGain();

    musicMaster.gain.value = 0;
    musicMaster.connect(musicContext.destination);

    return true;
}

function playMusicTone(frequency, duration, type, volume, startTime) {
    if (!musicContext || !musicMaster || !frequency) return;

    const oscillator = musicContext.createOscillator();
    const envelope = musicContext.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startTime);

    envelope.gain.setValueAtTime(0.001, startTime);
    envelope.gain.linearRampToValueAtTime(
        volume,
        startTime + 0.02
    );
    envelope.gain.exponentialRampToValueAtTime(
        0.001,
        startTime + duration
    );

    oscillator.connect(envelope);
    envelope.connect(musicMaster);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.03);
}

function playMusicStep() {
    if (!musicContext || !musicMaster) return;

    const now = musicContext.currentTime + 0.03;
    const melodyNote = dungeonMelody[musicStep];

    if (melodyNote) {
        playMusicTone(
            melodyNote,
            0.19,
            "square",
            0.17,
            now
        );
    }

    if (musicStep % 4 === 0) {
        const bassIndex = Math.floor(musicStep / 4);
        const bassNote = dungeonBass[bassIndex];

        playMusicTone(
            bassNote,
            0.65,
            "triangle",
            0.22,
            now
        );
    }

    if (musicStep % 8 === 0) {
        const padNote = dungeonBass[Math.floor(musicStep / 4)];

        playMusicTone(
            padNote * 2,
            0.85,
            "sine",
            0.045,
            now
        );
    }

    musicStep = (musicStep + 1) % dungeonMelody.length;
}

function startBackgroundMusic() {
    if (!musicEnabled || !initializeMusic()) return;

    if (musicContext.state === "suspended") {
        musicContext.resume();
    }

    musicMaster.gain.setTargetAtTime(
        0.65,
        musicContext.currentTime,
        0.15
    );

    if (musicTimer !== null) return;

    musicStep = 0;
    playMusicStep();

    musicTimer = setInterval(playMusicStep, musicTempo);
}

function stopBackgroundMusic() {
    if (musicTimer !== null) {
        clearInterval(musicTimer);
        musicTimer = null;
    }

    if (musicContext && musicMaster) {
        musicMaster.gain.setTargetAtTime(
            0,
            musicContext.currentTime,
            0.08
        );
    }
}

function toggleBackgroundMusic() {
    musicEnabled = !musicEnabled;

    if (musicEnabled) {
        startBackgroundMusic();
    } else {
        stopBackgroundMusic();
    }

    return musicEnabled;
}
