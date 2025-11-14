import Player from '../gameObjects/player.js';

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
    }

    update() {
        this.player.update();
        
        if(this.player.lives <= 0)
        {
            this.player.destroy();

            this.scene.stop(this.scene);
            this.scene.start('End');
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

    resetGame() {
        this.scene.stop(this.scene);
        this.player.restartPlayer();
        this.scene.start('LevelOne');
    }
}