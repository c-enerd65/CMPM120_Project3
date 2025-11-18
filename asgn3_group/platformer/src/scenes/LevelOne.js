import Player from '../gameObjects/player.js';
import Boost from '../gameObjects/boost.js';
import Foe from '../gameObjects/foe.js';

export class LevelOne extends Phaser.Scene{
    constructor() {
        super('LevelOne');
    }  

    create() {
        //gets total screen width
        this.width = this.sys.game.config.width;
        this.center_w = this.width / 2;

        //gets total screen height
        this.height = this.sys.game.config.height;
        this.center_h = this.height / 2;

        //add tilemap
        this.map = this.add.tilemap('tilemap_1');
        var tileset = this.map.addTilesetImage('monochromeTilemap', 'monoTiles');
        
        //creates a new player, sets sprite scale 2x original size
        this.player = new Player(this, 25, 250);

        this.initParticles();
        this.runTrail.stop();

        this.generateBoosts();
        this.generateMobs();

        this.mapCollisions(tileset);
        this.levelCamera();
        this.loadAudio();

        this.playAudio('theme');

        this.R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.TWO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);

        this.levelCollisions();
    }

    update() {
        this.player.update();
        this.foe.update();
        
        //end state for player death
        /*if(this.player.lives <= 0)
        {
            this.player.destroy();

            this.scene.stop(this.scene);
            this.scene.start('End');
        }*/

        //remove later
        if(Phaser.Input.Keyboard.JustDown(this.R)) {
            this.resetGame();
        }

        if(Phaser.Input.Keyboard.JustDown(this.TWO)) {
            this.scene.stop(this);
            this.stopAudio('theme');
            this.scene.start('LevelTwo');
        }
    }

    mapCollisions(tileset) {
        var ground = this.map.createLayer("ground", tileset, 0, 0);
        ground.setCollisionBetween(1, this.width);
        this.physics.add.collider(ground, this.player);
        this.physics.add.collider(ground, this.foe);

        var grab = this.map.createLayer("grab", tileset, 0, 0);
        grab.setCollisionBetween(1, this.width);
        this.physics.add.collider(grab, this.player);
        this.physics.add.collider(grab, this.foe);
    }

    levelCamera() {
        //playing around with the camera settings [subject to change]
        this.playerCam = this.cameras.main.setBounds(0, 0, this.width, this.height); //creates camera var
        this.playerCam.startFollow(this.player, true, 0.5, 0.5, -200, 120); //sets camera to follow player
        this.playerCam.setZoom(1.75, 1.75); //zooms the camera in
    }

    loadAudio() {
        this.audioFiles = {
            jump: this.sound.add('jump'),
            theme: this.sound.add('lvl1_theme'),
            run: this.sound.add('runBoost'),
            stamina: this.sound.add('staminaBoost')
        };
    }

    playAudio(key) {
        if(key === 'theme' || key === 'run') {
            this.audioFiles[key].play({
                loop: true
            });
        }
        else {
            this.audioFiles[key].play();
        }
    }

    stopAudio(key) {
        this.audioFiles[key].stop();
    }

    initParticles() {
        this.runTrail = this.add.particles(-8, 8, 'star', {
            quantity: 10,
            accelerationX: -500,
            accelerationY:  -200,
            speedY: {
                min: 10,
                max: 80
            },
            speedX: {
                min: 10,
                max: 150
            },
            scale: {
                start: 0.06,
                end: 0.004,
                random: true
            },
            blendMode: 'ADD',
            frequency: 100,
            follow: this.player,
            tint: 0xBAE2FF 
        });
    }

    generateBoosts() {
        this.availBoost = this.add.group();

        const bSpawn = {
            x: [50, 150],
            y: [350, 310]
        }

        for(let i = 0; i < bSpawn.x.length; i++) {
            let rand = Math.ceil(Math.random() * 2)
            let boost = new Boost(this, bSpawn.x[i], bSpawn.y[i], `boost_${rand}`);

            this.availBoost.add(boost);
        }
    }

    generateMobs() {
        this.foe = new Foe(this, 550, 350, 'lvl3_foe');
    }

    levelCollisions() {
        this.physics.add.collider(
            this.availBoost,
            this.player,
            this.playerBoost,
            () => {
                return true;
            },
            this
        );

    }

    playerBoost(boost) {
        switch(boost.type) {
            case 'stamina':
                this.player.stamina += boost.modifier;
                this.player.tint = 0xA8E477;
                this.playAudio('stamina');
                this.time.delayedCall(275, () => {
                    this.player.tint = 0xFFFFFF;
                })
                break;
            case 'speed':
                this.player.boost = boost.modifier;
                this.runTrail.start();
                this.playAudio('run');
                this.tweens.add({
                    targets: [this.player],
                    completeDelay: 2500, //duration flexible
                    onComplete: () => {
                        this.player.boost = 1;
                        this.runTrail.stop();
                        this.stopAudio('run');
                    }                     
                });
                break;
        }

        boost.destroy();
    }

    resetGame() {
        this.player.destroy();

        this.scene.stop(this.scene);
        this.stopAudio('theme');
        this.scene.start('LevelOne');
    }
}