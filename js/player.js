
const player = {
    x: 60,
    y: 60,
    width: 40,
    height: 40,
    speed: 4,
    maxHealth: 3,
    health: 3,
    damageCooldown: 0,
    hitEffectTimer: 0,
    facing: "right",
    attacking: false,
    attackTimer: 0,
    attackCooldown: 0,
    attackHit: false
};

const keys = {};

const warriorImage = new Image();
warriorImage.src = "assets/characters/warrior.png";

const playerCanvas = document.getElementById("gameCanvas");

function mapMovementKey(key) {
    const normalized = key.toLowerCase();

    const keyMap = {
        arrowup: "w",
        arrowleft: "a",
        arrowdown: "s",
        arrowright: "d"
    };

    return keyMap[normalized] || normalized;
}

document.addEventListener("keydown", function(event) {
    const key = mapMovementKey(event.key);

    if (["w", "a", "s", "d"].includes(key)) {
        keys[key] = true;
        event.preventDefault();
    }

    if (event.code === "Space") {
        event.preventDefault();

        if (!event.repeat) {
            attackPlayer();
        }
    }
});

document.addEventListener("keyup", function(event) {
    const key = mapMovementKey(event.key);
    keys[key] = false;
});

window.addEventListener("blur", function() {
    Object.keys(keys).forEach(function(key) {
        keys[key] = false;
    });
});

playerCanvas.addEventListener("mousedown", function(event) {
    if (event.button === 0) {
        attackPlayer();
    }
});

playerCanvas.addEventListener("contextmenu", function(event) {
    event.preventDefault();
});

function attackPlayer() {
    if (
        player.attacking ||
        player.attackCooldown > 0 ||
        gameState !== "playing"
    ) {
        return;
    }

    player.attacking = true;
    player.attackTimer = 12;
    player.attackCooldown = 20;
    player.attackHit = false;
}

function getAttackArea() {
    const size = 42;

    if (player.facing === "left") {
        return {
            x: player.x - size,
            y: player.y + 10,
            width: size,
            height: 44
        };
    }

    if (player.facing === "up") {
        return {
            x: player.x + 10,
            y: player.y - size,
            width: 44,
            height: size
        };
    }

    if (player.facing === "down") {
        return {
            x: player.x + 10,
            y: player.y + player.height,
            width: 44,
            height: size
        };
    }

    return {
        x: player.x + player.width,
        y: player.y + 10,
        width: size,
        height: 44
    };
}

function movePlayer() {
    if (gameState !== "playing") return;

    let newX = player.x;
    let newY = player.y;

    if (keys["a"]) {
        newX -= player.speed;
        player.facing = "left";
    }

    if (keys["d"]) {
        newX += player.speed;
        player.facing = "right";
    }

    if (keys["w"]) {
        newY -= player.speed;
        player.facing = "up";
    }

    if (keys["s"]) {
        newY += player.speed;
        player.facing = "down";
    }

    const horizontal = {
        x: newX,
        y: player.y,
        width: player.width,
        height: player.height
    };

    let blocked = walls.some(function(wall) {
        return isColliding(horizontal, wall);
    });

    if (!blocked && isInsideDungeon(horizontal)) {
        player.x = newX;
    }

    const vertical = {
        x: player.x,
        y: newY,
        width: player.width,
        height: player.height
    };

    blocked = walls.some(function(wall) {
        return isColliding(vertical, wall);
    });

    if (!blocked && isInsideDungeon(vertical)) {
        player.y = newY;
    }

    if (player.damageCooldown > 0) {
        player.damageCooldown--;
    }

    if (player.attackCooldown > 0) {
        player.attackCooldown--;
    }

    if (player.attacking) {
        player.attackTimer--;

        if (player.attackTimer <= 0) {
            player.attacking = false;
        }
    }
}

function damagePlayer(amount = 1) {
    if (player.damageCooldown > 0 || player.health <= 0) {
        return;
    }

    player.health = Math.max(0, player.health - amount);
    player.damageCooldown = 60;
    player.hitEffectTimer = 12;

    if (player.health <= 0) {
        endGame();
    }
}

function resetPlayer() {
    player.x = 60;
    player.y = 60;
    player.health = player.maxHealth;
    player.damageCooldown = 0;
    player.hitEffectTimer = 0;
    player.facing = "right";
    player.attacking = false;
    player.attackTimer = 0;
    player.attackCooldown = 0;
    player.attackHit = false;

    Object.keys(keys).forEach(function(key) {
        keys[key] = false;
    });
}

