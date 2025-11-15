const PLAYER_STAMINA = 100;
const PLAYER_VELOCITY = 200;
const PLAYER_JUMP = -225;

const TOTAL_LIVES = 3;

class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, name = 'player')
    {
        super(scene, x, y, name);
        
        //general init
        this.name = name;
        this.scene = scene;
        this.x = x;
        this.y = y;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(false);
        this.body.setCircle(12);

        //Status variables [subject to change]
        this.score = 0;
        this.lives = TOTAL_LIVES;
        this.stamina = PLAYER_STAMINA; 
        
        this.speed = PLAYER_VELOCITY;
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
            frames: this.anims.generateFrameNumbers(this.name, { 
                start: 0, 
                end: 0 
            }),
            frameRate: 10,
            repeat: -1,
            yoyo: true
        });

        //walk animation
        this.scene.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers(this.name, { 
                start: 0,
                end: 1 
            }),
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
                //this.sound.play();
                this.body.setVelocityY(PLAYER_JUMP);
            }
        }, this);

        //space bar for something??????
        //from prev iteration could recycle for something lul
        this.SPACE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(time, delta)
    {
        this.body.isStatic = false;
        this.body.setAllowGravity(true);

        let speed = this.speed * this.boost;
        this.movePlayer(speed);
        
        //wall grabbing
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

        //checks player fall, handles death
        this.checkFall();
    }

    checkFall() {
        if(this.y > 720 && this.lives > 0) {
            // moves player back to closest platform
            this.x = 0;
            this.y = 250;

            this.playerDamaged();
        }
    }

    movePlayer(speed) {
        if(this.keyIn.left.isDown) {
            this.body.setVelocityX(-speed);
            this.anims.play('walk', true);
        } else if(this.keyIn.right.isDown) {
            this.body.setVelocityX(speed);
            this.anims.play('walk', true);
        } else {
            this.body.setVelocityX(0);
            this.anims.play('idle');
        }
    }

    playerDamaged() {
        //this.sound.play()
        this.lives--;

        this.scene.tweens.add({
            targets: this,
            duration: 1000,
            alpha: {from: 0, to: 1},
            repeat: 5
        });
    }

    grabWall() {
        if(this.stamina <= 0) {
            this.body.setAllowGravity(true);
            return;
        }
        
        this.stamina -= 1;
        this.y -= 2;
    }

    updateStamina() {
        if(this.stamina < PLAYER_STAMINA) {
            this.stamina += 1;
        }
    }
}

export default Player;