// ========================================
// ENEMIES
// ========================================

const batImage = new Image();
batImage.src = "assets/enemies/bat.png";

const skeletonImage = new Image();
skeletonImage.src = "assets/enemies/skeleton.png";

const dragonImage = new Image();
dragonImage.src = "assets/enemies/dragon.png";

const princessImage = new Image();
princessImage.src = "assets/characters/princess.png";

let enemies = [];

let dragon = null;

let princess = null;
let enemyWakeTimer = 0;

function makeEnemy(type, x, y, floor, health = 3) {
    const settings = {
        bat: {
            range: 68,
            duration: 18,
            impact: 7,
            cooldown: 55,
            speed: 1.2
        },
        skeleton: {
            range: 66,
            duration: 24,
            impact: 10,
            cooldown: 75,
            speed: 0.8
        },
        dragon: {
            range: 135,
            duration: 38,
            impact: 14,
            cooldown: 105,
            speed: 0.55
        }
    };

    const config = settings[type] || settings.bat;

    return {
        type,
        x,
        y,
        width: type === "dragon" ? 110 : 48,
        height: type === "dragon" ? 110 : 48,
        floor,
        maxHealth: health,
        health,
        alive: true,
        speed: config.speed,
        attackRange: config.range,
        attackDuration: config.duration,
        attackImpactFrame: config.impact,
        attackCooldownTime: config.cooldown,
        attackCooldown: 20,
        attackTimer: 0,
        attackHit: false,
        facingAngle: Math.PI
    };
}

function createEnemiesForFloor(floor) {
    enemies = [];
    dragon = null;
    princess = null;
    enemyWakeTimer = 100;

    if (floor === 1) {
        enemies.push(
            makeEnemy("bat", 600, 70, 1),
            makeEnemy("bat", 700, 100, 1),
            makeEnemy("bat", 600, 240, 1),
            makeEnemy("bat", 700, 300, 1),
            makeEnemy("bat", 500, 400, 1),
            makeEnemy("bat", 650, 400, 1)
        );
    }
    
    if (floor === 2) {
        enemies.push(
            makeEnemy("bat", 320, 70, 2),
            makeEnemy("bat", 500, 70, 2),
            makeEnemy("bat", 680, 100, 2),
            makeEnemy("bat", 150, 350, 2),
            makeEnemy("bat", 420, 350, 2),
            makeEnemy("bat", 650, 350, 2)
        );
    }

    if (floor === 3) {
        enemies.push(
            makeEnemy("bat", 350, 70, 3),
            makeEnemy("bat", 650, 70, 3),
            makeEnemy("bat", 700, 180, 3),
            makeEnemy("bat", 400, 300, 3),
            makeEnemy("bat", 650, 400, 3),
            makeEnemy("bat", 100, 400, 3)
        );
    }

    if (floor === 4) {
        enemies.push(
            makeEnemy("bat", 350, 60, 4),
            makeEnemy("bat", 560, 60, 4),
            makeEnemy("skeleton", 700, 90, 4),
            makeEnemy("skeleton", 350, 220, 4),
            makeEnemy("bat", 700, 320, 4),
            makeEnemy("skeleton", 100, 400, 4),
            makeEnemy("bat", 350, 400, 4)
        );
    }

    if (floor === 5) {
        enemies.push(
            makeEnemy("skeleton", 90, 370, 5),
            makeEnemy("skeleton", 710, 70, 5),
            makeEnemy("skeleton", 680, 300, 5),
            makeEnemy("skeleton", 350, 400, 5)
        );

        dragon = makeEnemy("dragon", 500, 190, 5, 10);
        enemies.push(dragon);
    }
}

function moveEnemies() {
    if (gameState !== "playing") return;

    if (enemyWakeTimer > 0) {
        enemyWakeTimer--;
        return;
    }

    const AGGRO_RANGE = 160;

    for (const enemy of enemies) {
        if (!enemy.alive || enemy.floor !== currentFloor) continue;

        if (enemy.attackCooldown > 0) {
            enemy.attackCooldown--;
        }

        if (enemy.attackTimer > 0) {
            enemy.attackTimer--;
            continue;
        }

        const targetX = player.x + player.width / 2;
        const targetY = player.y + player.height / 2;

        const centerX = enemy.x + enemy.width / 2;
        const centerY = enemy.y + enemy.height / 2;

        const dx = targetX - centerX;
        const dy = targetY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > AGGRO_RANGE || distance === 0) {
            continue;
        }

        enemy.facingAngle = Math.atan2(dy, dx);

        if (distance <= enemy.attackRange) {
            if (enemy.attackCooldown <= 0) {
                enemy.attackTimer = enemy.attackDuration;
                enemy.attackCooldown = enemy.attackCooldownTime;
                enemy.attackHit = false;
            }

            continue;
        }

        const stepX = (dx / distance) * enemy.speed;
        const stepY = (dy / distance) * enemy.speed;

        const horizontal = {
            x: enemy.x + stepX,
            y: enemy.y,
            width: enemy.width,
            height: enemy.height
        };

        let blocked = walls.some(wall => isColliding(horizontal, wall));

        if (!blocked && isInsideDungeon(horizontal)) {
            enemy.x += stepX;
        }

        const vertical = {
            x: enemy.x,
            y: enemy.y + stepY,
            width: enemy.width,
            height: enemy.height
        };

        blocked = walls.some(wall => isColliding(vertical, wall));

        if (!blocked && isInsideDungeon(vertical)) {
            enemy.y += stepY;
        }
    }
}

