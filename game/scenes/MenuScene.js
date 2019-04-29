import {Scene} from 'phaser'

export default class MenuScene extends Scene {
    constructor() {
        super({key: 'MenuScene'})
    }
    create() {
        // Start Button
        let btnStart = this.add.sprite(window.innerWidth/2, window.innerHeight/2, 'imgMenuNormal').setInteractive();
        //btnStart.setDisplaySize(32,32);
        btnStart.on('pointerover', function (event) { btnStart.setTexture('imgMenuHover');/* Do something when the mouse enters */ });
        btnStart.on('pointerout', function (event) { btnStart.setTexture('imgMenuNormal');/* Do something when the mouse exits. */ });
        var that = this;
        btnStart.on('pointerdown', function(event){
            btnStart.setTexture('imgMenuClicked');});
        
        btnStart.on('pointerup', function(event){
            that.scene.start('PlayScene');}); // Start the main game.
    }
}