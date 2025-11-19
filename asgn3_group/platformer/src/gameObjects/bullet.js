class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, name = 'bullet', direction = 0, hit = false) {
        super(scene, x, y, name);
        
        this.name = name;
        this.hit = hit;

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    fire(x, y) {
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);
    }

    preUpdate(time, delta)
    {
        super.preUpdate(time, delta);

        if(this.x >= this.scene.width || this.x < 0)
        {
            this.setActive(false);
            this.setVisible(false);
        }
        else if(this.y >= this.scene.height || this.y < 0)
        {
            this.setActive(false);
            this.setVisible(false);
        }
        else if(this.hit === true){
            this.setActive(false);
            this.setVisible(false);

            this.hit = false;
        }
    }
}

export default Bullet;