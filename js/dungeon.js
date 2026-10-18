
let currentFloor = 1;

const TILE = 40;

const floorLayouts = { 
    1: [
        {x: 0, y: 0, width: 20, height: 500},
        {x: 780, y: 0, width: 20, height: 500},
        {x: 0, y: 0, width: 800, height: 20},
        {x: 0, y: 480, width: 800, height: 20},

        {x: 220, y: 120, width: 40, height: 80},
        {x: 220, y: 280, width: 40, height: 80},

        {x: 140, y: 260, width: 40, height: 40},
        {x: 140, y: 380, width: 40, height: 40},

        {x: 340, y: 120, width: 120, height: 40},
        {x: 300, y: 220, width: 40, height: 40},
        {x: 400, y: 220, width: 40, height: 40},

        {x: 300, y: 340, width: 80, height: 40},
        {x: 460, y: 340, width: 80, height: 40},

        {x: 560, y: 120, width: 80, height: 40},
        {x: 560, y: 220, width: 40, height: 40},

        {x: 640, y: 320, width: 40, height: 40},
        {x: 700, y: 360, width: 40, height: 40}
    ],

    2: [
        {x: 0, y: 0, width: 20, height: 500},
        {x: 780, y: 0, width: 20, height: 500},
        {x: 0, y: 0, width: 800, height: 20},
        {x: 0, y: 480, width: 800, height: 20},

        {x: 180, y: 120, width: 40, height: 80},
        {x: 180, y: 240, width: 40, height: 40},
        {x: 240, y: 320, width: 40, height: 40},

        {x: 320, y: 120, width: 80, height: 40},
        {x: 380, y: 200, width: 40, height: 80},
        {x: 320, y: 320, width: 80, height: 40},

        {x: 540, y: 120, width: 40, height: 40},
        {x: 600, y: 200, width: 40, height: 80},
        {x: 520, y: 320, width: 80, height: 40},
        {x: 600, y: 400, width: 40, height: 40}
    ],
        
    3: [
        {x: 0, y: 0, width: 20, height: 500},
        {x: 780, y: 0, width: 20, height: 500},
        {x: 0, y: 0, width: 800, height: 20},
        {x: 0, y: 480, width: 800, height: 20},

        {x: 180, y: 100, width: 40, height: 80},
        {x: 250, y: 220, width: 80, height: 40},
        {x: 365, y: 130, width: 40, height: 80},
        {x: 455, y: 260, width: 80, height: 40},
        {x: 555, y: 105, width: 40, height: 70},

        {x: 190, y: 335, width: 80, height: 40},
        {x: 370, y: 355, width: 80, height: 40},
        {x: 560, y: 310, width: 40, height: 80},
        {x: 650, y: 245, width: 40, height: 40}
    ],
    
    4: [
        {x: 0, y: 0, width: 20, height: 500},
        {x: 780, y: 0, width: 20, height: 500},
        {x: 0, y: 0, width: 800, height: 20},
        {x: 0, y: 480, width: 800, height: 20},

        {x: 140, y: 155, width: 60, height: 40},
        {x: 260, y: 220, width: 40, height: 60},
        {x: 330, y: 130, width: 80, height: 40},
        {x: 460, y: 205, width: 60, height: 40},
        {x: 610, y: 155, width: 40, height: 70},

        {x: 180, y: 300, width: 80, height: 40},
        {x: 440, y: 400, width: 60, height: 40},
        {x: 540, y: 310, width: 40, height: 60},
        {x: 680, y: 250, width: 40, height: 40}
    ],
    
    5: [
        {x: 0, y: 0, width: 20, height: 500},
        {x: 780, y: 0, width: 20, height: 500},
        {x: 0, y: 0, width: 800, height: 20},
        {x: 0, y: 480, width: 800, height: 20},

        {x: 150, y: 100, width: 40, height: 40},
        {x: 235, y: 170, width: 40, height: 40},

        {x: 280, y: 350, width: 80, height: 40},
        {x: 370, y: 100, width: 40, height: 40},

        {x: 650, y: 105, width: 40, height: 40},
        {x: 680, y: 390, width: 40, height: 40}
    ]
};

let walls = floorLayouts[1];

function loadFloor(number) {
    currentFloor = number;
    walls = floorLayouts[number] || floorLayouts[1];
}

function drawForgottenFloorTiles() {
    ctx.fillStyle = "#202d25";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const tileColors = [
        "#354638",
        "#304135",
        "#394a3b",
        "#324336"
    ];

    for (let y = 20, row = 0; y < canvas.height - 20; y += TILE, row++) {
        for (let x = 20, col = 0; x < canvas.width - 20; x += TILE, col++) {
            const variation = (col * 7 + row * 11) % 4;

            ctx.fillStyle = tileColors[variation];
            ctx.fillRect(x, y, TILE, TILE);

            ctx.fillStyle = "#26362c";
            ctx.fillRect(x, y, TILE, 2);
            ctx.fillRect(x, y, 2, TILE);

            ctx.fillStyle = "#435442";
            ctx.fillRect(x + 3, y + 3, TILE - 6, 1);
            ctx.fillRect(x + 3, y + 3, 1, TILE - 6);

            ctx.fillStyle = "#253329";
            ctx.fillRect(x + TILE - 2, y + 2, 2, TILE - 2);
            ctx.fillRect(x + 2, y + TILE - 2, TILE - 2, 2);

            if ((col * 3 + row * 5) % 7 === 0) {
                ctx.fillStyle = "#526047";
                ctx.fillRect(x + 6, y + 7, 8, 3);
                ctx.fillRect(x + 6, y + 10, 3, 5);

                ctx.fillStyle = "#68734a";
                ctx.fillRect(x + 9, y + 7, 4, 2);
            }

            if ((col * 5 + row * 2) % 9 === 0) {
                ctx.fillStyle = "#202e25";
                ctx.fillRect(x + 24, y + 23, 5, 3);
                ctx.fillRect(x + 21, y + 26, 3, 2);

                ctx.fillStyle = "#4a5943";
                ctx.fillRect(x + 25, y + 22, 3, 2);
            }
        }
    }

    drawFloorCracks();
    drawRubble();
}

function drawFloorCracks() {
    const cracks = [
        [95, 160],
        [395, 85],
        [690, 145],
        [225, 275],
        [450, 420],
        [640, 300],
        [150, 410],
        [515, 190]
    ];

    for (const [x, y] of cracks) {
        ctx.fillStyle = "#202f26";
        ctx.fillRect(x, y, 13, 2);
        ctx.fillRect(x + 7, y + 2, 2, 5);
        ctx.fillRect(x + 3, y + 7, 7, 2);

        ctx.fillStyle = "#475641";
        ctx.fillRect(x + 1, y - 1, 8, 1);
    }
}

function drawRubble() {
    const stones = [
        [225, 350],
        [237, 356],
        [245, 347],
        [335, 275],
        [344, 282],
        [350, 270],
        [635, 400],
        [646, 405],
        [657, 397],
        [420, 270],
        [431, 276],
        [438, 268]
    ];

    for (let i = 0; i < stones.length; i++) {
        const [x, y] = stones[i];

        ctx.fillStyle = i % 2 === 0 ? "#56604d" : "#737664";
        ctx.fillRect(x, y, 7, 5);

        ctx.fillStyle = "#303c30";
        ctx.fillRect(x, y + 4, 7, 2);

        ctx.fillStyle = "#899078";
        ctx.fillRect(x + 1, y, 3, 1);
    }
}

