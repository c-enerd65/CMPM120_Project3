const PLAYER_STAMINA = 100;

class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, name = 'player')
    {
        super(scene, x, y, name);
        
        //general init
        this.name = name;
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.body.setCircle(12);

        //Status variables [subject to change]
        this.score = 0;
        this.totalLives = 3;
        this.stamina = PLAYER_STAMINA; 
        
        //player boost flag
        this.hasBoost = false;
        this.boost = 1;

        //init animations
        this.init();
        //set player controls
        this.playerControls();
    }

    init()
    {
        //idle animation
        this.scene.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers(this.name, { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1,
            yoyo: true
        });

        //walk animation
        this.scene.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers(this.name, { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1,
            yoyo: true
        });

        //defaults idle
        this.anims.play('idle', true);
    }

    playerControls()
    {
        this.keyIn = this.scene.input.keyboard.createCursorKeys();

        // player jumps when pressing up '^' key
        this.keyIn.up.on('down', function() {
            if(this.body.blocked.down) {
                this.body.setVelocityY(-280);
            }
        }, this);

        //space bar for something??????
        //from prev iteration could recycle for something lul
        this.SPACE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.R = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update(time, delta)
    {
        this.body.isStatic = false;
        this.body.setAllowGravity(true);
        
        //if player has boost
        //add tween and sound
        if(this.hasBoost)
        {
            this.boost = 3;

            this.add.tweens({
                
            });
        }

        //general player movements [subject to change]
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
        
        if(this.body.blocked.right || this.body.blocked.left ? true : false) {
            this.body.isStatic = true;
            this.body.setAllowGravity(false);

            if(this.keyIn.up.isDown) {
                this.grabWall();
            }
            else {
                this.keyIn.up.on('up', function() {
                    if(this.stamina < PLAYER_STAMINA) {
                        this.stamina += 1;
                    }
                }, this);
            }
        }
        else {
            this.body.isStatic = false;
            this.body.setAllowGravity(true);
        }

        if(Phaser.Input.Keyboard.JustDown(this.R)) {
            this.scene.testReset();
        }
    }

    /*
        player grabs wall, stamina depletes
        by 1 (?) every second 
    */
    grabWall() {
        if(this.stamina <= 0) {
            this.body.setAllowGravity(true);
            return;
        }
        
        this.stamina -= 1;
        this.y -= 2;
        console.log(this.stamina);
    }

    updateStamina() {
        if(this.stamina < PLAYER_STAMINA) {
            this.stamina += 1;
            console.log(this.stamina);
        }
    }
    
}

export default Player;