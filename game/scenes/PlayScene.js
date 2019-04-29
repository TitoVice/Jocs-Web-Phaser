import { Scene } from 'phaser';


export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' });
    this.posicioX = 0;
    this.posicioY = 0;
    this.posicioText = 0;
    //this.bomb = 0;
    this.nParticules = 100;
  }

  create () {
    console.log("Starting PlayScene ...");
    let fonsimg = this.add.image(window.innerWidth/2, window.innerHeight/2, 'fons');
    fonsimg.displayWidth=window.innerWidth*2;
    fonsimg.displayHeight=window.innerHeight*2;

    let taulerimg = this.add.image(window.innerWidth/2, window.innerHeight/2, 'tauler');
    taulerimg.displayHeight=window.innerHeight;
    taulerimg.displayWidth=taulerimg.displayHeight*4/3;

    //let iconimg = this.add.image(200, 200, 'icon');

    /*
    this.bomb = this.physics.add.image(400, 200, 'bomb');
    this.bomb.setCollideWorldBounds(true);
    this.bomb.body.onWorldBounds = true; // enable worldbounds collision event
    this.bomb.displayWidth=30;
    this.bomb.displayHeight=30; 
    this.bomb.setBounce(0.8);
    this.bomb.setVelocity(200, 20);
*/
    this.posicioText = this.add.text(16, 16, 'Posicio: 0, 0', { fontSize: '32px', fill: '#000'});
    this.posicioX = 0;
    this.posicioY = 0;

  }

  update () {
    this.posicioX = this.input.mousePointer.x;
    this.posicioY = this.input.mousePointer.y;

    this.posicioText.setText('Mouse: ' + this.posicioX + ', ' + this.posicioY + ' | Pantalla: ' + window.innerWidth + ' x ' + window.innerHeight);
  }
}
