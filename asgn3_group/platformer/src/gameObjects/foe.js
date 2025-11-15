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

class Foe extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, x, y, name = 'lvl1_foe', velX = 150) {
        super(scene, path, x, y, name);

        this.name = name;
        this.scene = scene;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(true);
        this.body.setCircle(12);
        
        this.velX = velX;

        this.damage = FOE_TYPE[name].damage;
        this.points = FOE_TYPE[name].points;

        this.startFollow({
            duration: 12000,
            repeat: -1,
            yoyo: true
        });

        this.init();
    }

    init() {
        if(this.name === 'lvl1_foe') {
            this.scene.anims.create({
                key: `${this.name}_walk`,
                frames: this.anims.generateFrameNumbers(this.name, { 
                    start: 0,
                    end: 1 
                }),
                frameRate: 10,
                repeat: -1,
                yoyo: true
            });
        } 
        else {
            this.scene.anims.create({
                key: `${this.name}_walk`,
                frames: this.anims.generateFrameNumbers(this.name, { 
                    start: 0,
                    end: 2 
                }),
                frameRate: 10,
                repeat: -1,
                yoyo: true
            });
        }

        this.anims.play(`${this.name}_walk`, true);
    }

    preUpdate(time, delta) {
        if(!this.isFollowing() || this.y > 740)
        {
            this.destroy();
        }
    }
}

export default Foe;