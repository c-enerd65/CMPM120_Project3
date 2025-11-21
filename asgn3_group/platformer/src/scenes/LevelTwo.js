import Player from '../gameObjects/player.js';
import Boost from '../gameObjects/boost.js';
import Foe from '../gameObjects/foe.js';

export class LevelTwo extends Phaser.Scene {
    constructor() {
        super('LevelTwo');
    }  

    create() {
        //gets total screen width
        this.width = this.sys.game.config.width;
        this.center_w = this.width / 2;

        //gets total screen height
        this.height = this.sys.game.config.height;
        this.center_h = this.height / 2;

        //add tilemap
        this.map = this.add.tilemap('tilemap_2');
        var tileset = this.map.addTilesetImage('monochromeTilemap2', 'monoTiles');
        this.map.createLayer("Background", tileset, 0, 0);
        
        //creates a new player, sets sprite scale 2x original size
        this.player = new Player(this, 0, 170);

        this.initParticles();
        this.runTrail.start();

        this.generateBoosts();
        //this.generateMobs();
        this.generateGems();

        this.mapCollisions(tileset);
        //this.movingPlatform(tileset);
        this.levelCamera();
        this.loadAudio();

        this.playAudio('theme');

        this.R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.ONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);

        this.levelCollisions();
    }

    update() {
        this.player.update();
        
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

        if(Phaser.Input.Keyboard.JustDown(this.ONE)) {
            this.scene.stop(this);
            this.stopAudio('theme');
            this.scene.start('LevelOne');
        }
    }

    mapCollisions(tileset) {
        var ground = this.map.createLayer("Base", tileset, 0, 0);
        ground.setCollisionBetween(1, this.width);
        this.physics.add.collider(ground, this.player);
        this.physics.add.collider(ground, this.foe);

        // var movingPlatform = this.map.createLayer("Platform", tileset, 0, 0);
        // movingPlatform.setCollisionBetween(1, this.width);
        // this.physics.add.collider(movingPlatform, this.player);
        // this.physics.add.collider(movingPlatform, this.foe);

        var spike = this.map.createLayer("Ouch", tileset, 0, 0);
        ground.setCollisionBetween(1, this.width);
        this.physics.add.collider(
            spike, 
            this.player, 
            this.playerFall, 
            () => {
                return true;
            },
            this
        );
    }

    // movingPlatform(movingPlatform) {
    //     this.movingPlatform = this.physics.add.image(x, y, 'Platform');
    //     this.movingPlatform.setImmovable(true); // Makes it a static body
    //     }
   

    levelCamera() {
         this.scoreText = this.add.text(this.center_w - 150, 20, `Score: ${this.player.score}`, {
            backgroundColor: '#000',
            fontFamily: 'px',
            fontSize: '16px',
            fill: '#FFF' 
        });

        this.staminaText = this.add.text(this.center_w, 20, `Stamina: ${this.player.stamina}`, {
            backgroundColor: '#000',
            fontFamily: 'px',
            fontSize: '16px',
            fill: '#FFF' 
        });

        this.livesText = this.add.text(this.center_w + 150, 20, `Lives: ${this.player.lives}`, {
            backgroundColor: '#000',
            fontFamily: 'px',
            fontSize: '16px',
            fill: '#FFF' 
        });
        
        this.playerCam = this.cameras.main.setBounds(0, 0, this.width, this.height); //creates camera var
        this.playerCam.startFollow(this.player, true, 0.5, 0.5, -200, 120); //sets camera to follow player
        this.playerCam.setZoom(1.75, 1.75); //zooms the camera in

        //this.hud = this.add.container(this.player.x, this.player.y - 50, [this.scoreText, this.staminaText, this.livesText]);
        //this.hud.setScrollFactor(0);
    }

    loadAudio() {
        this.audioFiles = {
            jump: this.sound.add('jump'),
            theme: this.sound.add('lvl1_theme')
        };
    }

    playAudio(key) {
        this.audioFiles[key].play();
    }

    stopAudio(key) {
        this.audioFiles[key].stop();
    }

    initParticles() {
        this.runTrail = this.add.particles(this.player.x, this.player.y, 'star_1', {
            quantity: 100,
            accelerationX: 1000,
            speedY: {
                min: 20,
                max: 20
            },
            speedX: {
                min: 30,
                max: 70
            },
            scale: {
                start: 0.1,
                end: 0.01,
                random: true
            },
            blendMode: 'ADD',
            frequency: -1,
            follow: this.player,
            followOffest: {},
            tint: 0xffadd2 
        });
    }

    generateBoosts() {
        this.availBoost = this.add.group();

        const bSpawn = {
            x: [50, 150],
            y: [350, 200] // place before large gap
        }

        for(let i = 0; i < bSpawn.x.length; i++) {
            let rand = Math.ceil(Math.random() * 2)
            let boost = new Boost(this, bSpawn.x[i], bSpawn.y[i], `boost_${rand}`);

            this.availBoost.add(boost);
        }
    }

    generateGems() {
        this.gems = this.add.group('gem');
        let object = this.map.getObjectLayer('Items');

        // for(var obj of object.objects) {
        //     if(obj.properties[0].name == 'value') {
        //         let gem = this.physics.add.staticSprite(obj.x, obj.y, 'gem');
        //         gem.value = obj.properties[0].value;
        //         this.gems.add(gem);
        //     }
        // }

    }

    // generateMobs() {
    //     this.foes = this.add.group();
    //     let object = this.map.getObjectLayer('Items');

    //     for(var obj of object.objects) {
    //         if(obj.properties[0].name == 'enemy') {
    //             let foe = new Foe(this, obj.x, obj.y, obj.properties[0].value);
    //             this.foes.add(foe);
    //         }
    //     }
    // }

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
        //this.sound.play();

        switch(boost.type) {
            case 'stamina':
                this.player.stamina += boost.modifier;
                break;
            case 'speed':
                this.player.boost = boost.modifier;
                this.runTrail.start();
                this.tweens.add({
                    targets: [this.player],
                    completeDelay: 1500, // duration flexible
                    onComplete: () => {
                        this.player.boost = 1;
                        this.runTrail.stop();
                    }                     
                });
                break;
        }

        boost.destroy();
    }

    playerFall() {
        this.player.playerDamaged();
    }

    resetGame() {
        this.player.destroy();

        this.scene.stop(this.scene);
        this.scene.start('LevelTwo');
    }
}