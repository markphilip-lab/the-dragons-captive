
const menuScreen = document.getElementById("menuScreen");
const gameScreen = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const victoryScreen = document.getElementById("victoryScreen");

const playButton = document.getElementById("playButton");
const retryButton = document.getElementById("retryButton");

const menuButtonFromGameOver =
    document.getElementById("menuButtonFromGameOver");

const playAgainButton =
    document.getElementById("playAgainButton");

const menuButtonFromVictory =
    document.getElementById("menuButtonFromVictory");

const healthDisplay = document.getElementById("healthDisplay");
const enemyDisplay = document.getElementById("enemyDisplay");
const floorDisplay = document.getElementById("floorDisplay");
const messageElement = document.getElementById("message");

const musicToggleButton =
    document.getElementById("musicToggleButton");

function hideAllScreens() {
    menuScreen.classList.add("hidden");
    gameScreen.classList.add("hidden");
    gameOverScreen.classList.add("hidden");
    victoryScreen.classList.add("hidden");
}

function showMainMenu() {
    gameState = "menu";

    if (typeof stopBackgroundMusic === "function") {
        stopBackgroundMusic();
    }

    hideAllScreens();
    menuScreen.classList.remove("hidden");
}

function updateMusicButton() {
    musicToggleButton.textContent =
        musicEnabled ? "MUSIC: ON" : "MUSIC: OFF";
}

playButton.addEventListener("click", startGame);
retryButton.addEventListener("click", retryGame);
playAgainButton.addEventListener("click", startGame);

menuButtonFromGameOver.addEventListener(
    "click",
    showMainMenu
);

menuButtonFromVictory.addEventListener(
    "click",
    showMainMenu
);

musicToggleButton.addEventListener("click", function() {
    const enabled = toggleBackgroundMusic();

    musicToggleButton.textContent =
        enabled ? "MUSIC: ON" : "MUSIC: OFF";
});

updateMusicButton();
