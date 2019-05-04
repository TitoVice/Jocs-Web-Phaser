import {Scene} from 'phaser'

export default class TendaScene extends Scene {
    constructor() {
        super({key: 'TendaScene', monedes: 'monedes'})
    }
    
    init (data) { // Copiem totes les variables que ens passa la escena anterior
        this.monedes = data.monedes;
        this.torn = data.torn;
        this.jugador_actual = data.jugador_actual;
        this.estat = data.estat;
        console.log("Tens " + this.monedes + " monedes \nTorn " + this.torn);
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
            that.scene.start('PlayScene', {monedes: that.monedes, torn: that.torn, jugador_actual: that.jugador_actual, estat: that.estat}); // Start the main game.
        }); 
    }
}