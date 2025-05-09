class SingleBullet extends Phaser.Scene {
    constructor() {
        super("singleBullet");

        // Initialize a class variable "my" which is an object.
        // The object has one property, "sprite" which is also an object.
        // This will be used to hold bindings (pointers) to created sprites.
        this.my = {sprite: {}};   
        
        // Create a flag to determine if the "bullet" is currently active and moving
        this.bulletActive = false;
    }

    preload() {
        this.load.setPath("./assets/kenney_alien-ufo-pack/PNG");
        this.load.image("User", "shipPink_manned.png");  
        this.load.image("heart", "heart.png");
    }

    create() {
        let my = this.my;
        
        my.sprite.User = this.add.sprite(game.config.width / 2, game.config.height - 40, "User");
        my.sprite.User.setScale(0.5);

        // Create the "bullet" offscreen and make it invisible to start
        my.sprite.heart = this.add.sprite(-10, -10, "heart");
        my.sprite.heart.visible = false;

        // Create key objects
        this.left = this.input.keyboard.addKey("A");
        this.right = this.input.keyboard.addKey("D");
        this.nextScene = this.input.keyboard.addKey("S");
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Set movement speeds (in pixels/tick)
        this.playerSpeed = 7;
        this.bulletSpeed = 10;

        // update HTML description
        document.getElementById('description').innerHTML = '<h2>Single Bullet.js</h2><br>A: left // D: right // Space: fire/emit // S: Next Scene'
    }

    update() {
        let my = this.my;

        // Moving left
        if (this.left.isDown) {
            // Check to make sure the sprite can actually move left
            if (my.sprite.User.x > (my.sprite.User.displayWidth/2)) {
                my.sprite.User.x -= this.playerSpeed;
            }
        }

        // Moving right
        if (this.right.isDown) {
            // Check to make sure the sprite can actually move right
            if (my.sprite.User.x < (game.config.width - (my.sprite.User.displayWidth/2))) {
                my.sprite.User.x += this.playerSpeed;
            }
        }
        
            // Check for bullet being fired
        if (Phaser.Input.Keyboard.JustDown(this.space)) {
            // Only start the bullet if it's not currently active
            if (!this.bulletActive) {
                // Set the active flag to true
                this.bulletActive = true;
                // Set the position of the bullet to be the location of the player
                // Offset by the height of the sprite, so the "bullet" comes out of
                // the top of the player avatar, not the middle.
                my.sprite.heart.x = my.sprite.User.x;
                my.sprite.heart.y = my.sprite.User.y - my.sprite.User.displayHeight/2;
                my.sprite.heart.visible = true;
            }
        }

        // Now handle bullet movement, only if it is active
        if (this.bulletActive) {
            my.sprite.heart.y -= this.bulletSpeed;
            // Is the bullet off the top of the screen?
            if (my.sprite.heart.y < -(my.sprite.heart.height/2)) {
                // make it inactive and invisible
                this.bulletActive = false;
                my.sprite.heart.visible = false;
            }
        }


        if (Phaser.Input.Keyboard.JustDown(this.nextScene)) {
            this.scene.start("arrayBullet");
        }

    }
}