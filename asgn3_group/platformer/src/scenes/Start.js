export class Start extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    preload() {
        //loads all of the assets in respective folders
        this.loadFonts();
        this.loadGameImages(); //background, prompts, etcs.
        this.loadSpritesheets(); // player & foe sheets
        this.loadGameAudio(); //game audio
        this.loadMaps();
    }

    create() {
        this.loadStartScreen();
        this.createStartButtons();
        this.startButtonAction();

    }

    loadFonts() {
        this.load.font('px', 'assets/fonts/FSEX302.ttf');
    }

    loadGameImages() {
        this.load.image('background', 'assets/background.png');
        this.load.image('playButton', 'assets/playButton.png')
        this.load.image('boost_1', 'assets/sprites/boost_1.png');
        this.load.image('boost_2', 'assets/sprites/boost_2.png');
        this.load.image('key', 'assets/sprites/key.png');
        this.load.image('gem', 'assets/sprites/gem.png');
        this.load.image('wall', 'assets/sprites/wall.png');
        this.load.image('bullet', 'assets/sprites/sushi.png');
        this.load.image('star', 'assets/particles/star_07.png');
        this.load.image('plus', 'assets/particles/plusBS.png');
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
        this.load.audio('select', 'assets/sound/vgmenuselect.ogg');
        this.load.audio('startTheme', 'assets/sound/crazy-space.ogg');
        this.load.audio('jump', 'assets/sound/slime_jump.mp3');
        this.load.audio('lvl1_theme', 'assets/sound/SpaceTheme.mp3');
        this.load.audio('runBoost', 'assets/sound/uplong.mp3');
        this.load.audio('staminaBoost', 'assets/sound/upshort.mp3');
        this.load.audio('collectGem', 'assets/sound/coin9.mp3');
        this.load.audio('collectKey', 'assets/sound/keyGrab.mp3');
        this.load.audio('playerFall', 'assets/sound/SoundFallDull.mp3');
        this.load.audio('playerHit', 'assets/sound/SoundPlayerHit.mp3');
        this.load.audio('enemyHit', 'assets/sound/SoundEnemyShot.mp3');
    }

    loadMaps() {
        this.load.image('monoTiles', 'assets/map/monochrome_tilemap_packed.png');
        this.load.tilemapTiledJSON('tilemap_1', 'assets/map/map01.tmj');
        this.load.tilemapTiledJSON('tilemap_2', 'assets/map/map02.tmj');
    }

    loadStartScreen() {
        this.background = this.add.sprite(-25, -75, 'background')
        .setOrigin(0)
        .setScale(1.25);

        this.alien = this.add.sprite(305, 162, 'player')
        .setScale(1.75);

        this.donut = this.add.sprite(290, 355, 'boost_1')
        .setScale(1.75);

        this.titleText = this.add.text(180,340, 'Space    Racer', { 
            fontFamily: 'px',
            fontSize: '32px', 
            fill: '#FFF' 
        });

        this.sound.play('startTheme', {
            loop: true,
            volume: 0.5
        })
    }

    createStartButtons() {
        this.playG = this.add.sprite(0, 0, 'playButton')
        //.setOrigin(0)
        //.setScale(1.5);
        this.playGText = this.add.text(0, 0, 'Start', { 
            fontFamily: 'px',
            fontSize: '24px', 
            fill: '#000' 
        });
        this.playGText.setOrigin(0.5);
        
        this.startG = this.add.container(850, 215, [this.playG, this.playGText])
        .setSize(192, 48);

        this.playOne = this.add.sprite(0, 0, 'playButton')
        //.setOrigin(0)
        //.setScale(1.5);
        this.playOneText = this.add.text(0, 0, 'Start Level One\n\t - Cienna -', { 
            fontFamily: 'px',
            fontSize: '20px', 
            fill: '#000' 
        });
        this.playOneText.setOrigin(0.5);


        this.startOne = this.add.container(850, 320, [this.playOne, this.playOneText])
        .setSize(192, 48);

        this.playTwo = this.add.sprite(0, 0, 'playButton')
        //.setOrigin(0)
        //.setScale(1.5);
        this.playTwoText = this.add.text(0, 0, 'Start Level Two\n\t - Saira -', { 
            fontFamily: 'px',
            fontSize: '20px', 
            fill: '#000' 
        });
        this.playTwoText.setOrigin(0.5);


        this.startTwo = this.add.container(850, 425, [this.playTwo, this.playTwoText])
        .setSize(192, 48);
    }

    startButtonAction() {
        this.startG.setInteractive();
        this.startOne.setInteractive();
        this.startTwo.setInteractive();
    console.log(this.startG.input);
    this.input.enableDebug(this.startG);
    this.input.on('pointerDown', p => {
        console.log("global pointer down", p.x, p.y);
    });
        this.startG.on('pointerover', () => {
            this.tweens.add({
                targets: this.startG,
                scale: 1.15,
                ease: 'Linear',
                duration: 1000,
                yoyo: true,
                repeat: 0
            });
        });
        this.startG.on('pointerdown', () => {
            this.sound.play('select');

            this.time.delayedCall(275, () => {
                this.sound.stopAll();
                this.scene.stop(this);
                this.scene.start('LevelOne');
            });
        });

        this.startOne.on('pointerover', () => {
            this.tweens.add({
                targets: this.startOne,
                scale: 1.15,
                ease: 'Linear',
                duration: 1000,
                yoyo: true,
                repeat: 0
            });
        });

        this.startOne.on('pointerdown', () => {
            this.sound.play('select');

            this.time.delayedCall(275, () => {
                this.sound.stopAll();
                this.scene.stop(this);
                this.scene.start('LevelOne');
            });
        });

        this.startTwo.on('pointerover', () => {
            this.tweens.add({
                targets: this.startTwo,
                scale: 1.15,
                ease: 'Linear',
                duration: 1000,
                yoyo: true,
                repeat: 0
            });
        });

        this.startTwo.on('pointerdown', () => {
            this.sound.play('select');

            this.time.delayedCall(275, () => {
                this.sound.stopAll();
                this.scene.stop(this);
                this.scene.start('LevelTwo');
            });
        });
    }
}
