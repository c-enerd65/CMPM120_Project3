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

        this.playerStartX = 15;
        this.playerStartY = 225;

        //add tilemap
        this.map = this.add.tilemap('tilemap_1');
        var tileset = this.map.addTilesetImage('monochromeTilemap', 'monoTiles');
        this.map.createLayer("background", tileset, 0, 0);
        
        //creates a new player, sets sprite scale 2x original size
        this.player = new Player(this, this.playerStartX, this.playerStartY);

        this.initParticles();
        this.runTrail.stop();

        this.generateBoosts();
        this.generateGems();
        this.generateMobs();
        this.generateWinCon();

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
        this.foes.runChildUpdate = true;

        this.scoreText.text = `Score: ${this.player.score}`;
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
            this.stopAudio('theme');
            this.scene.switch('LevelTwo');
        }
    }

    mapCollisions(tileset) {
        var ground = this.map.createLayer("ground", tileset, 0, 0);
        ground.setCollisionBetween(1, this.width);
        this.physics.add.collider(ground, this.player);
        this.physics.add.collider(ground, this.foes);

        var foe_zone = this.map.createLayer("foeZone", tileset, 0, 0);
        foe_zone.setCollisionBetween(1, this.width);
        this.physics.add.collider(foe_zone, this.foes);
        foe_zone.setVisible(false);

        var death_zone = this.map.createLayer("deathZone", tileset, 0, 0);
        death_zone.setCollisionBetween(1, this.width);
        this.physics.add.collider(
            death_zone,
            this.player,
            this.playerFall,
            () => {
                return true;
            },
            this
        );

        var spikes = this.map.createLayer("spikes", tileset, 0, 0);
        spikes.setCollisionBetween(1, this.width);
        this.physics.add.collider(
            spikes,
            this.player,
            this.playerFall,
            () => {
                return true;
            },
            this
        );
        
    }

    levelCamera() {
        this.scoreText = this.add.text(this.center_w, 20, `Score: ${this.player.score}`, {
            fontSize: '24px',
            fill: '#FFF' 
        });

        //playing around with the camera settings [subject to change]
        let camera = this.cameras.main.setBounds(0, 0, this.width, this.height, true); //creates camera var
        camera.startFollow(this.player, true, 0.5, 0.5, -200, 120);
        camera.setZoom(2, 2);

        this.hud = this.add.container(this.player.x, this.player.y, [this.scoreText]);
        this.hud.setScrollFactor(0);
    }

    loadAudio() {
        this.audioFiles = {
            laser: this.sound.add('laser'),
            jump: this.sound.add('jump'),
            theme: this.sound.add('lvl1_theme'),
            run: this.sound.add('runBoost'),
            stamina: this.sound.add('staminaBoost'),
            collect: this.sound.add('collectGem')
        };
    }

    playAudio(key) {
        if(key === 'theme') {
            this.audioFiles[key].play({
                loop: true,
                volume: 0.5
            });
        }
        else if(key === 'run') {
            this.audioFiles[key].play({
                loop: true,
                volume: 1.5
            });
        }
        else if(key === 'stamina') {
            this.audioFiles[key].play({
                volume: 2.5
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
        let object = this.map.getObjectLayer('collect');

        for(var obj of object.objects) {
            if(obj.properties[0].name == 'boost') {
                let boost = new Boost(this, obj.x, obj.y, obj.properties[0].value);
                this.availBoost.add(boost);
            }
        }
    }

    generateGems() {
        this.gems = this.add.group('gem');
        let object = this.map.getObjectLayer('collect');

        for(var obj of object.objects) {
            if(obj.properties[0].name == 'value') {
                let gem = this.physics.add.staticSprite(obj.x, obj.y, 'gem');
                gem.value = obj.properties[0].value;
                this.gems.add(gem);
            }
        }

    }

    generateMobs() {
        this.foes = this.add.group();
        let object = this.map.getObjectLayer('collect');

        for(var obj of object.objects) {
            if(obj.properties[0].name == 'enemy') {
                let foe = new Foe(this, obj.x, obj.y, obj.properties[0].value);
                this.foes.add(foe);
            }
        }
    }

    generateWinCon() {
        this.levelKey = this.add.group('key');
        this.levelBlock = this.add.group('wall');
        let object = this.map.getObjectLayer('collect');

        for(var obj of object.objects) {
            if(obj.properties[0].name == 'key') {
                let key = this.physics.add.staticImage(obj.x, obj.y, 'key');
                key.hasKey = obj.properties[0].value;
                this.levelKey.add(key);
            }
            else if(obj.properties[0].name == 'door') {
                let door = this.physics.add.staticSprite(obj.x, obj.y, 'wall');
                this.levelBlock.add(door);
            }
        }
    }

    levelCollisions() {
        this.physics.add.overlap(
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

        this.physics.add.collider(
            this.levelKey,
            this.player,
            this.getKey,
            () => {
                return true;
            },
            this
        );

        this.physics.add.overlap(
            this.levelBlock,
            this.player,
            this.checkMoveNext,
            () => {
                return true;
            },
            this
        );

        this.physics.add.collider(
            this.foes,
            this.player,
            this.playerHit,
            () => {
                return true;
            },
            this
        );

        this.physics.add.collider(
            this.foes,
            this.player.bullets,
            this.destroyFoe,
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
                    completeDelay: 3750,
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

    collectGem(gem) {
        this.player.score += gem.value;
        this.playAudio('collect');
        gem.destroy();
    }

    getKey(key) {
        this.player.hasKey = key.hasKey;
        key.destroy();
    }

    checkMoveNext() {
        if(this.player.hasKey) {
            this.stopAudio('theme');
            this.scene.switch('LevelTwo');
        }
    }

    playerFall() {
        this.player.playerDamaged();
        this.player.playerReset();
    }

    playerHit(foe) {
        this.player.playerDamaged();
        foe.destroy();
    }

    destroyFoe(foe) {
        this.player.score += foe.points;
        this.player.bullets.sushiHit();
        foe.destroy();
    }

    resetGame() {
        this.player.destroy();

        this.scene.stop(this.scene);
        this.stopAudio('theme');
        this.scene.start('LevelOne');
    }
}