function drawGenericTiles() {
    ctx.fillStyle = "#252525";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < canvas.height; y += TILE) {
        for (let x = 0; x < canvas.width; x += TILE) {
            ctx.fillStyle =
                ((x / TILE + y / TILE) % 2 === 0)
                    ? "#303030"
                    : "#2a2a2a";

            ctx.fillRect(x, y, TILE, TILE);

            ctx.strokeStyle = "#383838";
            ctx.strokeRect(x, y, TILE, TILE);
        }
    }
}

function drawStoneWall(wall, wallIndex) {
    ctx.fillStyle = "#1a241e";
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);

    const brickWidth = 20;
    const brickHeight = 20;
    let row = 0;

    for (let y = wall.y; y < wall.y + wall.height; y += brickHeight, row++) {
        const offset = row % 2 === 0 ? 0 : 10;

        for (let x = wall.x - offset; x < wall.x + wall.width; x += brickWidth) {
            const left = Math.max(x, wall.x);
            const top = Math.max(y, wall.y);

            const width = Math.min(
                x + brickWidth,
                wall.x + wall.width
            ) - left;

            const height = Math.min(
                y + brickHeight,
                wall.y + wall.height
            ) - top;

            if (width <= 0 || height <= 0) continue;

            const shade =
                Math.abs(Math.floor(x / 20) + row + wallIndex) % 3;

            const colors = [
                "#566254",
                "#4b584b",
                "#606956"
            ];

            ctx.fillStyle = colors[shade];
            ctx.fillRect(left, top, width, height);

            ctx.fillStyle = "#77806a";
            ctx.fillRect(
                left + 1,
                top + 1,
                Math.max(1, width - 3),
                2
            );

            ctx.fillStyle = "#263329";
            ctx.fillRect(left, top + height - 2, width, 2);
            ctx.fillRect(left + width - 2, top, 2, height);

            if ((Math.floor(x / 20) + row + wallIndex) % 4 === 0) {
                ctx.fillStyle = "#68744d";
                ctx.fillRect(
                    left + 3,
                    top + 4,
                    Math.max(1, Math.min(7, width - 3)),
                    3
                );

                ctx.fillRect(left + 3, top + 7, 3, 4);
            }
        }
    }

    if (wall.width >= 40 && wall.height >= 80) {
        ctx.fillStyle = "#222d24";
        ctx.fillRect(wall.x + 9, wall.y + 28, 3, 16);
        ctx.fillRect(wall.x + 12, wall.y + 41, 8, 3);

        ctx.fillRect(
            wall.x + wall.width - 15,
            wall.y + wall.height - 55,
            3,
            14
        );

        ctx.fillRect(
            wall.x + wall.width - 18,
            wall.y + wall.height - 43,
            8,
            3
        );

        ctx.fillStyle = "#7a8061";
        ctx.fillRect(wall.x + 5, wall.y + 18, 6, 3);

        ctx.fillRect(
            wall.x + wall.width - 9,
            wall.y + wall.height - 30,
            5,
            3
        );
    }
}


function drawFrozenWall(wall, wallIndex) {
    ctx.fillStyle = "#152c3f";
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);

    let row = 0;

    for (let y = wall.y; y < wall.y + wall.height; y += 20, row++) {
        for (let x = wall.x; x < wall.x + wall.width; x += 20) {
            const width = Math.min(20, wall.x + wall.width - x);
            const height = Math.min(20, wall.y + wall.height - y);

            const shade = (Math.floor(x / 20) + row + wallIndex) % 3;

            const colors = [
                "#47728d",
                "#3c637d",
                "#56809a"
            ];

            ctx.fillStyle = colors[shade];
            ctx.fillRect(x, y, width, height);

            ctx.fillStyle = "#83b2c9";
            ctx.fillRect(x + 1, y + 1, Math.max(1, width - 3), 2);

            ctx.fillStyle = "#203e54";
            ctx.fillRect(x, y + height - 2, width, 2);

            if ((row + Math.floor(x / 20)) % 3 === 0) {
                ctx.fillStyle = "#b0e3f2";
                ctx.fillRect(x + 4, y + 4, 5, 2);
                ctx.fillRect(x + 4, y + 6, 2, 4);
            }
        }
    }
}


function drawIceFormation(wall, wallIndex) {
    ctx.fillStyle = "#173449";
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);

    for (let cy = wall.y; cy < wall.y + wall.height; cy += 40) {
        for (let cx = wall.x; cx < wall.x + wall.width; cx += 40) {
            const w = Math.min(40, wall.x + wall.width - cx);
            const h = Math.min(40, wall.y + wall.height - cy);

            ctx.fillStyle = "#24536d";
            ctx.fillRect(cx + 2, cy + 8, w - 4, h - 10);

            ctx.fillStyle = "#347d9e";
            ctx.beginPath();
            ctx.moveTo(cx + 2, cy + h - 3);
            ctx.lineTo(cx + 2, cy + 15);
            ctx.lineTo(cx + 10, cy + 4);
            ctx.lineTo(cx + 17, cy + 17);
            ctx.lineTo(cx + 25, cy + 6);
            ctx.lineTo(cx + w - 2, cy + 15);
            ctx.lineTo(cx + w - 2, cy + h - 3);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = "#83d8ef";
            ctx.fillRect(cx + 9, cy + 9, 3, 8);
            ctx.fillRect(cx + 25, cy + 12, 3, 5);

            ctx.fillStyle = "#c0f2ff";
            ctx.fillRect(cx + 10, cy + 7, 2, 3);

            ctx.fillStyle = "#193c53";
            ctx.fillRect(cx + 2, cy + h - 4, w - 4, 3);

            if ((wallIndex + Math.floor(cx / 40)) % 2 === 0) {
                ctx.fillStyle = "#559bb8";
                ctx.fillRect(cx + 18, cy + 25, 3, 5);
                ctx.fillRect(cx + 21, cy + 30, 5, 2);
            }
        }
    }
}


function drawWalls() {
    for (let i = 0; i < walls.length; i++) {
        const wall = walls[i];

        if (currentFloor === 1) {
            drawStoneWall(wall, i);
        } else if (currentFloor === 2) {
            const isOuterWall =
                wall.x === 0 ||
                wall.y === 0 ||
                wall.x + wall.width === canvas.width ||
                wall.y + wall.height === canvas.height;

            if (isOuterWall) {
                drawFrozenWall(wall, i);
            } else {
                drawIceFormation(wall, i);
            }
        } else if (currentFloor === 3) {
            drawCursedWall(wall, i);
        } else if (currentFloor === 4) {
            drawInfernalWall(wall, i);
        } else if (currentFloor === 5) {
            drawDragonWall(wall, i);
        } else {
            ctx.fillStyle = "#555";
            ctx.fillRect(wall.x, wall.y, wall.width, wall.height);

            ctx.fillStyle = "#444";

            for (let x = wall.x; x < wall.x + wall.width; x += 20) {
                for (let y = wall.y; y < wall.y + wall.height; y += 20) {
                    ctx.strokeRect(
                        x + 1,
                        y + 1,
                        Math.min(20, wall.x + wall.width - x - 2),
                        Math.min(20, wall.y + wall.height - y - 2)
                    );
                }
            }
        }
    }
}

