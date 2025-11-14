const FOE_TYPE = {
    lvl1_foe: {
        damage: 1,
        points: 5
    },
    lvl2_foe: {
        damage: 2,
        points: 10
    }
}

class Foes extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, x, y, name = 'foe_1', velX = 150) {
        super(scene, path, x, y, name);

        this.name = name;
        this.scene = scene;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(true);
        this.body.setCircle(8);
        this.body.setOffset(0,1);
        
        this.velX = velX;

        this.damage = FOE_TYPE[name].damage;
        this.points = FOE_TYPE[name].points;

        this.startFollow({
            duration: 1000,
            repeat: 0
        });

        this.init();
    }

    init() {
        this.scene.anims.create({
            key: `${this.name}_walk`,
            frames: this.anims.generateFrameNumbers(this.name, {
            frames: []
            }),
            frameRate: 3,
            repeat: -1,
            yoyo: true
        }); 
    }

    preUpdate(time, delta) {
        if(!this.isFollowing() || this.y > 740)
        {
            this.destroy();
        }

        this.checkBlocked();
    }

    checkBlocked() {
        if(this.body.blocked.left) {
            this.body.setVelocityX(this.velX);
        }
        else if(this.body.blocked.right) {
            this.body.setVelocityX(-this.velX);
        }

    }
}

export default Foes;