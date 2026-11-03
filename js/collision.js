// ========================================
// COLLISION
// ========================================

function isColliding(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

function isInsideDungeon(rect) {
    return (
        rect.x >= 0 &&
        rect.y >= 0 &&
        rect.x + rect.width <= canvas.width &&
        rect.y + rect.height <= canvas.height
    );
}