function drawDragonWall(wall, wallIndex) {
    ctx.fillStyle = "#150e15";
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);

    let row = 0;

    for (let y = wall.y; y < wall.y + wall.height; y += 20, row++) {
        const offset = row % 2 === 0 ? 0 : 10;

        for (let x = wall.x - offset; x < wall.x + wall.width; x += 20) {
            const left = Math.max(x, wall.x);
            const top = Math.max(y, wall.y);

            const width = Math.min(x + 20, wall.x + wall.width) - left;
            const height = Math.min(y + 20, wall.y + wall.height) - top;

            if (width <= 0 || height <= 0) continue;

            const colors = [
                "#402731",
                "#35212b",
                "#4a2b32",
                "#302029"
            ];

            const shade =
                (Math.floor(x / 20) + row + wallIndex) % colors.length;

            ctx.fillStyle = colors[shade];
            ctx.fillRect(left, top, width, height);

            ctx.fillStyle = "#68404a";
            ctx.fillRect(left + 1, top + 1, Math.max(1, width - 3), 2);

            ctx.fillStyle = "#20141c";
            ctx.fillRect(left, top + height - 2, width, 2);

            if ((row + Math.floor(x / 20) + wallIndex) % 3 === 0) {
                ctx.fillStyle = "#a4442c";
                ctx.fillRect(left + 4, top + 7, 3, Math.min(6, height - 7));

                ctx.fillStyle = "#f07834";
                ctx.fillRect(left + 5, top + 8, 1, Math.min(3, height - 8));
            }
        }
    }
}

function drawTorch(centerX, wallY) {
    ctx.fillStyle = "#2b3428";
    ctx.fillRect(centerX - 10, wallY + 2, 20, 8);

    ctx.fillStyle = "#80502a";
    ctx.fillRect(centerX - 4, wallY + 3, 8, 16);

    ctx.fillStyle = "#b57a3a";
    ctx.fillRect(centerX - 2, wallY + 4, 3, 12);

    ctx.fillStyle = "#303a2c";
    ctx.fillRect(centerX - 7, wallY + 1, 14, 3);

    ctx.fillStyle = "#8f4f25";
    ctx.fillRect(centerX - 5, wallY - 7, 10, 10);
    ctx.fillRect(centerX - 3, wallY - 10, 6, 4);

    ctx.fillStyle = "#e49a35";
    ctx.fillRect(centerX - 3, wallY - 6, 6, 8);
    ctx.fillRect(centerX - 1, wallY - 9, 3, 5);

    ctx.fillStyle = "#ffe28a";
    ctx.fillRect(centerX - 1, wallY - 5, 2, 4);

    ctx.fillStyle = "rgba(226, 154, 53, 0.12)";
    ctx.fillRect(centerX - 18, wallY + 18, 36, 8);
    ctx.fillRect(centerX - 10, wallY + 26, 20, 7);
}

function drawForgottenDungeonDecorations() {
    drawTorch(120, 20);
    drawTorch(400, 20);
    drawTorch(680, 20);

    ctx.fillStyle = "#202b22";
    ctx.fillRect(42, 38, 214, 18);

    ctx.fillStyle = "#7d8a68";
    ctx.fillRect(44, 38, 210, 2);

    ctx.fillStyle = "#c5cba4";
    ctx.font = "bold 10px monospace";
    ctx.textAlign = "left";
    ctx.fillText("THE FORGOTTEN DUNGEON", 49, 50);

    ctx.fillStyle = "#1b291f";
    ctx.fillRect(742, 82, 15, 24);
    ctx.fillRect(738, 86, 4, 16);

    ctx.fillStyle = "#68744d";
    ctx.fillRect(744, 84, 4, 8);
    ctx.fillRect(750, 93, 5, 7);

    ctx.fillStyle = "#68744d";
    ctx.fillRect(44, 438, 17, 4);
    ctx.fillRect(50, 442, 4, 7);
    ctx.fillRect(67, 449, 13, 3);
    ctx.fillRect(704, 440, 19, 4);
    ctx.fillRect(714, 444, 4, 5);
}

function drawAncientRune() {
    const x = 480;
    const y = 240;

    ctx.fillStyle = "#2b3b2c";
    ctx.fillRect(x - 24, y - 24, 48, 48);

    ctx.fillStyle = "#65764b";
    ctx.fillRect(x - 16, y - 20, 32, 3);
    ctx.fillRect(x - 16, y + 17, 32, 3);
    ctx.fillRect(x - 20, y - 16, 3, 32);
    ctx.fillRect(x + 17, y - 16, 3, 32);

    ctx.fillStyle = "#89945b";
    ctx.fillRect(x - 3, y - 15, 6, 30);
    ctx.fillRect(x - 15, y - 3, 30, 6);

    ctx.fillStyle = "#d4bc6b";
    ctx.fillRect(x - 4, y - 4, 8, 8);

    ctx.fillStyle = "#f0d98a";
    ctx.fillRect(x - 1, y - 2, 3, 4);
}


function drawFrozenFloorTiles() {
    ctx.fillStyle = "#142633";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const colors = [
        "#263e50",
        "#2c4658",
        "#304b5d",
        "#233b4d",
        "#294253",
        "#345064"
    ];

    for (let row = 0, y = 20; y < canvas.height - 20; row++, y += TILE) {
        for (let col = 0, x = 20; x < canvas.width - 20; col++, x += TILE) {
            const shade = (row * 7 + col * 11 + row * col) % colors.length;

            ctx.fillStyle = colors[shade];
            ctx.fillRect(x, y, TILE, TILE);

            ctx.fillStyle = "#1c3344";
            ctx.fillRect(x, y, TILE, 2);
            ctx.fillRect(x, y, 2, TILE);

            ctx.fillStyle = "#3c5a6e";
            ctx.fillRect(x + 3, y + 3, TILE - 6, 1);
            ctx.fillRect(x + 3, y + 3, 1, TILE - 6);

            ctx.fillStyle = "#1c3140";
            ctx.fillRect(x + TILE - 2, y + 2, 2, TILE - 2);
            ctx.fillRect(x + 2, y + TILE - 2, TILE - 2, 2);

            if ((row * 3 + col * 5) % 6 === 0) {
                ctx.fillStyle = "#42677c";
                ctx.fillRect(x + 8, y + 12, 9, 2);
                ctx.fillRect(x + 8, y + 14, 2, 5);

                ctx.fillStyle = "#82b7ca";
                ctx.fillRect(x + 9, y + 12, 4, 1);
            }

            if ((row * 5 + col * 2) % 8 === 0) {
                ctx.fillStyle = "#618ca0";
                ctx.fillRect(x + 25, y + 26, 4, 2);
                ctx.fillRect(x + 25, y + 28, 2, 3);
            }

            if ((row + col * 3) % 9 === 0) {
                ctx.fillStyle = "#b8e8f7";
                ctx.fillRect(x + 17, y + 7, 2, 2);
                ctx.fillRect(x + 20, y + 10, 2, 1);
            }
        }
    }

    drawIceCrack(95, 180);
    drawIceCrack(440, 190);
    drawIceCrack(170, 330);
    drawIceCrack(680, 355);
    drawIceCrack(340, 430);

    drawFrozenPool(75, 355, 75, 30);
    drawFrozenPool(420, 280, 90, 32);
    drawFrozenPool(660, 165, 55, 24);
}

