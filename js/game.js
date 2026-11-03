const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;

let gameState = "menu";

const exitDoor = {
    x: 730,
    y: 210,
    width: 40,
    height: 80,
    locked: true
};

let messageTimer = 0;

function showMessage(text) {
    messageElement.textContent = text;
    messageTimer = 150;
}

function startGame() {
    gameState = "playing";

    loadFloor(1);
    resetPlayer();
    createEnemiesForFloor(1);

    exitDoor.locked = true;
    messageTimer = 0;

    hideAllScreens();
    gameScreen.classList.remove("hidden");

    updateHUD();

    if (musicEnabled) {
        startBackgroundMusic();
    }
}

function resetCurrentFloor() {
    resetPlayer();
    createEnemiesForFloor(currentFloor);
    exitDoor.locked = true;
}

function updateExitDoor() {
    if (currentFloor === 5) {
        exitDoor.locked = true;
        return;
    }

    exitDoor.locked = !allEnemiesDefeated();
}

function checkDoorTransition() {
    if (exitDoor.locked) return;

    if (!isColliding(player, exitDoor)) return;

    if (currentFloor < 5) {
        currentFloor++;

        loadFloor(currentFloor);
        resetCurrentFloor();

        showMessage("Floor " + currentFloor + "!");
    }
}

function drawExitDoor() {
    if (currentFloor === 5) return;

    if (exitDoor.locked) {
        ctx.fillStyle = "#5a3a22";
        ctx.fillRect(
            exitDoor.x,
            exitDoor.y,
            exitDoor.width,
            exitDoor.height
        );

        ctx.strokeStyle = "#222";
        ctx.lineWidth = 4;
        ctx.strokeRect(
            exitDoor.x,
            exitDoor.y,
            exitDoor.width,
            exitDoor.height
        );

        ctx.fillStyle = "#ffd84d";
        ctx.fillRect(
            exitDoor.x + 15,
            exitDoor.y + 35,
            10,
            14
        );

        ctx.fillStyle = "white";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
            "LOCKED",
            exitDoor.x + 20,
            exitDoor.y - 8
        );
    } else {
        ctx.fillStyle = "#111";
        ctx.fillRect(
            exitDoor.x,
            exitDoor.y,
            exitDoor.width,
            exitDoor.height
        );

        ctx.strokeStyle = "#ffd84d";
        ctx.lineWidth = 4;
        ctx.strokeRect(
            exitDoor.x,
            exitDoor.y,
            exitDoor.width,
            exitDoor.height
        );

        ctx.fillStyle = "#ffd84d";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
            "OPEN",
            exitDoor.x + 20,
            exitDoor.y - 8
        );
    }
}

function updateHUD() {
    const healthRatio = player.health / player.maxHealth;

    healthDisplay.style.width = (healthRatio * 100) + "%";
    healthDisplay.style.backgroundColor =
        healthRatio > 0.5 ? "#55bd68" :
        healthRatio > 0.25 ? "#e0b84f" :
        "#e34a4a";

    healthDisplay.parentElement.setAttribute("aria-valuenow", player.health);

    enemyDisplay.textContent =
        "Enemies: " + countLivingEnemies();

    floorDisplay.textContent =
        "Floor " + currentFloor;
}

function endGame() {
    if (gameState !== "playing") return;

    gameState = "gameover";

    if (typeof stopBackgroundMusic === "function") {
        stopBackgroundMusic();
    }

    gameScreen.classList.add("hidden");
    gameOverScreen.classList.remove("hidden");
}

function retryGame() {
    startGame();
}

function winGame() {
    if (gameState !== "playing") return;

    gameState = "victory";

    if (typeof stopBackgroundMusic === "function") {
        stopBackgroundMusic();
    }

    gameScreen.classList.add("hidden");
    victoryScreen.classList.remove("hidden");
}

function gameLoop() {
    if (gameState === "playing") {
        drawDungeon();

        movePlayer();
        moveEnemies();

        checkEnemyDamage();
        checkPlayerAttackAgainstEnemies();

        updateExitDoor();
        checkDoorTransition();
        checkPrincessRescue();

        drawExitDoor();
        drawEnemies();
        drawPlayer();

        updateHUD();

        if (messageTimer > 0) {
            messageTimer--;
        } else {
            messageElement.textContent =
                exitDoor.locked && currentFloor < 5
                    ? "Defeat all enemies to open the door."
                    : currentFloor === 5 && dragon && dragon.alive
                        ? "Defeat the Dragon!"
                        : currentFloor === 5
                            ? "Find the Princess!"
                            : "";
        }
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();