function checkEnemyDamage() {
    for (const enemy of enemies) {
        if (!enemy.alive || enemy.floor !== currentFloor) continue;
        if (enemy.attackTimer !== enemy.attackImpactFrame) continue;
        if (enemy.attackHit) continue;

        enemy.attackHit = true;

        const targetX = player.x + player.width / 2;
        const targetY = player.y + player.height / 2;

        const centerX = enemy.x + enemy.width / 2;
        const centerY = enemy.y + enemy.height / 2;

        const dx = targetX - centerX;
        const dy = targetY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const angleToPlayer = Math.atan2(dy, dx);
        const difference = Math.atan2(
            Math.sin(angleToPlayer - enemy.facingAngle),
            Math.cos(angleToPlayer - enemy.facingAngle)
        );

        const attackArc =
            enemy.type === "dragon" ? 0.8 :
            enemy.type === "skeleton" ? 1.05 :
            1.25;

        if (
            distance <= enemy.attackRange + 12 &&
            Math.abs(difference) <= attackArc
        ) {
            damagePlayer();
        }
    }
}

function checkPlayerAttackAgainstEnemies() {
    if (!player.attacking || player.attackHit) return;

    const attack = getAttackArea();

    for (const enemy of enemies) {
        if (!enemy.alive || enemy.floor !== currentFloor) continue;

        if (isColliding(attack, enemy)) {
            enemy.health--;
            player.attackHit = true;

            if (enemy.health <= 0) {
                enemy.health = 0;
                enemy.alive = false;

                if (enemy.type === "dragon") {
                    defeatDragon();
                }
            }

            break;
        }
    }
}

function countLivingEnemies() {
    let count = 0;

    for (const enemy of enemies) {
        if (enemy.floor === currentFloor && enemy.alive) {
            count++;
        }
    }

    return count;
}

function allEnemiesDefeated() {
    return countLivingEnemies() === 0;
}

function drawEnemy(enemy) {
    if (enemy.type === "bat") {
        if (batImage.complete && batImage.naturalWidth > 0) {
            ctx.drawImage(batImage, enemy.x, enemy.y, enemy.width, enemy.height);
        } else {
            ctx.fillStyle = "#a944ff";
            ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        }
    }

    if (enemy.type === "skeleton") {
        if (skeletonImage.complete && skeletonImage.naturalWidth > 0) {
            ctx.drawImage(skeletonImage, enemy.x, enemy.y, enemy.width, enemy.height);
        } else {
            ctx.fillStyle = "#ddd";
            ctx.fillRect(enemy.x + 10, enemy.y, 28, 48);
            ctx.fillStyle = "#111";
            ctx.fillRect(enemy.x + 15, enemy.y + 10, 6, 6);
            ctx.fillRect(enemy.x + 28, enemy.y + 10, 6, 6);
        }
    }

    if (enemy.type === "dragon") {
        if (dragonImage.complete && dragonImage.naturalWidth > 0) {
            ctx.drawImage(dragonImage, enemy.x, enemy.y, enemy.width, enemy.height);
        } else {
            ctx.fillStyle = "#b52b35";
            ctx.fillRect(enemy.x + 15, enemy.y + 25, 80, 65);
            ctx.fillStyle = "#e24b55";
            ctx.fillRect(enemy.x + 35, enemy.y, 40, 40);
            ctx.fillStyle = "#ffd84d";
            ctx.fillRect(enemy.x + 45, enemy.y + 12, 8, 8);
            ctx.fillRect(enemy.x + 62, enemy.y + 12, 8, 8);
        }
    }

    // Health bar
    drawEnemyAttackEffect(enemy);
    ctx.fillStyle = "#111";
    ctx.fillRect(enemy.x, enemy.y - 8, enemy.width, 5);

    ctx.fillStyle = enemy.type === "dragon" ? "#ff4444" : "#e33";
    ctx.fillRect(
        enemy.x,
        enemy.y - 8,
        enemy.width * (enemy.health / enemy.maxHealth),
        5
    );
}

