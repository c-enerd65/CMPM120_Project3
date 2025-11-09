import { Start } from './scenes/Start.js';
import { LevelOne } from './scenes/LevelOne.js';

const config = {
    type: Phaser.AUTO,
    title: 'Overlord Rising',
    description: '',
    parent: 'game-container',
    width: 1920,
    height: 720,
    backgroundColor: '#000000',
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 600},
            debug: true,
        },
    },
    pixelArt: true,
    scene: [
        Start, 
        LevelOne
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

new Phaser.Game(config);
            