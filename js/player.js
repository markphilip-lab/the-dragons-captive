const player = {
    x: 60,
    y: 60,
    width: 38,
    height: 38,
    speed: 4,
    maxHealth: 10,
    health: 10,
    damageCooldown: 0,
    hitEffectTimer: 0,
    facing: "right",
    attacking: false,
    attackTimer: 0,
    attackCooldown: 0,
    attackHit: false
};

const keys = {};

const joystick = {
    x: 0,
    y: 0,
    active: false,
    pointerId: null
};

const warriorImage = new Image();
warriorImage.src = "assets/characters/warrior.png";

const playerCanvas = document.getElementById("gameCanvas");
const joystickBase = document.getElementById("moveJoystick");
const joystickKnob = document.getElementById("joystickKnob");
const touchAttackButton = document.getElementById("touchAttackButton");

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

    resetJoystick();
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

    let moveX = 0;
    let moveY = 0;

    if (keys["a"]) moveX -= 1;
    if (keys["d"]) moveX += 1;
    if (keys["w"]) moveY -= 1;
    if (keys["s"]) moveY += 1;

    moveX += joystick.x;
    moveY += joystick.y;

    const magnitude = Math.sqrt(
        moveX * moveX + moveY * moveY
    );

    if (magnitude > 1) {
        moveX /= magnitude;
        moveY /= magnitude;
    }

    if (moveX < -0.15) {
        player.facing = "left";
    } else if (moveX > 0.15) {
        player.facing = "right";
    }

    if (moveY < -0.15) {
        player.facing = "up";
    } else if (moveY > 0.15) {
        player.facing = "down";
    }

    const newX = player.x + moveX * player.speed;
    const newY = player.y + moveY * player.speed;

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

/* Virtual joystick */

function updateJoystickPosition(clientX, clientY) {
    const rect = joystickBase.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const maxDistance = Math.max(
        1,
        (rect.width - joystickKnob.offsetWidth) / 2 - 6
    );

    let dx = clientX - centerX;
    let dy = clientY - centerY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > maxDistance) {
        dx = (dx / distance) * maxDistance;
        dy = (dy / distance) * maxDistance;
    }

    joystick.x = dx / maxDistance;
    joystick.y = dy / maxDistance;

    joystickKnob.style.left = "calc(50% + " + dx + "px)";
    joystickKnob.style.top = "calc(50% + " + dy + "px)";
}

function resetJoystick() {
    joystick.x = 0;
    joystick.y = 0;
    joystick.active = false;
    joystick.pointerId = null;

    if (joystickKnob) {
        joystickKnob.style.left = "50%";
        joystickKnob.style.top = "50%";
    }
}

if (joystickBase && joystickKnob) {
    joystickBase.addEventListener("pointerdown", function(event) {
        event.preventDefault();

        if (gameState !== "playing") return;

        joystick.active = true;
        joystick.pointerId = event.pointerId;

        try {
            joystickBase.setPointerCapture(event.pointerId);
        } catch (error) {
            resetJoystick();
            return;
        }

        updateJoystickPosition(event.clientX, event.clientY);
    });

    joystickBase.addEventListener("pointermove", function(event) {
        if (
            !joystick.active ||
            event.pointerId !== joystick.pointerId
        ) {
            return;
        }

        event.preventDefault();

        updateJoystickPosition(event.clientX, event.clientY);
    });

    joystickBase.addEventListener("pointerup", function(event) {
        if (event.pointerId !== joystick.pointerId) return;

        event.preventDefault();
        resetJoystick();
    });

    joystickBase.addEventListener("pointercancel", function() {
        resetJoystick();
    });

    joystickBase.addEventListener("lostpointercapture", function() {
        resetJoystick();
    });
}

/* Player damage */

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

/* Reset player */

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

    resetJoystick();
}

/* Attack animation */

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

/* Damage animation */

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

    ctx.fillRect(
        drawX - 5 - spread,
        drawY + 10 - spread,
        4,
        4
    );

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

/* Draw player */

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

/* Mobile attack button */

if (touchAttackButton) {
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
}