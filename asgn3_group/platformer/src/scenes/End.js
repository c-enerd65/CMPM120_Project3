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
            fill: '#FFF' });
    }
 }