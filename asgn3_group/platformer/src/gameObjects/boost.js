const BOOST_TYPE = {
    boost_1: {
        type: 'stamina',
        boost: 20
    },
    boost_2: {
        type: 'speed',
        boost: 2
    }
}

class Boost extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, name = 'boost_1') {
        super(scene, x, y, name);

        this.name = name;
        this.scene = scene;
        this.type = BOOST_TYPE[name].type;
        this.addBoost = BOOST_TYPE[name].boost;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setCircle(8.5);
        this.body.setOffset(1, 1);

        this.init();
    }

    init() {
        this.scene.tweens.add({
            targets: this,
            duration: 250,
            y: {from: this.y, to: this.y - 10},
            repeat: -1,
            yoyo: true,
            ease: 'Linear'
        })
    }
}

export default Boost;
