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

        //adds a defualt bg for testing
        //will change
        this.background = this.add.sprite(this.center_w, this.center_h, 'background').setScale(3);

        //creates a new player, sets sprite scale 2x original size
        this.player = new Player(this, 0, 720).setScale(2);

        //playing around with the camera settings [subject to change]
        this.playerCam = this.cameras.main.setBounds(0, 0, this.width, this.height); //creates camera var
        this.playerCam.startFollow(this.player, true, 0.5, 0.5, -200, 120); //sets camera to follow player
        this.playerCam.setZoom(1.75, 1.75); //zooms the camera in
    }

    update() {
        this.player.update();
    } 
}