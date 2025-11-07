export class Start extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    preload() {
        this.loadGameImages();
        this.loadSpritesheets();
        this.loadGameAudio();
    }

    create() {
        this.background = this.add.sprite(640, 360, 'startScreen').setScale(3);
        this.promptPlay = this.add.sprite(640, 540, 'startPrompt');
        this.alien = this.add.sprite(640, 280, 'player').setScale(10);
        this.input.keyboard.on('keydown', () => {
            this.scene.stop('Start');
            this.scene.start('LevelOne');
        });
    }

    loadGameImages() {
        this.load.image('background', 'assets/gameMap.png');
        this.load.image('score', 'assets/scoreBar.png');
        this.load.image('startScreen', 'assets/startScreen.png');
        this.load.image('startPrompt', 'assets/pAB_logo.png');
        this.load.image('bullet_1', 'assets/donut_1.png');
        this.load.image('bullet_2', 'assets/donut_2.png');
    }

    loadSpritesheets() {
        this.load.spritesheet('player', "assets/tilemap.png", {
            frameWidth: 24, 
            frameHeight: 24
            });
        
        for(let i = 1; i < 4; i++)
        {
            this.load.spritesheet(`foe_${i}`, `assets/foeSprite_${i}.png`, {
                frameWidth: 16,
                frameHeight: 16
            });
        }
    }

    loadGameAudio() {
        this.load.audio('laser', 'assets/sound/laserRetro_001.ogg');
    }
}
