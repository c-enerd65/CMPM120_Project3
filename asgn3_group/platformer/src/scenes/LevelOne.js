import Player from '../gameObjects/player.js';

export class LevelOne extends Phaser.Scene{
    constructor() {
        super('LevelOne');
    }  

    create() {
        this.width = this.sys.game.config.width;
        this.center_w = this.width / 2;

        this.height = this.sys.game.config.height;
        this.center_h = this.height / 2;

        this.background = this.add.sprite(this.center_w, this.center_h, 'background').setScale(3);

        this.player = new Player(this, 0, 720).setScale(2);

        this.playerCam = this.cameras.main.setBounds(0, 0, this.width, this.height);
        this.playerCam.startFollow(this.player, true, 0.5, 0.5, -200, 120);
        this.playerCam.setZoom(1.75, 1.75);
    }

    update() {
        this.player.update();
    } 
}