function drawAttackSlash(drawX, drawY) {
    if (!player.attacking) return;

    const progress = Math.max(
        0,
        Math.min(1, 1 - player.attackTimer / 12)
    );

    let rotation = 0;

    if (player.facing === "down") rotation = Math.PI / 2;
    if (player.facing === "left") rotation = Math.PI;
    if (player.facing === "up") rotation = -Math.PI / 2;

    const startAngle = -1.35 + progress * 0.6;
    const endAngle = -1.35 + progress * 2.7;

    ctx.save();

    ctx.translate(
        drawX + player.width / 2,
        drawY + player.height / 2
    );

    ctx.rotate(rotation);
    ctx.globalAlpha = 1 - progress * 0.35;
    ctx.lineCap = "square";

    ctx.strokeStyle = "#9b4b24";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(22, 0, 30, startAngle, endAngle);
    ctx.stroke();

    ctx.strokeStyle = "#ffd84d";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(22, 0, 30, startAngle, endAngle);
    ctx.stroke();

    ctx.strokeStyle = "#fff3b0";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(22, 0, 24, startAngle, endAngle);
    ctx.stroke();

    const drift = Math.floor(progress * 10);

    ctx.fillStyle = "#fff3b0";
    ctx.fillRect(45 + drift, -13, 4, 4);
    ctx.fillRect(39 + drift, 12, 3, 3);

    ctx.fillStyle = "#ffad36";
    ctx.fillRect(35 + drift, -21, 3, 3);
    ctx.fillRect(48 + drift, 5, 3, 3);

    ctx.restore();
}

function drawDamageEffect(drawX, drawY) {
    if (player.hitEffectTimer <= 0) return;

    const life = player.hitEffectTimer / 12;
    const spread = (12 - player.hitEffectTimer) * 1.5;

    ctx.save();
    ctx.globalAlpha = life;

    ctx.strokeStyle = "#ff3838";
    ctx.lineWidth = 3;

    ctx.strokeRect(
        drawX - 3,
        drawY - 3,
        player.width + 6,
        player.height + 6
    );

    ctx.fillStyle = "#ff3838";

    ctx.fillRect(drawX - 5 - spread, drawY + 10 - spread, 4, 4);

    ctx.fillRect(
        drawX + player.width + 1 + spread,
        drawY + 20 - spread,
        4,
        4
    );

    ctx.fillRect(
        drawX - 3 - spread,
        drawY + player.height - 12 + spread,
        4,
        4
    );

    ctx.fillRect(
        drawX + player.width + spread,
        drawY + player.height - 8 + spread,
        4,
        4
    );

    ctx.fillStyle = "#ffe1a3";
    ctx.fillRect(drawX - 2 - spread, drawY + 18, 3, 3);
    ctx.fillRect(drawX + player.width + spread, drawY + 34, 3, 3);

    ctx.restore();

    player.hitEffectTimer--;
}

function drawPlayer() {
    const blinking =
        player.damageCooldown > 0 &&
        Math.floor(player.damageCooldown / 5) % 2 === 0;

    const shakeX = player.hitEffectTimer > 0
        ? (player.hitEffectTimer % 4 < 2 ? -2 : 2)
        : 0;

    const drawX = player.x + shakeX;
    const drawY = player.y;

    ctx.save();
    ctx.globalAlpha = blinking ? 0.45 : 1;

    if (
        warriorImage.complete &&
        warriorImage.naturalWidth > 0
    ) {
        ctx.drawImage(
            warriorImage,
            drawX,
            drawY,
            player.width,
            player.height
        );
    } else {
        ctx.fillStyle = "#42ff65";
        ctx.fillRect(
            drawX,
            drawY,
            player.width,
            player.height
        );
    }

    ctx.restore();

    drawAttackSlash(drawX, drawY);
    drawDamageEffect(drawX, drawY);
}

function releaseTouchDirection(button, key) {
    keys[key] = false;
    button.classList.remove("pressed");
}

document.querySelectorAll("[data-touch-key]").forEach(function(button) {
    const key = button.dataset.touchKey;

    button.addEventListener("pointerdown", function(event) {
        event.preventDefault();

        if (gameState !== "playing") return;

        keys[key] = true;
        button.classList.add("pressed");

        try {
            button.setPointerCapture(event.pointerId);
        } catch (error) {
            releaseTouchDirection(button, key);
        }
    });

    button.addEventListener("pointerup", function(event) {
        event.preventDefault();
        releaseTouchDirection(button, key);
    });

    button.addEventListener("pointercancel", function() {
        releaseTouchDirection(button, key);
    });

    button.addEventListener("lostpointercapture", function() {
        releaseTouchDirection(button, key);
    });
});

const touchAttackButton = document.getElementById("touchAttackButton");

touchAttackButton.addEventListener("pointerdown", function(event) {
    event.preventDefault();

    if (gameState !== "playing") return;

    touchAttackButton.classList.add("pressed");

    try {
        touchAttackButton.setPointerCapture(event.pointerId);
    } catch (error) {
        touchAttackButton.classList.remove("pressed");
    }

    attackPlayer();
});

function releaseTouchAttack() {
    touchAttackButton.classList.remove("pressed");
}

touchAttackButton.addEventListener("pointerup", releaseTouchAttack);
touchAttackButton.addEventListener("pointercancel", releaseTouchAttack);
touchAttackButton.addEventListener("lostpointercapture", releaseTouchAttack);
