class TitleScreen extends Phaser.Scene {
  constructor() {
    super("titleScreen");
  }

  preload() {
    this.load.bitmapFont('kennyRocketSquare', './assets/KennyRocketSquare_0.png', './assets/KennyRocketSquare.fnt'); //font
    this.load.setPath("./assets/");
    this.load.image("User", "/kenney_alien-ufo-pack/PNG/shipPink_manned.png");  // logo
    this.load.image("bg", "kenney_space-shooter-redux/Backgrounds/purple.png");  // background

  }

  create() {
    this.add.image(400, 300, "bg").setScale(3.2, 2.4); // background

    this.add.bitmapText(400, 200, 'kennyRocketSquare', 'Galaxian Traffic', 64)
      .setOrigin(0.5)
      .setLetterSpacing(10)
      .setScale(0.7, 3)
  
    this.add.bitmapText(400, 300, 'kennyRocketSquare', 'Press SPACE to Start', 64)
      .setScale(0.5, 1.7)
      .setOrigin(0.5, 0)
  
    // Optional logo
    this.add.sprite(400, 500, "User").setScale(1);

    this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.startKey)) {
      this.scene.start("singleBullet");
    }
  }
}