function drawIceCrack(x, y) {
    ctx.fillStyle = "#173347";
    ctx.fillRect(x, y, 13, 2);
    ctx.fillRect(x + 7, y + 2, 2, 7);
    ctx.fillRect(x + 2, y + 8, 7, 2);
    ctx.fillRect(x + 2, y + 10, 2, 4);
    ctx.fillRect(x + 9, y + 6, 7, 2);

    ctx.fillStyle = "#6597ae";
    ctx.fillRect(x + 2, y - 1, 7, 1);
    ctx.fillRect(x + 8, y + 3, 1, 3);
}

function drawFrozenPool(x, y, width, height) {
    ctx.fillStyle = "#193b51";
    ctx.beginPath();
    ctx.moveTo(x, y + height / 2);
    ctx.lineTo(x + 10, y + 4);
    ctx.lineTo(x + width * 0.38, y);
    ctx.lineTo(x + width * 0.60, y + 5);
    ctx.lineTo(x + width - 5, y + 3);
    ctx.lineTo(x + width, y + height * 0.55);
    ctx.lineTo(x + width - 13, y + height - 2);
    ctx.lineTo(x + width * 0.35, y + height);
    ctx.lineTo(x + 5, y + height - 6);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#28617b";
    ctx.beginPath();
    ctx.moveTo(x + 8, y + height / 2);
    ctx.lineTo(x + 15, y + 7);
    ctx.lineTo(x + width * 0.55, y + 5);
    ctx.lineTo(x + width - 10, y + 9);
    ctx.lineTo(x + width - 7, y + height * 0.55);
    ctx.lineTo(x + width * 0.65, y + height - 6);
    ctx.lineTo(x + 14, y + height - 8);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#72c4df";
    ctx.fillRect(x + 18, y + 10, Math.max(8, width / 4), 2);
    ctx.fillRect(x + 18, y + 12, 2, 4);

    ctx.fillStyle = "#bcefff";
    ctx.fillRect(x + 20, y + 9, 6, 1);
}


function drawCrystalSpike(centerX, topY, scale, height) {
    const widths = [3, 7, 11, 14, 15];
    const bandHeight = Math.max(2, Math.floor(height / widths.length));
    const colors = [
        "#b9f3ff",
        "#83d8f0",
        "#5cb5d6",
        "#3983a9",
        "#285876"
    ];

    for (let i = 0; i < widths.length; i++) {
        const w = widths[i] * scale;
        const h = i === widths.length - 1
            ? height - bandHeight * i
            : bandHeight;

        const x = centerX - w / 2;
        const y = topY + bandHeight * i;

        ctx.fillStyle = "#173448";
        ctx.fillRect(x - scale, y, w + scale * 2, h);

        ctx.fillStyle = colors[i];
        ctx.fillRect(x, y, w, h);

        ctx.fillStyle = "#d2f7ff";
        ctx.fillRect(x + scale, y, Math.max(1, scale), Math.max(1, h - scale));

        if (i > 1) {
            ctx.fillStyle = "#2f6e90";
            ctx.fillRect(x + w - scale * 2, y, scale * 2, h);
        }
    }
}

function drawIceCrystal(x, y, scale = 2) {
    ctx.fillStyle = "#193448";
    ctx.fillRect(x - 3 * scale, y + 29 * scale, 43 * scale, 5 * scale);

    ctx.fillStyle = "#477b94";
    ctx.fillRect(x, y + 29 * scale, 34 * scale, 2 * scale);

    drawCrystalSpike(x + 9 * scale, y + 12 * scale, scale, 20 * scale);
    drawCrystalSpike(x + 20 * scale, y, scale, 32 * scale);
    drawCrystalSpike(x + 31 * scale, y + 15 * scale, scale, 17 * scale);
}

function drawHangingIcicle(x, y, width, height) {
    ctx.fillStyle = "#17384c";
    ctx.fillRect(x, y, width, 4);

    const points = [
        [x + 1, y + 3],
        [x + width - 1, y + 3],
        [x + width - 3, y + height - 5],
        [x + Math.floor(width / 2), y + height],
        [x + 2, y + height - 4]
    ];

    ctx.fillStyle = "#377a99";
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#a8e7f6";
    ctx.fillRect(x + 3, y + 5, 2, Math.max(2, height - 12));

    ctx.fillStyle = "#d5f6ff";
    ctx.fillRect(x + 3, y + 5, 3, 2);
}

function drawIceRune(x, y) {
    ctx.fillStyle = "#1c3c50";
    ctx.fillRect(x - 18, y - 18, 36, 36);

    ctx.fillStyle = "#326784";
    ctx.fillRect(x - 15, y - 15, 30, 2);
    ctx.fillRect(x - 15, y + 13, 30, 2);
    ctx.fillRect(x - 15, y - 13, 2, 26);
    ctx.fillRect(x + 13, y - 13, 2, 26);

    ctx.fillStyle = "#5ab4d3";
    ctx.fillRect(x - 2, y - 11, 4, 22);
    ctx.fillRect(x - 10, y - 2, 20, 4);

    ctx.fillStyle = "#d0f5ff";
    ctx.fillRect(x - 1, y - 7, 2, 14);
    ctx.fillRect(x - 6, y - 1, 12, 2);

    ctx.fillStyle = "#8ee4f6";
    ctx.fillRect(x - 3, y - 3, 6, 6);
}

function drawFrozenDecorations() {
    ctx.fillStyle = "#102838";
    ctx.fillRect(35, 35, 235, 22);

    ctx.fillStyle = "#477b95";
    ctx.fillRect(37, 35, 231, 2);
    ctx.fillRect(37, 54, 231, 2);

    ctx.fillStyle = "#d3f3ff";
    ctx.font = "bold 10px monospace";
    ctx.textAlign = "left";
    ctx.fillText("THE FROZEN CAVERN", 43, 50);

    drawHangingIcicle(100, 20, 13, 19);
    drawHangingIcicle(280, 20, 17, 27);
    drawHangingIcicle(480, 20, 12, 16);
    drawHangingIcicle(685, 20, 16, 23);

    drawIceCrystal(65, 200, 2);
    drawIceCrystal(405, 78, 1);
    drawIceCrystal(275, 410, 1);
    drawIceCrystal(685, 395, 1);

    drawIceRune(115, 330);
    drawIceRune(455, 370);

    ctx.fillStyle = "#a4e7fa";
    ctx.fillRect(180, 90, 3, 3);
    ctx.fillRect(195, 300, 2, 2);
    ctx.fillRect(330, 180, 3, 3);
    ctx.fillRect(545, 290, 3, 3);
    ctx.fillRect(610, 360, 2, 2);
    ctx.fillRect(725, 150, 3, 3);

    ctx.fillStyle = "#e0faff";
    ctx.fillRect(183, 89, 2, 2);
    ctx.fillRect(332, 179, 1, 2);
    ctx.fillRect(547, 289, 2, 2);
}


