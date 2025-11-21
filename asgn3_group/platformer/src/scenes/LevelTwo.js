import Player from '../gameObjects/player.js';
import Boost from '../gameObjects/boost.js';
import Foe from '../gameObjects/foe.js';

export class LevelTwo extends Phaser.Scene {
    constructor() {
        super('LevelTwo');
    }  

    preload() {
        this.load.image('platform', 'assets/sprites/platform.png');
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
        this.generateGems();
        //this.generateWinCon();

        this.mapCollisions(tileset);
        this.movingPlatform();
        this.levelCamera();
        this.loadAudio();

        this.playAudio('theme');

        this.R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.ONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);

        this.levelCollisions();
    }

    update() {
        this.player.update();

        this.scoreText.text = `Score: ${this.player.score}`;
        this.staminaText.text = `Stamina: ${this.player.stamina}`;
        this.livesText.text = `Lives: ${this.player.lives}`;
        
        if(this.player.lives <= 0)
        {
            this.player.destroy();
            this.sound.stopAll();

            this.scene.stop(this.scene);
            this.scene.start('End');
        }

        if (this.floor2.x >= 400) {
            this.floor2.body.setVelocityX(-50);
        }
        else if (this.floor2.x <= 350) {
            this.floor2.body.setVelocityX(50);
        }

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
        console.log("WeEEE");

        var ground = this.map.createLayer("Base", tileset, 0, 0);
        ground.setCollisionBetween(1, this.width);
        this.physics.add.collider(ground, this.player);

        var spike = this.map.createLayer("Ouch", tileset, 0, 0);
        ground.setCollisionBetween(1, this.width);
        this.physics.add.collider(spike, this.player); 
        // couldn't get my spikes to work for whatever reason :o
        
    }

    movingPlatform() {
        let floor2 = this.physics.add.existing(this.add.rectangle(400, 80, 80, 20, 0xFFFFFF))
        floor2.body.setAllowGravity(false);
        floor2.body.setImmovable(true);
     
        this.floor2 = floor2;

        this.physics.add.collider(this.player, floor2);

        }
   

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
        
        let camera = this.cameras.main.setBounds(0, 0, this.width, this.height, true); //creates camera var
        camera.startFollow(this.player, true, 0.5, 0.5, -200, 120);
        camera.setZoom(1.75, 1.75);

    }

    loadAudio() {
        this.audioFiles = {
            laser: this.sound.add('laser'),
            jump: this.sound.add('jump'),
            theme: this.sound.add('lvl1_theme'),
            run: this.sound.add('runBoost'),
            stamina: this.sound.add('staminaBoost'),
            collect: this.sound.add('collectGem'),
            collectKey: this.sound.add('collectKey'),
            playerFall: this.sound.add('playerFall'),
            playerHit: this.sound.add('playerHit'),
            enemyHit: this.sound.add('enemyHit')
        };
    }

    playAudio(key) {
        this.audioFiles[key].play();
    }

    stopAudio(key) {
        this.audioFiles[key].stop();
    }

    initParticles() {
        this.runTrail = this.add.particles(-8, 8, 'star', {
            quantity: 0.01,
            accelerationX: -50,
            speedY: {
                min: 2,
                max: 10
            },
            speedX: {
                min: 2,
                max: 10
            },
            scale: {
                start: 0.1,
                end: 0.01,
                random: true
            },
            blendMode: 'ADD',
            frequency: 15,
            follow: this.player,
            tint: 0xFFFFFF 
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
        let object = this.map.getObjectLayer('Gems');

        for(var obj of object.objects) {
             if(obj.properties[0].name == 'value') {
                 let gem = this.physics.add.staticSprite(obj.x, obj.y, 'gem');
                 gem.value = obj.properties[0].value;
                 this.gems.add(gem);
             }
        }

    }

    generateWinCon() {
        this.levelEnd = this.add.group('door');
        let object = this.map.getObjectLayer('Flag');

        for(var obj of object.objects) {
                if(obj.properties[0].name == 'door') {
                let door = this.physics.add.staticSprite(obj.x, obj.y, 'door');
                this.levelEnd.add(door);
                }
            }

        this.levelEnd.setVisible(false);
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

         this.physics.add.overlap(
            this.gems,
            this.player,
            this.collectGem,
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

     collectGem(gem) {
        this.player.score += gem.value;
        this.playAudio('collect');
        gem.destroy();
    }

    playerFall() {
        this.playAudio('playerFall');
        this.player.playerDamaged();
        this.player.lives -= 1;
        this.player.playerReset();
    }

    resetGame() {
        this.player.destroy();

        this.scene.stop(this.scene);
        this.scene.start('LevelTwo');
    }
}