function drawEnemyAttackEffect(enemy) {
    if (enemy.attackTimer <= 0) return;

    const progress = 1 -
        enemy.attackTimer / enemy.attackDuration;

    const centerX = enemy.x + enemy.width / 2;
    const centerY = enemy.y + enemy.height / 2;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(enemy.facingAngle);

    if (enemy.type === "bat") {
        const jawOpen = Math.max(
            1,
            Math.floor(10 * Math.sin(progress * Math.PI))
        );

        ctx.globalAlpha = 0.95;

        ctx.fillStyle = "#25132f";

        ctx.beginPath();
        ctx.moveTo(18, -5);
        ctx.lineTo(43, -jawOpen);
        ctx.lineTo(55, -3);
        ctx.lineTo(44, 1);
        ctx.lineTo(24, 1);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(18, 5);
        ctx.lineTo(43, jawOpen);
        ctx.lineTo(55, 3);
        ctx.lineTo(44, -1);
        ctx.lineTo(24, -1);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#c54683";

        ctx.beginPath();
        ctx.moveTo(24, -3);
        ctx.lineTo(44, -Math.max(1, jawOpen - 3));
        ctx.lineTo(49, -2);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(24, 3);
        ctx.lineTo(44, Math.max(1, jawOpen - 3));
        ctx.lineTo(49, 2);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#fff0d5";

        ctx.fillRect(34, -jawOpen + 1, 3, Math.min(4, jawOpen));
        ctx.fillRect(43, jawOpen - Math.min(4, jawOpen), 3, Math.min(4, jawOpen));

        if (progress > 0.75) {
            ctx.fillStyle = "#ff557e";
            ctx.fillRect(51, -3, 4, 4);
            ctx.fillRect(46, 5, 3, 3);
        }
    }

    if (enemy.type === "skeleton") {
        ctx.globalAlpha = 0.95;

        ctx.strokeStyle = "#4a332b";
        ctx.lineWidth = 9;
        ctx.beginPath();
        ctx.arc(
            20, 0, 31,
            -1.25 + progress * 0.5,
            1.0 + progress * 0.5
        );
        ctx.stroke();

        ctx.strokeStyle = "#fff0bc";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(
            20, 0, 31,
            -1.15 + progress * 0.5,
            0.85 + progress * 0.5
        );
        ctx.stroke();

        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(
            20, 0, 25,
            -1.0 + progress * 0.5,
            0.65 + progress * 0.5
        );
        ctx.stroke();

        ctx.fillStyle = "#e9f5ff";
        ctx.fillRect(43, -13, 4, 4);
        ctx.fillRect(48, 2, 3, 3);
    }

    if (enemy.type === "dragon") {
        const reach = 65 + 45 * Math.sin(progress * Math.PI);

        ctx.globalAlpha = 0.3;
        ctx.fillStyle = "#ff3825";
        ctx.beginPath();
        ctx.moveTo(37, -19);
        ctx.lineTo(reach, -27);
        ctx.lineTo(reach + 12, 0);
        ctx.lineTo(reach, 27);
        ctx.lineTo(37, 19);
        ctx.closePath();
        ctx.fill();

        ctx.globalAlpha = 0.8;
        ctx.fillStyle = "#d84220";
        ctx.beginPath();
        ctx.moveTo(40, -14);
        ctx.lineTo(reach - 6, -17);
        ctx.lineTo(reach + 5, 0);
        ctx.lineTo(reach - 6, 17);
        ctx.lineTo(40, 14);
        ctx.closePath();
        ctx.fill();

        ctx.globalAlpha = 1;
        ctx.fillStyle = "#ff9a32";
        ctx.fillRect(44, -8, Math.max(8, reach - 52), 16);

        ctx.fillStyle = "#ffdb71";
        ctx.fillRect(47, -3, Math.max(5, reach - 65), 6);

        ctx.fillStyle = "#fff0ac";
        ctx.fillRect(reach - 5, -3, 5, 5);
    }

    ctx.restore();
}

function drawEnemies() {
    for (const enemy of enemies) {
        if (!enemy.alive || enemy.floor !== currentFloor) continue;
        drawEnemy(enemy);
    }

    if (princess && princess.alive) {
        drawPrincess();
    }
}

function defeatDragon() {
    dragon.alive = false;
    princess = {
        x: 560,
        y: 280,
        width: 48,
        height: 64,
        alive: true
    };

    showMessage("The Dragon is defeated! Rescue the Princess!");
}

function drawPrincess() {
    if (
        princessImage.complete &&
        princessImage.naturalWidth > 0
    ) {
        ctx.drawImage(
            princessImage,
            princess.x,
            princess.y,
            princess.width,
            princess.height
        );
    } else {
        ctx.fillStyle = "#ff75c8";
        ctx.fillRect(
            princess.x + 10,
            princess.y + 15,
            28,
            45
        );

        ctx.fillStyle = "#ffd9b3";
        ctx.fillRect(
            princess.x + 14,
            princess.y,
            20,
            20
        );
    }

    ctx.fillStyle = "white";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
        "PRINCESS",
        princess.x + princess.width / 2,
        princess.y - 8
    );
}

function checkPrincessRescue() {
    if (!princess || !princess.alive) return;

    if (isColliding(player, princess)) {
        princess.alive = false;
        winGame();
    }
}