function drawCursedFloorTiles() {
    ctx.fillStyle = "#182820";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const tiles = [
        "#304333",
        "#354a36",
        "#2c4031",
        "#394a37",
        "#293d2e",
        "#334532"
    ];

    for (let row = 0, y = 20; y < canvas.height - 20; row++, y += TILE) {
        for (let col = 0, x = 20; x < canvas.width - 20; col++, x += TILE) {
            ctx.fillStyle = tiles[(row * 5 + col * 3) % tiles.length];
            ctx.fillRect(x, y, TILE, TILE);

            ctx.fillStyle = "#1d3025";
            ctx.fillRect(x, y, TILE, 2);
            ctx.fillRect(x, y, 2, TILE);

            ctx.fillStyle = "#495a40";
            ctx.fillRect(x + 3, y + 3, TILE - 6, 1);
            ctx.fillRect(x + 3, y + 3, 1, TILE - 6);

            ctx.fillStyle = "#243529";
            ctx.fillRect(x + TILE - 2, y + 2, 2, TILE - 2);
            ctx.fillRect(x + 2, y + TILE - 2, TILE - 2, 2);

            if ((row * 7 + col * 3) % 5 === 0) {
                ctx.fillStyle = "#607148";
                ctx.fillRect(x + 5, y + 9, 9, 3);
                ctx.fillRect(x + 5, y + 12, 3, 5);

                ctx.fillStyle = "#849457";
                ctx.fillRect(x + 7, y + 9, 4, 2);
            }

            if ((row + col * 3) % 7 === 0) {
                ctx.fillStyle = "#1c3024";
                ctx.fillRect(x + 25, y + 25, 9, 2);
                ctx.fillRect(x + 29, y + 27, 2, 5);
                ctx.fillRect(x + 24, y + 32, 7, 2);
            }

            if ((row * 2 + col * 5) % 9 === 0) {
                ctx.fillStyle = "#8a9c52";
                ctx.fillRect(x + 17, y + 7, 3, 3);

                ctx.fillStyle = "#bbd66b";
                ctx.fillRect(x + 18, y + 7, 2, 1);
            }
        }
    }

    drawCursedCrack(110, 185);
    drawCursedCrack(430, 115);
    drawCursedCrack(690, 295);
    drawCursedCrack(320, 420);
    drawCursedCrack(515, 380);
}

function drawCursedCrack(x, y) {
    ctx.fillStyle = "#172820";
    ctx.fillRect(x, y, 12, 2);
    ctx.fillRect(x + 7, y + 2, 2, 7);
    ctx.fillRect(x + 3, y + 8, 6, 2);
    ctx.fillRect(x + 3, y + 10, 2, 5);

    ctx.fillStyle = "#526342";
    ctx.fillRect(x + 1, y - 1, 7, 1);
}

function drawCursedPool(x, y, width, height) {
    ctx.fillStyle = "#172a20";
    ctx.beginPath();
    ctx.moveTo(x, y + height / 2);
    ctx.lineTo(x + 9, y + 3);
    ctx.lineTo(x + width * 0.4, y);
    ctx.lineTo(x + width - 6, y + 4);
    ctx.lineTo(x + width, y + height / 2);
    ctx.lineTo(x + width - 10, y + height - 2);
    ctx.lineTo(x + 7, y + height);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#28603a";
    ctx.fillRect(x + 7, y + 5, width - 16, height - 10);
    ctx.fillRect(x + 14, y + 3, width - 26, height - 6);

    ctx.fillStyle = "#438c46";
    ctx.fillRect(x + 12, y + 7, Math.floor(width * 0.4), 3);
    ctx.fillRect(x + 20, y + 11, 9, 2);
    ctx.fillRect(x + width - 19, y + 8, 5, 3);

    ctx.fillStyle = "#a8dc57";
    ctx.fillRect(x + 15, y + 6, 5, 2);
    ctx.fillRect(x + width - 22, y + 7, 3, 2);
}

function drawCursedWall(wall, wallIndex) {
    ctx.fillStyle = "#17251d";
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);

    let row = 0;

    for (let y = wall.y; y < wall.y + wall.height; y += 20, row++) {
        const offset = row % 2 === 0 ? 0 : 10;

        for (let x = wall.x - offset; x < wall.x + wall.width; x += 20) {
            const left = Math.max(x, wall.x);
            const top = Math.max(y, wall.y);

            const width = Math.min(x + 20, wall.x + wall.width) - left;
            const height = Math.min(y + 20, wall.y + wall.height) - top;

            if (width <= 0 || height <= 0) continue;

            const colors = [
                "#485641",
                "#3e4e39",
                "#536047",
                "#344633"
            ];

            const shade =
                (Math.floor(x / 20) + row + wallIndex) % colors.length;

            ctx.fillStyle = colors[shade];
            ctx.fillRect(left, top, width, height);

            ctx.fillStyle = "#697956";
            ctx.fillRect(left + 1, top + 1, Math.max(1, width - 4), 2);

            ctx.fillStyle = "#28382a";
            ctx.fillRect(left, top + height - 2, width, 2);

            if ((row + Math.floor(x / 20) + wallIndex) % 3 === 0) {
                ctx.fillStyle = "#74884a";
                ctx.fillRect(left + 3, top + 4, Math.min(7, width - 3), 3);

                ctx.fillStyle = "#9ab45a";
                ctx.fillRect(left + 4, top + 4, 3, 1);
            }

            if ((row * 2 + Math.floor(x / 20)) % 5 === 0) {
                ctx.fillStyle = "#263629";
                ctx.fillRect(left + Math.min(10, width - 2), top + 7, 2, 6);
                ctx.fillRect(left + Math.min(10, width - 2), top + 12, 6, 2);
            }
        }
    }

    const isOuterWall =
        wall.x === 0 ||
        wall.y === 0 ||
        wall.x + wall.width === canvas.width ||
        wall.y + wall.height === canvas.height;

    if (!isOuterWall && wall.width >= 40 && wall.height >= 40) {
        const vineX = wall.x + 5;
        const vineLength = Math.min(wall.height - 6, 34);

        ctx.fillStyle = "#263c27";
        ctx.fillRect(vineX, wall.y + 3, 4, vineLength);

        ctx.fillStyle = "#607d38";

        for (let i = 0; i < vineLength; i += 9) {
            ctx.fillRect(vineX - 4, wall.y + 8 + i, 7, 3);
            ctx.fillRect(vineX + 3, wall.y + 13 + i, 7, 3);
        }

        ctx.fillStyle = "#9ab75a";
        ctx.fillRect(vineX - 2, wall.y + 9, 3, 2);
        ctx.fillRect(vineX + 5, wall.y + 14, 3, 2);
    }
}

function drawCursedRune(x, y) {
    ctx.fillStyle = "#1d3024";
    ctx.fillRect(x - 17, y - 17, 34, 34);

    ctx.fillStyle = "#42583b";
    ctx.fillRect(x - 13, y - 13, 26, 2);
    ctx.fillRect(x - 13, y + 11, 26, 2);
    ctx.fillRect(x - 13, y - 11, 2, 22);
    ctx.fillRect(x + 11, y - 11, 2, 22);

    ctx.fillStyle = "#5e963f";
    ctx.fillRect(x - 2, y - 10, 4, 20);
    ctx.fillRect(x - 10, y - 2, 20, 4);

    ctx.fillStyle = "#a4d951";
    ctx.fillRect(x - 2, y - 5, 4, 10);
    ctx.fillRect(x - 5, y - 2, 10, 4);

    ctx.fillStyle = "#d6ff83";
    ctx.fillRect(x - 1, y - 1, 2, 2);
}

