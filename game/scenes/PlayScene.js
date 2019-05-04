import { Scene } from 'phaser';


export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' });
    this.posicioText = 0;
    this.debug = true;
  }

  init (data) { // Copiem totes les variables que ens passa la escena anterior
    this.monedes = data.monedes;
    this.torn = data.torn;
    this.jugador_actual = data.jugador_actual;
  }

  create () {
    console.log("Starting PlayScene ...");
    console.log("Tens " + this.monedes + " monedes \nTorn " + this.torn);
    let that = this;

    // FUNCIONS BOOLEANES DE LES CASELLES
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

    var es_muntanya = function (x, y) {
      let muntanya = false;
      if (y === 3) {
        muntanya = (x === 3 || x === 7);
      } else if (y === 4) {
        muntanya = (x === 1 || x === 7);
      } else if (y === 5) {
        muntanya = (x === 0 || x === 4);
      }
      return muntanya;
    };

    var es_palau = function (x, y) {
      return (x === 4 && y === 0) || (x === 4 && y === 8);
    };

    var es_sort = function (x, y) {
      return (x === 8 && y === 4) || (x === 0 && y === 4);
    };
    
    // Pintem el fons
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
    let textura_cuadrats;
    this.debug ? textura_cuadrats = 'debugSquare' : textura_cuadrats = 'transparent'; // Si és per debug, dibuixem els cuadrats
    for (let i=0; i<9; i++) {
      for (let j=0; j<9; j++) {
        if (es_de_dins(i,j)) {
          let casellaX = i; let casellaY = j;
          let offsetX = 6; let offsetY = 25;
          let posicioACasellaX = 0; let posicioACasellaY = 0;
          let tmp_posX = window.innerWidth/2 - 0.5 * taulerimg.displayHeight;
          if (casellaY%2 !== 0) {
            tmp_posX += casellamidaX*0.5;
          }
          let tmp_posY = casellamidaY;
          posicioACasellaX = (casellaX)*casellamidaX + tmp_posX + offsetX;
          posicioACasellaY = (casellaY)*casellamidaY + tmp_posY - casellamidaX/2 + offsetY;

          let iconSettings = this.add.image(posicioACasellaX, posicioACasellaY, textura_cuadrats).setInteractive();
          iconSettings.setDisplaySize(casellamidaX,casellamidaX);
          that = this;
          iconSettings.on('pointerup', function(event) {
            console.log('----------------------\n' +
                        'CASELLA SELECCIONADA\n' +
                        'Casella: ' + i + ',' + j + '\n' + 
                        'Muntanya: ' + es_muntanya(i,j) + '\n' +
                        'Palau: ' + es_palau(i,j) + '\n' +
                        'Sort: ' + es_sort(i,j) +
                        '\n----------------------');
          });
        }
      }
    }

    // POSO EL BOTO DE OPCIONS
    let settingsButton = this.add.image(window.innerWidth-60,60, 'iconSettings').setInteractive();
    settingsButton.setDisplaySize(60,60);
    that = this;
    settingsButton.on('pointerup', function(event) {
      that.scene.start('OpcionsScene', {monedes: that.monedes, torn: that.torn, jugador_actual: that.jugador_actual}); // Obre el menu d'opcions.
    });


    // POSO EL BOTO DE LA TENDA
    let midaTenda = 200;
    let posicioTendaX = window.innerWidth-80, posicioTendaY = window.innerHeight/2;
    let tendaButton = this.add.image(posicioTendaX, posicioTendaY, 'iconTenda').setInteractive();
    tendaButton.setDisplaySize(midaTenda*0.67,midaTenda);
    that = this;
    tendaButton.on('pointerup', function(event) {
      that.scene.start('TendaScene', {monedes: that.monedes, torn: that.torn, jugador_actual: that.jugador_actual}); // Obre la tenda.
    });

    // POSEM EL TEXT DE TORN I DEL JUGADOR ACTUAL A LA PANTALLA
    this.tornText = this.add.text(16, 50, 'Torn: ' + that.torn + '\nJugador: ' + this.jugador_actual, {fontSize: '32px', fill: '#000'});

    // POSEM EL CONTADOR DE MONEDES
    let midaMoneda = 50;
    let monedesIcon = this.add.image(posicioTendaX, posicioTendaY + tendaButton.displayHeight, 'moneda').setInteractive();
    monedesIcon.setDisplaySize(midaMoneda,midaMoneda);
    that = this;
    monedesIcon.on('pointerup', function(event) {
      that.monedes++; // Incrementa les monedes en 1 quantitat.
      that.monedesText.setText(that.monedes);

      that.torn++; // Incrementa el torn en 1 quantitat.
      that.jugador_actual = !that.jugador_actual;
      that.tornText.setText('Torn: ' + that.torn + '\nJugador: ' + that.jugador_actual);
    });
    this.monedesText = this.add.text(posicioTendaX - monedesIcon.displayWidth - 50, posicioTendaY + tendaButton.displayHeight, this.monedes, { fontSize: '32px', fill: '#000'});

    // POSEM EL TEXT DEL MOUSE PER DEBUG
    this.posicioText = this.add.text(16, 16, 'Posicio: 0, 0', { fontSize: '32px', fill: '#000'});
  }

  update () {
    this.posicioText.setText('Mouse: ' + this.input.mousePointer.x + ', ' + this.input.mousePointer.y);
  }
}
