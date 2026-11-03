let musicEnabled = true;
let musicContext = null;
let musicMaster = null;
let musicTimer = null;
let musicStep = 0;

const musicTempo = 360;

const dungeonMelody = [
    74, null, 77, null, 81, 79, 77, null,
    72, null, 74, 77, null, 70, 69, null,
    74, null, 77, 81, 84, null, 81, 79,
    77, null, 74, 72, null, 69, 70, null
];

const dungeonChords = [
    [50, 53, 57],
    [46, 50, 53],
    [41, 45, 48],
    [48, 52, 55]
];

const dungeonBass = [38, 34, 41, 36];

function midiToFrequency(note) {
    return 440 * Math.pow(2, (note - 69) / 12);
}

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

function playMusicTone(
    frequency,
    duration,
    type,
    volume,
    startTime,
    cutoff = 2600
) {
    if (!musicContext || !musicMaster || !frequency) return;

    const oscillator = musicContext.createOscillator();
    const envelope = musicContext.createGain();
    const filter = musicContext.createBiquadFilter();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startTime);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(cutoff, startTime);

    envelope.gain.setValueAtTime(0.001, startTime);
    envelope.gain.linearRampToValueAtTime(
        volume,
        startTime + 0.08
    );
    envelope.gain.exponentialRampToValueAtTime(
        0.001,
        startTime + duration
    );

    oscillator.connect(filter);
    filter.connect(envelope);
    envelope.connect(musicMaster);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.05);
}

function playDungeonPad(chord, startTime) {
    chord.forEach(function(note) {
        playMusicTone(
            midiToFrequency(note),
            2.65,
            "sine",
            0.035,
            startTime,
            1100
        );
    });
}

function playMusicStep() {
    if (!musicContext || !musicMaster) return;

    const now = musicContext.currentTime + 0.04;
    const melodyNote = dungeonMelody[musicStep];

    if (melodyNote !== null) {
        playMusicTone(
            midiToFrequency(melodyNote),
            0.29,
            "triangle",
            0.085,
            now,
            1900
        );
    }

    if (musicStep % 8 === 0) {
        const bar = Math.floor(musicStep / 8);
        const chord = dungeonChords[bar % dungeonChords.length];
        const bassNote = dungeonBass[bar % dungeonBass.length];

        playDungeonPad(chord, now);

        playMusicTone(
            midiToFrequency(bassNote),
            1.25,
            "triangle",
            0.14,
            now,
            500
        );
    }

    if (musicStep % 8 === 4) {
        const bassNote =
            dungeonBass[Math.floor(musicStep / 8) % dungeonBass.length];

        playMusicTone(
            midiToFrequency(bassNote + 12),
            0.55,
            "sine",
            0.045,
            now,
            650
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
        0.42,
        musicContext.currentTime,
        0.3
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
            0.12
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
