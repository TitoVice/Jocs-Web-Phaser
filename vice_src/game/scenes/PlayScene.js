import { Scene } from 'phaser';
import Rebots from '../../components/Rebots';

export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' });
  }

  create () {
    console.log("Starting PlayScene ...");
    let fonsimg = this.add.image(window.innerWidth/2, window.innerHeight/2, 'fons');
    fonsimg.displayWidth=window.innerWidth*2;
    fonsimg.displayHeight=window.innerHeight*2;


    let taulerimg = this.add.image(window.innerWidth/2-(window.innerHeight*4/7), window.innerHeight/2, 'tauler');
    taulerimg.displayHeight=window.innerHeight;
    taulerimg.displayWidth=window.innerHeight*4/3;

    const bomb = this.physics.add.image(400, 200, 'bomb');
    bomb.setCollideWorldBounds(true);
    bomb.body.onWorldBounds = true; // enable worldbounds collision event
    bomb.displayWidth=30;
    bomb.displayHeight=30;
    bomb.setBounce(0.8);
    bomb.setVelocity(200, 20);
    bomb.allowRotation = true;
  }

  update () {

  }
}
