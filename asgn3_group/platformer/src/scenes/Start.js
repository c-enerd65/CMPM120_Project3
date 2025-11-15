export class Start extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    preload() {
        //loads all of the assets in respective folders
        this.loadGameImages(); //background, prompts, etcs.
        this.loadSpritesheets(); // player & foe sheets
        this.loadGameAudio(); //game audio
        this.loadMaps();
    }

    create() {
        //change all - Start Screen Images
        this.background = this.add.sprite(640, 360, 'startScreen').setScale(3);
        this.promptPlay = this.add.sprite(640, 540, 'startPrompt');
        this.alien = this.add.sprite(640, 280, 'player').setScale(10);
       
        //allows any key press to move to next scene
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
        this.load.image('boost_1', 'assets/sprites/donut_1.png');
        this.load.image('boost_2', 'assets/sprites/donut_2.png');
    }

    loadSpritesheets() {
        this.load.spritesheet('player', "assets/sprites/player.png", {
            frameWidth: 24, 
            frameHeight: 24
            });
        
        for(let i = 1; i < 4; i++)
        {
            this.load.spritesheet(`lvl${i}_foe`, `assets/sprites/foe_${i}.png`, {
                frameWidth: 24,
                frameHeight: 24
            });
        }
    }

    loadGameAudio() {
        this.load.audio('laser', 'assets/sound/laserRetro_001.ogg');
        this.load.audio('jump', 'assets/sound/slime_jump.mp3');
    }

    loadMaps() {
        this.load.image('monoTiles', 'assets/map/monochrome_tilemap_packed.png');
        this.load.tilemapTiledJSON('tilemap_1', 'assets/map/map01.tmj');
    }
}
