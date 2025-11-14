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
        this.player = new Player(this, 0, 250);

        this.mapCollisions(tileset);
        this.levelCamera();

        this.generateBoosts();
        this.generateMobs();

        this.R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

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
    }

    mapCollisions(tileset) {
        var ground = this.map.createLayer("ground", tileset, 0, 0);
        ground.setCollisionBetween(1, this.width);
        this.physics.add.collider(ground, this.player);

        var grab = this.map.createLayer("grab", tileset, 0, 0);
        grab.setCollisionBetween(1, this.width);
        this.physics.add.collider(grab, this.player);
    }

    levelCamera() {
        //playing around with the camera settings [subject to change]
        this.playerCam = this.cameras.main.setBounds(0, 0, this.width, this.height); //creates camera var
        this.playerCam.startFollow(this.player, true, 0.5, 0.5, -200, 120); //sets camera to follow player
        this.playerCam.setZoom(1.75, 1.75); //zooms the camera in
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
        const foePath = () => {
            this.path = new Phaser.Curves.Path(450, 400);
            this.path.lineTo(650, 400);
        }

        foePath()
        this.graphics = this.add.graphics();
        this.path.draw(this.graphics);

        this.foe = new Foe(this, this.path, 550, 340);
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
        //this.sound.play();

        switch(boost.type) {
            case 'stamina':
                this.player.stamina += boost.modifier;
                break;
            case 'speed':
                this.player.boost = boost.modifier;
                this.tweens.add({
                    targets: [this.player],
                    completeDelay: 1500, //duration flexible
                    onComplete: () => {
                        this.player.boost = 1;
                    }                     
                });
                break;
        }

        boost.destroy();
    }

    resetGame() {
        this.player.destroy();

        this.scene.stop(this.scene);
        this.scene.start('LevelOne');
    }
}