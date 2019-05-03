import {Scene} from 'phaser'

export default class TendaScene extends Scene {
    constructor() {
        super({key: 'TendaScene', monedes: 'monedes'})
    }
    
    init (monedes) { // Passem les monedes per referència
        this.monedes = monedes;
    } 
    
    create() {
        console.log("Starting TendaScene ...");
        console.log("Tens " + this.monedes + " monedes");
        let fonsimg = this.add.image(window.innerWidth/2, window.innerHeight/2, 'fons');
        fonsimg.displayWidth=window.innerWidth*2;
        fonsimg.displayHeight=window.innerHeight*2;

        // Start Button
        let btnStart = this.add.sprite(window.innerWidth/2, window.innerHeight/2, 'imgMenuNormal').setInteractive();
        //btnStart.setDisplaySize(32,32);
        btnStart.on('pointerover', function (event) {
            btnStart.setTexture('imgMenuHover');
        });

        btnStart.on('pointerout', function (event) {
            btnStart.setTexture('imgMenuNormal');
        });

        btnStart.on('pointerdown', function(event) {
            btnStart.setTexture('imgMenuClicked');
        });

        var that = this;
        btnStart.on('pointerup', function(event) {
            that.scene.start('PlayScene', that.monedes); // Start the main game.
        }); 
    }
}