function drawCursedDecorations() {
    ctx.fillStyle = "#1a2b20";
    ctx.fillRect(35, 35, 235, 22);

    ctx.fillStyle = "#637b48";
    ctx.fillRect(37, 35, 231, 2);
    ctx.fillRect(37, 54, 231, 2);

    ctx.fillStyle = "#d4e2ae";
    ctx.font = "bold 10px monospace";
    ctx.textAlign = "left";
    ctx.fillText("THE CURSED RUINS", 43, 50);

    drawCursedPool(75, 290, 65, 25);
    drawCursedPool(435, 195, 68, 27);
    drawCursedPool(675, 420, 58, 23);

    drawCursedRune(115, 235);
    drawCursedRune(420, 240);
    drawCursedRune(715, 290);

    ctx.fillStyle = "#31452d";
    ctx.fillRect(75, 390, 5, 18);
    ctx.fillRect(82, 384, 4, 24);
    ctx.fillRect(89, 394, 5, 14);

    ctx.fillStyle = "#647b3d";
    ctx.fillRect(72, 394, 6, 3);
    ctx.fillRect(82, 390, 7, 3);
    ctx.fillRect(90, 400, 6, 3);

    ctx.fillStyle = "#31452d";
    ctx.fillRect(715, 175, 4, 19);
    ctx.fillRect(722, 182, 5, 12);
    ctx.fillRect(730, 172, 4, 22);

    ctx.fillStyle = "#7c9248";
    ctx.fillRect(711, 181, 7, 3);
    ctx.fillRect(722, 186, 8, 3);
    ctx.fillRect(727, 177, 7, 3);

    ctx.fillStyle = "#a4d951";
    ctx.fillRect(168, 205, 3, 3);
    ctx.fillRect(335, 295, 2, 2);
    ctx.fillRect(535, 175, 3, 3);
    ctx.fillRect(625, 415, 2, 2);

    ctx.fillStyle = "#d6ff83";
    ctx.fillRect(169, 205, 1, 1);
    ctx.fillRect(536, 175, 1, 1);
}


function drawInfernalFloorTiles() {
    ctx.fillStyle = "#190f12";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const tiles = [
        "#302329",
        "#38262a",
        "#302126",
        "#422a2b",
        "#352327",
        "#3b2829"
    ];

    for (let row = 0, y = 20; y < canvas.height - 20; row++, y += TILE) {
        for (let col = 0, x = 20; x < canvas.width - 20; col++, x += TILE) {
            ctx.fillStyle = tiles[(row * 3 + col * 7) % tiles.length];
            ctx.fillRect(x, y, TILE, TILE);

            ctx.fillStyle = "#21171b";
            ctx.fillRect(x, y, TILE, 2);
            ctx.fillRect(x, y, 2, TILE);

            ctx.fillStyle = "#563333";
            ctx.fillRect(x + 3, y + 3, TILE - 6, 1);
            ctx.fillRect(x + 3, y + 3, 1, TILE - 6);

            ctx.fillStyle = "#241619";
            ctx.fillRect(x + TILE - 2, y + 2, 2, TILE - 2);
            ctx.fillRect(x + 2, y + TILE - 2, TILE - 2, 2);

            if ((row * 5 + col * 3) % 5 === 0) {
                ctx.fillStyle = "#6c3930";
                ctx.fillRect(x + 8, y + 11, 9, 3);
                ctx.fillRect(x + 13, y + 14, 3, 7);

                ctx.fillStyle = "#a34b2c";
                ctx.fillRect(x + 9, y + 11, 5, 2);
            }

            if ((row * 2 + col * 7) % 9 === 0) {
                ctx.fillStyle = "#9b3824";
                ctx.fillRect(x + 25, y + 27, 5, 3);

                ctx.fillStyle = "#ed7130";
                ctx.fillRect(x + 26, y + 27, 3, 1);
            }

            if ((row + col * 3) % 8 === 0) {
                ctx.fillStyle = "#f49a42";
                ctx.fillRect(x + 17, y + 7, 2, 2);
            }
        }
    }

    drawMagmaCrack(85, 185, 34);
    drawMagmaCrack(320, 285, 28);
    drawMagmaCrack(575, 110, 32);
    drawMagmaCrack(660, 400, 30);
    drawMagmaCrack(385, 435, 26);
}

function drawMagmaCrack(x, y, length) {
    ctx.fillStyle = "#4b231e";
    ctx.fillRect(x, y, length, 4);
    ctx.fillRect(x + Math.floor(length * 0.35), y + 4, 3, 7);
    ctx.fillRect(x + Math.floor(length * 0.35) - 7, y + 9, 10, 3);

    ctx.fillStyle = "#bb4825";
    ctx.fillRect(x + 2, y + 1, length - 5, 2);
    ctx.fillRect(x + Math.floor(length * 0.35) + 1, y + 4, 2, 5);
    ctx.fillRect(x + Math.floor(length * 0.35) - 5, y + 10, 7, 1);

    ctx.fillStyle = "#ff9a36";
    ctx.fillRect(x + 5, y + 1, Math.max(3, Math.floor(length / 4)), 1);
    ctx.fillRect(x + Math.floor(length * 0.35) + 1, y + 5, 1, 3);
}

function drawInfernalWall(wall, wallIndex) {
    ctx.fillStyle = "#170f13";
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);

    let row = 0;

    for (let y = wall.y; y < wall.y + wall.height; y += 20, row++) {
        const offset = row % 2 === 0 ? 0 : 10;

        for (let x = wall.x - offset; x < wall.x + wall.width; x += 20) {
            const left = Math.max(x, wall.x);
            const top = Math.max(y, wall.y);

            const width = Math.min(x + 20, wall.x + wall.width) - left;
            const height = Math.min(y + 20, wall.y + wall.height) - top;

            if (width <= 0 || height <= 0) continue;

            const colors = [
                "#4a3434",
                "#3d292d",
                "#533536",
                "#38262a"
            ];

            const shade =
                (Math.floor(x / 20) + row + wallIndex) % colors.length;

            ctx.fillStyle = colors[shade];
            ctx.fillRect(left, top, width, height);

            ctx.fillStyle = "#69413a";
            ctx.fillRect(left + 1, top + 1, Math.max(1, width - 3), 2);

            ctx.fillStyle = "#24171b";
            ctx.fillRect(left, top + height - 2, width, 2);

            if ((row + Math.floor(x / 20) + wallIndex) % 4 === 0) {
                ctx.fillStyle = "#8d3b28";
                ctx.fillRect(left + 4, top + 7, 3, Math.min(6, height - 7));

                ctx.fillStyle = "#e9662c";
                ctx.fillRect(left + 5, top + 8, 1, Math.min(3, height - 8));
            }
        }
    }

    const isOuterWall =
        wall.x === 0 ||
        wall.y === 0 ||
        wall.x + wall.width === canvas.width ||
        wall.y + wall.height === canvas.height;

    if (!isOuterWall && wall.width >= 40 && wall.height >= 40) {
        ctx.fillStyle = "#241417";
        ctx.fillRect(wall.x + 4, wall.y + 5, 4, wall.height - 10);

        ctx.fillStyle = "#963d27";
        ctx.fillRect(wall.x + 5, wall.y + 8, 2, wall.height - 16);

        ctx.fillStyle = "#f07832";
        ctx.fillRect(wall.x + 5, wall.y + 14, 1, Math.min(12, wall.height - 14));

        ctx.fillStyle = "#4a2827";
        ctx.fillRect(
            wall.x + wall.width - 9,
            wall.y + wall.height - 10,
            5,
            3
        );
    }
}

