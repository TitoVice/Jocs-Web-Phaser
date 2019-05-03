import { Scene } from 'phaser';


export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene', monedes: 'monedes'});
    this.posicioX = 0;
    this.posicioY = 0;
    this.posicioText = 0;
    this.taulerimgX = 0;
    this.taulerimgY = 0;
    this.nParticules = 100;
  }

  init (monedes) { // Passem les monedes per referència
    this.monedes = monedes; 
  }

  create () {
    console.log("Starting PlayScene ...");
    //console.log('Pantalla: ' + window.innerWidth + ' x ' + window.innerHeight);
    let that = this;
    var es_de_dins = function (x, y) {
      let dins = true;
      if (y === 0 || y === 8) {
        dins = !(x === 0 || x === 1 || x === 7 || x === 8);
      } else if (y === 1 || y === 7) {
        dins = !(x === 0 || x === 7 || x === 8);
      } else if (y === 2 || y === 6) {
        dins = !(x === 0 || x === 8);
      } else if ((y === 3 || y === 5) && x === 8) {
        dins = false;
      }
      return dins;
    };
    
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

    // POSANT TOTS ELS CUADRATS DEL TAULER
    for (let i=0; i<9; i++) {
      for (let j=0; j<9; j++) {
        if (es_de_dins(i,j)) {
          let casellaX = i; let casellaY = j;
          let offsetX = 6; let offsetY = 25;
          let posicioACasellaX = 0; let posicioACasellaY = 0;
          let tmp_posX = window.innerWidth/2 - 0.5 * taulerimg.displayHeight;
          if (casellaY%2 != 0) {
            tmp_posX += casellamidaX*0.5;
          }
          let tmp_posY = casellamidaY;
          posicioACasellaX = (casellaX)*casellamidaX + tmp_posX + offsetX;
          posicioACasellaY = (casellaY)*casellamidaY + tmp_posY - casellamidaX/2 + offsetY;

          let iconSettings = this.add.image(posicioACasellaX, posicioACasellaY, 'debugSquare').setInteractive();
          iconSettings.setDisplaySize(casellamidaX,casellamidaX);
          that = this;
          iconSettings.on('pointerup', function(event) {
            console.log('Casella ' + i + ' ' + j);
            //that.scene.start('MenuScene');
          });
        }
      }
    }

    // POSO EL BOTO DE OPCIONS
    let settingsButton = this.add.image(window.innerWidth-60,60, 'iconSettings').setInteractive();
    settingsButton.setDisplaySize(60,60);
    that = this;
    settingsButton.on('pointerup', function(event) {
      that.scene.start('OpcionsScene'); // Obre el menu d'opcions.
    });


    // POSO EL BOTO DE LA TENDA
    let midaTenda = 200;
    let posicioTendaX = window.innerWidth-80, posicioTendaY = window.innerHeight/2;
    let tendaButton = this.add.image(posicioTendaX, posicioTendaY, 'iconTenda').setInteractive();
    tendaButton.setDisplaySize(midaTenda*0.67,midaTenda);
    that = this;
    tendaButton.on('pointerup', function(event) {
      that.scene.start('TendaScene', that.monedes); // Obre la tenda.
    });

    // POSEM EL CONTADOR DE MONEDES
    let midaMoneda = 50;
    //console.log(this.monedes);
    let monedesIcon = this.add.image(posicioTendaX, posicioTendaY + tendaButton.displayHeight, 'moneda').setInteractive();
    monedesIcon.setDisplaySize(midaMoneda,midaMoneda);
    that = this;
    monedesIcon.on('pointerup', function(event) {
      that.monedes++; // Incrementa les monedes en 1 quantitat.
    });
    this.monedesText = this.add.text(posicioTendaX - monedesIcon.displayWidth - 50, posicioTendaY + tendaButton.displayHeight, this.monedes, { fontSize: '32px', fill: '#000'});

    // POSEM EL TEXT DEL MOUSE PER DEBUG
    this.posicioText = this.add.text(16, 16, 'Posicio: 0, 0', { fontSize: '32px', fill: '#000'});
    this.posicioX = 0;
    this.posicioY = 0;
  }

  update () {
    this.posicioX = this.input.mousePointer.x;
    this.posicioY = this.input.mousePointer.y;
    this.posicioText.setText('Mouse: ' + this.posicioX + ', ' + this.posicioY);
    this.monedesText.setText(this.monedes);
  }
}
