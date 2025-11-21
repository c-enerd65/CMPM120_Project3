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
        var tileset = this.map.addTilesetImage('monochromeTilemap', 'monoTiles');
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

        if (this.movPlat1.x >= 320) {
            this.movPlat1.body.setVelocityX(-50);
        }
        else if (this.movPlat1.x <= 270) {
            this.movPlat1.body.setVelocityX(50);
        }

        if (this.movPlat2.x >= 150) {
            this.movPlat2.body.setVelocityX(-50);
        }
        else if (this.movPlat2.x <= 100) {
            this.movPlat2.body.setVelocityX(50);
        }

        if (this.movPlat3.x >= 1100) {
            this.movPlat3.body.setVelocityX(-50);
        }
        else if (this.movPlat3.x <= 1050) {
            this.movPlat3.body.setVelocityX(50);
        }

        if (this.movPlat4.x >= 1400) {
            this.movPlat4.body.setVelocityX(-50);
        }
        else if (this.movPlat4.x <= 1350) {
            this.movPlat4.body.setVelocityX(50);
        }

        if (this.movPlat5.x >= 1500) {
            this.movPlat5.body.setVelocityX(-50);
        }
        else if (this.movPlat5.x <= 1450) {
            this.movPlat5.body.setVelocityX(50);
        }

        if (this.movPlat6.x >= 1400) {
            this.movPlat6.body.setVelocityX(-50);
        }
        else if (this.movPlat6.x <= 1350) {
            this.movPlat6.body.setVelocityX(50);
        }

        if (this.movPlat7.x >= 1500) {
            this.movPlat7.body.setVelocityX(-50);
        }
        else if (this.movPlat7.x <= 1450) {
            this.movPlat7.body.setVelocityX(50);
        }

          if (this.movPlat8.x >= 1400) {
            this.movPlat8.body.setVelocityX(-50);
        }
        else if (this.movPlat8.x <= 1350) {
            this.movPlat8.body.setVelocityX(50);
        }

        if (this.movPlat9.x >= 1500) {
            this.movPlat9.body.setVelocityX(-50);
        }
        else if (this.movPlat9.x <= 1450) {
            this.movPlat9.body.setVelocityX(50);
        }

        // use in place of loss condition
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
        let movPlat1 = this.physics.add.existing(this.add.rectangle(320, 70, 80, 20, 0xFFFFFF))
        movPlat1.body.setAllowGravity(false);
        movPlat1.body.setImmovable(true);
        this.movPlat1 = movPlat1;
        this.physics.add.collider(this.player, movPlat1);

        let movPlat2 = this.physics.add.existing(this.add.rectangle(150, 70, 80, 20, 0xFFFFFF))
        movPlat2.body.setAllowGravity(false);
        movPlat2.body.setImmovable(true);
        this.movPlat2 = movPlat2;
        this.physics.add.collider(this.player, movPlat2);

        let movPlat3 = this.physics.add.existing(this.add.rectangle(1100, 70, 80, 20, 0xFFFFFF))
        movPlat3.body.setAllowGravity(false);
        movPlat3.body.setImmovable(true);
        this.movPlat3 = movPlat3;
        this.physics.add.collider(this.player, movPlat3);

        let movPlat4 = this.physics.add.existing(this.add.rectangle(1400, 550, 80, 20, 0xFFFFFF))
        movPlat4.body.setAllowGravity(false);
        movPlat4.body.setImmovable(true);
        this.movPlat4 = movPlat4;
        this.physics.add.collider(this.player, movPlat4);

        let movPlat5 = this.physics.add.existing(this.add.rectangle(1500, 480, 80, 20, 0xFFFFFF))
        movPlat5.body.setAllowGravity(false);
        movPlat5.body.setImmovable(true);
        this.movPlat5 = movPlat5;
        this.physics.add.collider(this.player, movPlat5);

        let movPlat6 = this.physics.add.existing(this.add.rectangle(1400, 410, 80, 20, 0xFFFFFF))
        movPlat6.body.setAllowGravity(false);
        movPlat6.body.setImmovable(true);
        this.movPlat6 = movPlat6;
        this.physics.add.collider(this.player, movPlat6);

        let movPlat7 = this.physics.add.existing(this.add.rectangle(1500, 340, 80, 20, 0xFFFFFF))
        movPlat7.body.setAllowGravity(false);
        movPlat7.body.setImmovable(true);
        this.movPlat7 = movPlat7;
        this.physics.add.collider(this.player, movPlat7);

        let movPlat8 = this.physics.add.existing(this.add.rectangle(1400, 270, 80, 20, 0xFFFFFF))
        movPlat8.body.setAllowGravity(false);
        movPlat8.body.setImmovable(true);
        this.movPlat8 = movPlat8;
        this.physics.add.collider(this.player, movPlat8);

        let movPlat9 = this.physics.add.existing(this.add.rectangle(1500, 200, 80, 20, 0xFFFFFF))
        movPlat9.body.setAllowGravity(false);
        movPlat9.body.setImmovable(true);
        this.movPlat9 = movPlat9;
        this.physics.add.collider(this.player, movPlat9);

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
        if(this.player.score == 175) {
            this.scene.stop(this);
            this.stopAudio('theme');
            this.scene.start('End');
        }
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