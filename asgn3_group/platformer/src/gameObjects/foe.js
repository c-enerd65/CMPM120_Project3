const FOE_TYPE = {
    lvl1_foe: {
        damage: 1,
        points: 5
    },
    lvl2_foe: {
        damage: 2,
        points: 10
    },
    lvl3_foe: {
        damage: 3,
        points: 15
    }
}

class Foe extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, name = 'lvl1_foe', velX = 75) {
        super(scene, x, y, name);

        this.name = name;
        this.scene = scene;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(true);
        this.body.setCircle(12);
        
        this.velX = velX;
        this.body.setVelocityX(this.velX);

        this.damage = FOE_TYPE[name].damage;
        this.points = FOE_TYPE[name].points;

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

    update() {
        switch(this.name)
        {
            case 'lvl3_foe':
                this.startMove_vertical();
                break;
            default:
                this.startMove_horizontal();
                break;
        }
    }

    startMove_horizontal() {
        if(this.body.blocked.down)
        {
            if(this.body.blocked.left) {
                this.body.setVelocityX(this.velX);
            }
            else if(this.body.blocked.right) {
                this.body.setVelocityX(-this.velX);
            }
        }
    }

    startMove_vertical() {
        if(this.body.blocked.down) {
            this.body.setVelocityX(0);
            this.body.setAllowGravity(false);

            this.scene.tweens.add({
                targets: this,
                duration: 1000,
                y: {
                    from: this.y, 
                    to: this.y - 50
                },
                repeat: -1,
                yoyo: true,
                ease: 'Linear'
            })
        }
    }
}

export default Foe;