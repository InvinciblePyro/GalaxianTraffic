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
        this.load.image("User", "shipPink_manned.png");  //user 
        this.load.image("heart", "heart.png"); //horn
        this.load.image("othShip", "shipBeige_manned.png"); //other ship
        this.load.image("bg", "kenney_space-shooter-redux/Backgrounds/purple.png");  // background

    }

    create() {
        this.UserHP = 3;
        this.score = 0;

        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg').setOrigin(0, 0);

        let my = this.my;
    
        //user
        my.sprite.User = this.add.sprite(game.config.width / 2, game.config.height - 40, "User");
        my.sprite.User.setScale(0.5);

        //other ship
        this.otherShips = [];
        for (let i = 0; i < 5; i++) {
            let x = Phaser.Math.Between(50, game.config.width - 50);
            let y = Phaser.Math.Between(-100, -200);
            let ship = this.add.sprite(x, y, "othShip").setScale(0.5);
            this.otherShips.push(ship);
        }

        // Create the "bullet" offscreen and make it invisible to start
        my.sprite.heart = this.add.sprite(-10, -10, "heart");
        my.sprite.heart.visible = false;

        // Create key objects
        this.left = this.input.keyboard.addKey("A");
        this.right = this.input.keyboard.addKey("D");
        this.up = this.input.keyboard.addKey("W");
        this.nextScene = this.input.keyboard.addKey("S");
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        // Set User movement speeds (in pixels/tick)
        this.playerSpeed = 7;
        this.bulletSpeed = 20;
        // Displays user health:
        this.add.bitmapText(5, game.config.height - 30, 'kennyRocketSquare', "Your Health: " + this.UserHP, 64)
            .setScale(0.3, 0.45)
        // Displays score:
        this.add.bitmapText(game.config.width - 110, game.config.height - 30, 'kennyRocketSquare', "Score: " + this.score, 64)
            .setScale(0.3, 0.45)
        // Set Ship speeds
        this.othShipSpeed = 5;

        // update HTML description
        document.getElementById('description').innerHTML = '<h2>Level 1</h2><br>A: left // D: right // W: fire/emit // S: Next Scene // SHIFT: Faster speed'
    }

    update() {
        let my = this.my;

        this.background.tilePositionY -= 2;  // Scrolls downward. Increase value for faster scrolling

        // Moving left
        if (this.left.isDown) {
            // Check to make sure the sprite can actually move left
            if (my.sprite.User.x > (my.sprite.User.displayWidth/2)) {
                if (this.shift.isDown) { my.sprite.User.x -= this.playerSpeed*2} else {my.sprite.User.x -= this.playerSpeed};
            }
        }

        // Moving right
        if (this.right.isDown) {
            // Check to make sure the sprite can actually move right
            if (my.sprite.User.x < (game.config.width - (my.sprite.User.displayWidth/2))) {
                if (this.shift.isDown) { my.sprite.User.x += this.playerSpeed*2} else { my.sprite.User.x += this.playerSpeed};
            }
        }
        
        // Check for bullet being fired
        if (Phaser.Input.Keyboard.JustDown(this.up) ) {
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

        // Other Ships Movement
        for (let ship of this.otherShips) {
            ship.y += this.othShipSpeed;
            // reset ship if it goes off screen
            if (ship.y > game.config.height + 50) {
                ship.y = Phaser.Math.Between(-200, -50);
                ship.x = Phaser.Math.Between(50, game.config.width - 50);
            }
        }

    
        // switching scenes
        if (Phaser.Input.Keyboard.JustDown(this.nextScene)) {
            this.scene.start("arrayBullet");
        }

    }
}