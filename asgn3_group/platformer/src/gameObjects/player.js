class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, name = 'player')
    {
        super(scene, x, y, name);
        
        this.name = name;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.body.setAllowGravity(true);
        this.body.setCircle(12);

        this.score = 0;
        this.health = 750;
        
        this.hasBoost = false;
        this.boost = 1;

        this.init();
        this.playerControls();
    }

    init()
    {
        this.scene.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers(this.name, { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1,
            yoyo: true
        });

        this.scene.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers(this.name, { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1,
            yoyo: true
        });

        this.anims.play('idle', true);
    }

    playerControls()
    {
        this.keyIn = this.scene.input.keyboard.createCursorKeys();

        this.keyIn.up.on('down', function() {
            if(this.body.blocked.down) {
                this.body.setVelocityY(-360);
            }
        }, this);

        this.SPACE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(time, delta)
    {
        if(this.hasBoost)
        {
            this.boost = 3;
        }

        if(this.keyIn.left.isDown) {
            this.body.setVelocityX(-200);
            this.x -= 2 * this.boost;
            this.anims.play('walk', true);
        } else if(this.keyIn.right.isDown) {
            this.body.setVelocityX(200);
            this.x += 2 * this.boost;
            this.anims.play('walk', true);
        } else {
            this.body.setVelocityX(0);
            this.anims.play('idle');
        }

        if(Phaser.Input.Keyboard.JustDown(this.SPACE)) {
            this.shoot();
        }
    }

    shoot() {
    }
    
}

export default Player;