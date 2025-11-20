 export class End extends Phaser.Scene {
    constructor() {
        super('End');
    }

    create() {
        this.add.sprite(960, 360, 'player')
        .setScale(5);

        this.add.text(850, 500, 'GAME OVER', { 
            fontFamily: 'px',
            fontSize: '50px', 
            fill: '#FFF' 
        });

        this.R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.R)) {
            this.resetGame();
        }
    }

    resetGame() {
        this.scene.stop(this.scene);
        this.scene.start('Start');
    }
 }