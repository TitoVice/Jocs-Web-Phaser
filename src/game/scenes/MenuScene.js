import {Scene} from 'phaser'

export default class MenuScene extends Scene {
    constructor() {
        super({ key: 'MenuScene' })
    }

    create() {
        console.log("Starting MenuScene ...");
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

        btnStart.on('pointerdown', function (event) {
            btnStart.setTexture('imgMenuClicked');
        });

        let that = this;
        btnStart.on('pointerup', function (event) {
            let qui_comença = Math.random() * 100;
            let posicionsFitxes = {
                // Equip Vermell
                cavallV: { x: 2, y: 8 }, 
                cleroV: { x: 3, y: 8 },
                ninjaV: { x: 5, y: 8 },
    
                // Equip Groc
                cavallG: { x: 6, y: 0 },
                cleroG: { x: 5, y: 0 },
                ninjaG: { x: 3, y: 0 }
            }
            // Start the main game.
            that.scene.start('PlayScene', {torn: '1', jugador_actual: qui_comença < 50, estat: 'Moure Cavall', posicionsFitxes: posicionsFitxes});
        });
    }
}