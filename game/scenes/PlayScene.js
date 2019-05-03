import { Scene } from 'phaser';


export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' });
    this.posicioX = 0;
    this.posicioY = 0;
    this.posicioText = 0;
    this.taulerimgX = 0;
    this.taulerimgY = 0;
    //this.bomb = 0;
    this.nParticules = 100;
  }

  create () {
    console.log("Starting PlayScene ...");
    console.log('Pantalla: ' + window.innerWidth + ' x ' + window.innerHeight);
    
    let fonsimg = this.add.image(window.innerWidth/2, window.innerHeight/2, 'fons');
    fonsimg.displayWidth=window.innerWidth*2;
    fonsimg.displayHeight=window.innerHeight*2;

    let taulerimg = this.add.image(window.innerWidth/2, window.innerHeight/2, 'tauler');
    taulerimg.displayHeight=window.innerHeight;
    taulerimg.displayWidth=taulerimg.displayHeight*1.113;
    this.taulerimgX = taulerimg.displayWidth;
    this.taulerimgY = taulerimg.displayHeight;

    const casellamidaX = taulerimg.displayWidth/9;
    const casellamidaY = 108*taulerimg.displayHeight/1008;

    for (let j=0; j<9; j++) {
      for (let i=0; i<9; i++) {
        let casellaX = j; let casellaY = i;
        let offsetX = 6; let offsetY = 25;
        let posicioACasellaX = 0; let posicioACasellaY = 0;

        let tmp_posX = window.innerWidth/2 - 0.5 * taulerimg.displayHeight;
        if (casellaY%2 != 0) {
          tmp_posX += casellamidaX*0.5;
        }
        let tmp_posY = casellamidaY;
        
        posicioACasellaX = (casellaX)*casellamidaX + tmp_posX + offsetX;
        posicioACasellaY = (casellaY)*casellamidaY + tmp_posY - casellamidaX/2 + offsetY;

        let iconSettings = this.add.image(posicioACasellaX, posicioACasellaY, 'iconSettings').setInteractive();
        iconSettings.setDisplaySize(casellamidaX,casellamidaX);
        let that = this;
        iconSettings.on('pointerup', function(event) {
          that.scene.start('MenuScene'); // Start the main game.
        });
      }
    }
    this.posicioText = this.add.text(16, 16, 'Posicio: 0, 0', { fontSize: '32px', fill: '#000'});
    this.posicioX = 0;
    this.posicioY = 0;

  }

  update () {
    this.posicioX = this.input.mousePointer.x;
    this.posicioY = this.input.mousePointer.y;
    this.posicioText.setText('Mouse: ' + this.posicioX + ', ' + this.posicioY);
  }
}
