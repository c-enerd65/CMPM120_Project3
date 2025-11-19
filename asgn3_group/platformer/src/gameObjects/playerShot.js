import Bullet from './bullet.js';

class PlayerShot extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
        
        this.createMultiple({
            frameQuantity: 3,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet
        });
    }

    shootSushi(x, y) {
        this.sushi = this.getFirstDead(false);
        
        if(this.sushi){
            this.scene.playAudio('laser');
            this.sushi.fire(x, y);
        }
    }

    sushiHit() {
        this.sushi.hit = true;
    }
}

export default PlayerShot;