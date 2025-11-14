class Boost extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type = 'stamina') {
        super(scene, x, y, type);

        this.type = type;
        this.scene = scene;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setCircle(8);
        this.body.setOffset(0,1);
    }
}

export default Boost;