function drawMagmaVent(x, y) {
    ctx.fillStyle = "#211518";
    ctx.fillRect(x, y + 5, 30, 20);
    ctx.fillRect(x + 4, y, 22, 5);

    ctx.fillStyle = "#583027";
    ctx.fillRect(x + 3, y + 8, 24, 13);

    ctx.fillStyle = "#b84724";
    ctx.fillRect(x + 6, y + 10, 18, 8);

    ctx.fillStyle = "#f1792f";
    ctx.fillRect(x + 9, y + 10, 12, 5);

    ctx.fillStyle = "#ffc45a";
    ctx.fillRect(x + 12, y + 11, 6, 3);

    ctx.fillStyle = "#211518";
    ctx.fillRect(x + 2, y + 22, 26, 4);
}

function drawInfernalRune(x, y) {
    ctx.fillStyle = "#261719";
    ctx.fillRect(x - 17, y - 17, 34, 34);

    ctx.fillStyle = "#773628";
    ctx.fillRect(x - 13, y - 13, 26, 2);
    ctx.fillRect(x - 13, y + 11, 26, 2);
    ctx.fillRect(x - 13, y - 11, 2, 22);
    ctx.fillRect(x + 11, y - 11, 2, 22);

    ctx.fillStyle = "#c14c27";
    ctx.fillRect(x - 2, y - 10, 4, 20);
    ctx.fillRect(x - 10, y - 2, 20, 4);

    ctx.fillStyle = "#ff9c3a";
    ctx.fillRect(x - 2, y - 5, 4, 10);
    ctx.fillRect(x - 5, y - 2, 10, 4);

    ctx.fillStyle = "#ffe18a";
    ctx.fillRect(x - 1, y - 1, 2, 2);
}

function drawInfernalDecorations() {
    ctx.fillStyle = "#211518";
    ctx.fillRect(35, 35, 250, 22);

    ctx.fillStyle = "#8e4832";
    ctx.fillRect(37, 35, 246, 2);
    ctx.fillRect(37, 54, 246, 2);

    ctx.fillStyle = "#ffd0a1";
    ctx.font = "bold 10px monospace";
    ctx.textAlign = "left";
    ctx.fillText("THE INFERNAL FORTRESS", 43, 50);

    drawMagmaVent(65, 230);
    drawMagmaVent(330, 400);
    drawMagmaVent(690, 180);

    drawInfernalRune(400, 270);
    drawInfernalRune(105, 410);
    drawInfernalRune(705, 120);

    ctx.fillStyle = "#c14c27";
    ctx.fillRect(145, 95, 4, 3);
    ctx.fillRect(290, 390, 3, 3);
    ctx.fillRect(540, 150, 4, 3);
    ctx.fillRect(620, 420, 3, 3);

    ctx.fillStyle = "#ffb54a";
    ctx.fillRect(146, 95, 2, 2);
    ctx.fillRect(541, 150, 2, 2);
}


function drawDragonFloorTiles() {
    ctx.fillStyle = "#140d12";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const colors = [
        "#292027",
        "#302129",
        "#35232a",
        "#281a23",
        "#38252a",
        "#2d2028"
    ];

    for (let row = 0, y = 20; y < canvas.height - 20; row++, y += TILE) {
        for (let col = 0, x = 20; x < canvas.width - 20; col++, x += TILE) {
            ctx.fillStyle = colors[(row * 3 + col * 7) % colors.length];
            ctx.fillRect(x, y, TILE, TILE);

            ctx.fillStyle = "#1c141b";
            ctx.fillRect(x, y, TILE, 2);
            ctx.fillRect(x, y, 2, TILE);

            ctx.fillStyle = "#493039";
            ctx.fillRect(x + 3, y + 3, TILE - 6, 1);
            ctx.fillRect(x + 3, y + 3, 1, TILE - 6);

            ctx.fillStyle = "#20151c";
            ctx.fillRect(x + TILE - 2, y + 2, 2, TILE - 2);
            ctx.fillRect(x + 2, y + TILE - 2, TILE - 2, 2);

            if ((row * 5 + col * 3) % 5 === 0) {
                ctx.fillStyle = "#65302c";
                ctx.fillRect(x + 7, y + 11, 10, 3);
                ctx.fillRect(x + 12, y + 14, 3, 7);

                ctx.fillStyle = "#a3472b";
                ctx.fillRect(x + 9, y + 11, 5, 2);
            }

            if ((row * 3 + col * 7) % 8 === 0) {
                ctx.fillStyle = "#8f3927";
                ctx.fillRect(x + 26, y + 28, 5, 2);

                ctx.fillStyle = "#ed7130";
                ctx.fillRect(x + 27, y + 28, 3, 1);
            }

            if ((row + col * 2) % 9 === 0) {
                ctx.fillStyle = "#e36a32";
                ctx.fillRect(x + 17, y + 7, 2, 2);
            }
        }
    }

    drawDragonCrack(100, 165, 30);
    drawDragonCrack(250, 285, 24);
    drawDragonCrack(620, 180, 32);
    drawDragonCrack(680, 320, 25);
    drawDragonCrack(350, 415, 34);
    drawDragonCrack(205, 405, 20);
}

function drawDragonCrack(x, y, length) {
    ctx.fillStyle = "#160f15";
    ctx.fillRect(x, y, length, 4);
    ctx.fillRect(x + Math.floor(length * 0.45), y + 3, 3, 8);
    ctx.fillRect(x + Math.floor(length * 0.45) - 7, y + 9, 10, 3);

    ctx.fillStyle = "#9a3527";
    ctx.fillRect(x + 2, y + 1, length - 5, 2);
    ctx.fillRect(x + Math.floor(length * 0.45) + 1, y + 4, 2, 5);

    ctx.fillStyle = "#ff8b32";
    ctx.fillRect(x + 5, y + 1, Math.max(3, Math.floor(length / 4)), 1);
    ctx.fillRect(x + Math.floor(length * 0.45) + 1, y + 5, 1, 3);

    ctx.fillStyle = "#ffd078";
    ctx.fillRect(x + 7, y + 1, 3, 1);
}

function drawDragonDiamond(cx, cy, rx, ry, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(cx, cy - ry);
    ctx.lineTo(cx + rx, cy);
    ctx.lineTo(cx, cy + ry);
    ctx.lineTo(cx - rx, cy);
    ctx.closePath();
    ctx.fill();
}

