import { Start } from './scenes/Start.js';
import { LevelOne } from './scenes/LevelOne.js';
import { LevelTwo } from './scenes/LevelTwo.js';
import { End } from './scenes/End.js';

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
            debug: false,
        },
    },
    pixelArt: true,
    scene: [
        Start, 
        LevelOne,
        LevelTwo,
        End
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

new Phaser.Game(config);
            