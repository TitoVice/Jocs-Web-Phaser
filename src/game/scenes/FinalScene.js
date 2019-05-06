import {Scene} from 'phaser'

export default class FinalScene extends Scene {
    constructor() {
        super({key: 'FinalScene', monedes: 'monedes'})
    }
    
    init (data) { // Copiem totes les variables que ens passa la escena anterior
        this.torn = data.torn;
        this.estat = data.estat;
    }
    
    create() {
        console.log("Starting FinalScene ...");
        let fonsimg = this.add.image(window.innerWidth/2, window.innerHeight/2, 'fons');
        fonsimg.displayWidth=window.innerWidth*2;
        fonsimg.displayHeight=window.innerHeight*2;

        // RESULTAT DEL MATCH
        let textResultat = this.add.text(window.innerWidth/2, window.innerHeight/2,
            'Ha guanyat el jugador ' + this.estat + ' en ' + this.torn + ' torns!.', { fontSize: '19px', fill: '#000'});

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

        let that = this;
        btnStart.on('pointerup', function(event) {
            that.scene.start('PlayScene', {monedes: that.monedes, torn: that.torn, jugador_actual: that.jugador_actual, estat: that.estat, posicionsFitxes: that.posicionsFitxes}); // Start the main game.
        }); 
    }
}