function drawDragonArena() {
    const cx = 440;
    const cy = 255;

    drawDragonDiamond(cx, cy, 142, 106, "#21141c");
    drawDragonDiamond(cx, cy, 132, 97, "#713027");
    drawDragonDiamond(cx, cy, 126, 91, "#321c24");
    drawDragonDiamond(cx, cy, 117, 82, "#52252a");
    drawDragonDiamond(cx, cy, 108, 74, "#2a1922");

    ctx.fillStyle = "#8b392b";
    ctx.fillRect(cx - 88, cy - 2, 176, 4);
    ctx.fillRect(cx - 2, cy - 68, 4, 136);

    ctx.fillStyle = "#ca5030";
    ctx.fillRect(cx - 65, cy - 1, 130, 2);
    ctx.fillRect(cx - 1, cy - 48, 2, 96);

    ctx.fillStyle = "#f8a144";
    ctx.fillRect(cx - 3, cy - 3, 6, 6);

    ctx.fillStyle = "#ffd27a";
    ctx.fillRect(cx - 1, cy - 1, 2, 2);

    const marks = [
        [cx, cy - 78],
        [cx + 96, cy],
        [cx, cy + 78],
        [cx - 96, cy]
    ];

    for (const [x, y] of marks) {
        ctx.fillStyle = "#d65a30";
        ctx.fillRect(x - 5, y - 5, 10, 10);

        ctx.fillStyle = "#ffb84d";
        ctx.fillRect(x - 2, y - 2, 4, 4);
    }
}

function drawObsidianPillar(x, y) {
    ctx.fillStyle = "#140e15";
    ctx.fillRect(x, y + 5, 36, 36);

    ctx.fillStyle = "#39242d";
    ctx.fillRect(x + 4, y, 28, 36);

    ctx.fillStyle = "#55313a";
    ctx.fillRect(x + 6, y + 2, 24, 5);

    ctx.fillStyle = "#251821";
    ctx.fillRect(x + 9, y + 9, 18, 22);

    ctx.fillStyle = "#a3442a";
    ctx.fillRect(x + 8, y + 12, 3, 12);
    ctx.fillRect(x + 25, y + 17, 3, 8);

    ctx.fillStyle = "#f07834";
    ctx.fillRect(x + 9, y + 15, 1, 5);

    ctx.fillStyle = "#170f15";
    ctx.fillRect(x + 3, y + 34, 30, 4);
}

function drawDragonLavaPool(x, y, width, height) {
    ctx.fillStyle = "#180d13";
    ctx.beginPath();
    ctx.moveTo(x, y + height / 2);
    ctx.lineTo(x + 8, y + 3);
    ctx.lineTo(x + width * 0.4, y);
    ctx.lineTo(x + width - 6, y + 4);
    ctx.lineTo(x + width, y + height / 2);
    ctx.lineTo(x + width - 10, y + height - 3);
    ctx.lineTo(x + 8, y + height);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#8d2d20";
    ctx.fillRect(x + 8, y + 5, width - 16, height - 10);

    ctx.fillStyle = "#e85327";
    ctx.fillRect(x + 13, y + 8, width - 27, height - 16);

    ctx.fillStyle = "#ff9c32";
    ctx.fillRect(x + 18, y + 9, Math.max(5, width / 4), 3);
    ctx.fillRect(x + width - 23, y + 13, 7, 2);

    ctx.fillStyle = "#ffcf67";
    ctx.fillRect(x + 21, y + 9, 5, 2);
}

function drawDragonThrone() {
    const x = 375;
    const y = 68;

    ctx.fillStyle = "#160f15";
    ctx.fillRect(x - 8, y + 19, 76, 35);

    ctx.fillStyle = "#39212a";
    ctx.fillRect(x, y + 4, 60, 41);

    ctx.fillStyle = "#603039";
    ctx.fillRect(x + 5, y, 50, 12);

    ctx.fillStyle = "#8f3b32";
    ctx.fillRect(x + 11, y + 8, 38, 5);

    ctx.fillStyle = "#20141d";
    ctx.fillRect(x + 12, y + 14, 36, 27);

    ctx.fillStyle = "#87342a";
    ctx.fillRect(x + 19, y + 18, 22, 20);

    ctx.fillStyle = "#d7552e";
    ctx.fillRect(x + 26, y + 22, 8, 12);

    ctx.fillStyle = "#ffc15a";
    ctx.fillRect(x + 29, y + 25, 3, 5);

    ctx.fillStyle = "#8d4131";
    ctx.fillRect(x - 3, y + 43, 66, 6);

    ctx.fillStyle = "#df7135";
    ctx.fillRect(x + 3, y + 43, 54, 2);
}

function drawDragonLairDecorations() {
    ctx.fillStyle = "#21141c";
    ctx.fillRect(35, 35, 246, 22);

    ctx.fillStyle = "#8f392b";
    ctx.fillRect(37, 35, 242, 2);
    ctx.fillRect(37, 54, 242, 2);

    ctx.fillStyle = "#ffd0a1";
    ctx.font = "bold 10px monospace";
    ctx.textAlign = "left";
    ctx.fillText("THE DRAGON'S LAIR", 43, 50);

    drawDragonThrone();

    drawDragonLavaPool(56, 180, 58, 24);
    drawDragonLavaPool(235, 420, 66, 23);
    drawDragonLavaPool(665, 420, 67, 23);
    drawDragonLavaPool(700, 180, 44, 22);

    drawObsidianPillar(80, 290);
    drawObsidianPillar(695, 290);
    drawObsidianPillar(285, 88);
    drawObsidianPillar(635, 85);

    ctx.fillStyle = "#913624";
    ctx.fillRect(140, 120, 4, 3);
    ctx.fillRect(306, 178, 3, 3);
    ctx.fillRect(610, 365, 4, 3);
    ctx.fillRect(520, 410, 3, 3);

    ctx.fillStyle = "#f59a3f";
    ctx.fillRect(141, 120, 2, 2);
    ctx.fillRect(611, 365, 2, 2);
}


function drawDungeon() {
    if (currentFloor === 1) {
        drawForgottenFloorTiles();
        drawWalls();
        drawForgottenDungeonDecorations();
        drawAncientRune();
    } else if (currentFloor === 2) {
        drawFrozenFloorTiles();
        drawWalls();
        drawFrozenDecorations();
    } else if (currentFloor === 3) {
        drawCursedFloorTiles();
        drawWalls();
        drawCursedDecorations();
    } else if (currentFloor === 4) {
        drawInfernalFloorTiles();
        drawWalls();
        drawInfernalDecorations();
    } else if (currentFloor === 5) {
        drawDragonFloorTiles();
        drawDragonArena();
        drawWalls();
        drawDragonLairDecorations();
    } else {
        drawGenericTiles();
        drawWalls();
    }

    ctx.fillStyle =
        currentFloor === 1 ? "#d7dfbd" :
        currentFloor === 2 ? "#d3f0ff" :
        currentFloor === 3 ? "#d4e2ae" :
        currentFloor === 4 ? "#ffd0a1" :
        currentFloor === 5 ? "#ffd0a1" :
        "white";

    ctx.font = "bold 14px monospace";
    ctx.textAlign = "left";
    ctx.fillText("FLOOR " + currentFloor, 30, 76);
}
