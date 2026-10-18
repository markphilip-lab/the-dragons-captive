# The Dragon's Captive

**The Dragon's Captive** is a 2D browser-based fantasy dungeon game where players control a warrior, battle enemies, defeat a dragon boss, and rescue a captive princess.

## Game Features

- Main menu and victory screen
- WASD keyboard movement
- Spacebar or left-click to attack
- Attack animation
- Three-heart health system
- Wall collision detection
- Tile-style dungeon environment
- Five playable floors
- Five to seven enemies per floor
- Bat and skeleton enemies
- Dragon boss battle
- Locked and unlocked exit doors
- Progression based on defeating all enemies
- Game Over screen with retry and main menu options
- Princess rescue objective

## Characters and Enemies

- **Warrior** — The main playable character.
- **Princess** — The captive character the player must rescue.
- **Bat** — An enemy encountered in the dungeon.
- **Skeleton** — An enemy the warrior must defeat.
- **Dragon** — The boss guarding the princess.

## Custom Assets

You can replace the default character and enemy images with your own PNG files.

Place your image files in these folders:

```text
assets/
├── characters/
│   ├── warrior.png
│   └── princess.png
└── enemies/
    ├── bat.png
    ├── skeleton.png
    └── dragon.png
```

The game includes simple drawn fallback graphics, so it can still run when custom images are unavailable.

## How to Play

1. Open the game using a local development server, such as the Live Server extension in Visual Studio Code.
2. Start the game from the main menu.
3. Use **W, A, S, D** to move your warrior.
4. Press **Spacebar** or use the **left mouse button** to attack.
5. Defeat all enemies on each floor to unlock the exit door.
6. Continue through the dungeon floors and defeat the dragon boss.
7. Rescue the princess to complete the game.

## Requirements

- A modern web browser
- Visual Studio Code (recommended for development)
- Live Server extension or another local web server

No additional installation is required to play the game in a browser.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- PNG image assets

## How to Run

1. Download or clone this repository.
2. Open the project folder in Visual Studio Code.
3. Install the Live Server extension if you do not already have it.
4. Right-click `index.html`.
5. Select **Open with Live Server**.

The game will open in your default web browser.

## Project Purpose

This project was developed to practice fundamental web development and game development concepts, including keyboard input, mouse interaction, collision detection, character animation, enemy behavior, health management, and level progression.

## Credits

Developed as a browser-based game project. Custom artwork and additional credits can be added here as the project develops.

## License

Specify a license here if you intend to distribute or allow others to reuse the project.
