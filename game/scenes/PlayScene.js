import { Scene } from 'phaser';


export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' });
    this.posicioText = 0;
    this.tornText = 0;
    this.debug = false;

    this.cavallerVermell = 0;
    this.cleroVermell = 0;
    this.ninjaVermell = 0;

    this.cavallerBlau = 0;
    this.cleroBlau = 0;
    this.ninjaBlau = 0;
  }

  init (data) { // Copiem totes les variables que ens passa la escena anterior
    this.monedes = data.monedes;
    this.torn = data.torn;
    this.jugador_actual = data.jugador_actual;
    this.estat = data.estat;
    this.posicionsFitxes = data.posicionsFitxes;
  }

  create () {
    console.log("Starting PlayScene ...");
    console.log("Tens " + this.monedes + " monedes\nTorn " + this.torn);
    let that = this;

    // ---------------------- FUNCIONS BOOLEANES DE LES CASELLES ---------------------- 
    let es_de_dins = function (x, y) {
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

    let es_muntanya = function (x, y, jugador_actual, fitxa, that) {
      let muntanya = false;
      if (y === 3) {
        muntanya = (x === 3 || x === 7);
      } else if (y === 4) {
        muntanya = (x === 1 || x === 7);
      } else if (y === 5) {
        muntanya = (x === 0 || x === 4);
      } else if (jugador_actual) { // Comprovem si vol anar al seu propi palau; en aquest cas, no pot
        muntanya = (x === 4 && y === 8);
      } else {
        muntanya = (x === 4 && y === 0);
      }
      
      let posicio_aliada = false;
      // A part comprovem si el jugador vol anar al mateix lloc que una unitat aliada
      let tmp_ans = hi_ha_alguna_tropa(x,y,that);
      posicio_aliada = tmp_ans.existeixTropa && tmp_ans.equip === jugador_actual;


      /* Posicions disponibles per avançar 1 casella
      x-1, y-1	    x, 	 y-1      
      x-1, y		    x,	 y		    x+1, y
      x-1, y+1      x,	 y+1    	x+1, y+1
      ![](/src/posició veins.png)
      */
      console.log ( 'X: ' + fitxa.x + ' Y: ' + fitxa.y + ' | X final: ' + x + ' Y final: ' + y);
      //console.log (that.posicionsFitxes);

      let vei = (x === fitxa.x && y === fitxa.y-1);
      if (!vei) {
        vei = (x === fitxa.x-1 && y === fitxa.y);
        if (!vei) {
          vei = (x === fitxa.x+1 && y === fitxa.y);
          if (!vei) {
            vei = (x === fitxa.x && y === fitxa.y+1);
          }
        }
      }

      if (!vei) {
        // Si està desplaçat a la dreta
        if (fitxa.y % 2 === 0) {
          vei = (x === fitxa.x-1 && y === fitxa.y-1);
          if (!vei) {
            vei = (x === fitxa.x-1 && y === fitxa.y+1);
          }
        } else {
          vei = (x === fitxa.x+1 && y === fitxa.y-1);
          if (!vei) {
            vei = (x === fitxa.x+1 && y === fitxa.y+1);
          }
        }
      }
      return muntanya || posicio_aliada || !vei;
    };

    let es_palau = function (x, y, jugador_actual) {
      let palau = false;
      if (jugador_actual) {
        palau = x === 4 && y === 0;
      } else {
        palau = x === 4 && y === 8;
      }
      return palau;
      ;
    };

    let es_sort = function (x, y) {
      return (x === 8 && y === 4) || (x === 0 && y === 4);
    };

    let casella_posicio = function (x, y) {
      let posicio = {x: x, y: y};
      let casellaX = x, casellaY = y;
      let offsetX = 6; let offsetY = 25;
      let tmp_posX = window.innerWidth/2 - 0.5 * taulerimg.displayHeight;
      if (casellaY%2 !== 0) {
        tmp_posX += casellamidaX*0.5;
      }
      let tmp_posY = casellamidaY;
      posicio.x = (casellaX)*casellamidaX + tmp_posX + offsetX;
      posicio.y = (casellaY)*casellamidaY + tmp_posY - casellamidaX/2 + offsetY;
      return posicio;
    };

    let hi_ha_alguna_tropa = function (x, y, that) {
      let existeixTropa = that.posicionsFitxes.cavallV.x === x && that.posicionsFitxes.cavallV.y === y;
      let tropa = that.cavallerVermell;
      let equip_tropa = true;
      if (!existeixTropa) {
        existeixTropa = that.posicionsFitxes.cleroV.x === x && that.posicionsFitxes.cleroV.y === y;
        tropa = that.cleroVermell;
        equip_tropa = true;
        if (!existeixTropa) {
          existeixTropa = that.posicionsFitxes.ninjaV.x === x && that.posicionsFitxes.ninjaV.y === y;
          tropa = that.ninjaVermell;
          equip_tropa = true;
          if (!existeixTropa) {
            existeixTropa = that.posicionsFitxes.cavallB.x === x && that.posicionsFitxes.cavallB.y === y;
            tropa = that.cavallerBlau;
            equip_tropa = false;
            if (!existeixTropa) {
              existeixTropa = that.posicionsFitxes.cleroB.x === x && that.posicionsFitxes.cleroB.y === y;
              tropa = that.cleroBlau;
              equip_tropa = false;
              if (!existeixTropa) {
                existeixTropa = that.posicionsFitxes.ninjaB.x === x && that.posicionsFitxes.ninjaB.y === y;
                tropa = that.ninjaBlau;
                equip_tropa = false;
      }}}}}
      return {existeixTropa: existeixTropa, tropa: tropa, equip: equip_tropa};
    }

    let fer_estat = function(x, y, that) {
      let fitxa = 0;
      if (that.jugador_actual) {
        switch (that.estat) {
          case 'Moure Cavall' : 
            fitxa = that.posicionsFitxes.cavallV; break;
          case 'Moure Clero' :
            fitxa = that.posicionsFitxes.cleroV; break;
          case 'Moure Ninja' :
            fitxa = that.posicionsFitxes.ninjaV; break;
        }
      } else {
        switch (that.estat) {
          case 'Moure Cavall' : 
            fitxa = that.posicionsFitxes.cavallB; break;
          case 'Moure Clero' :
            fitxa = that.posicionsFitxes.cleroB; break;
          case 'Moure Ninja' :
            fitxa = that.posicionsFitxes.ninjaB; break;
        }
      }
      switch (that.estat) {
        case 'Moure Cavall' :
        case 'Moure Clero' :
        case 'Moure Ninja' :
          // Actualitzar posicions a la estructura de dades || vermell
          if (!es_muntanya(x,y, that.jugador_actual, fitxa, that)) {
            fitxa.x = x;
            fitxa.y = y;
          } else {
            break;
          }

          // Guanyar la partida
          if (es_palau(x, y, that.jugador_actual)) {
            if (that.jugador_actual)
              that.estat = 'GUANYA JUGADOR VERMELL';
            else
              that.estat = 'GUANYA JUGADOR BLAU';
          }

          // Roba carta de la sort
          if (es_sort(x,y)) {
            // Roba carta de la sort
          }

          // Si s'ha de matar alguna tropa
          let totTropa = hi_ha_alguna_tropa(x,y,that);
          if (totTropa.existeixTropa && totTropa.equip !== that.jugador_actual) {
            // MECANICA DEL PPT
              // Destruir el que toca
              // Posicionar-lo a la posicio 0,0 del tauler per determinar-lo mort 

            //totTropa.tropa.destroy();
          }
          
          // Moure fitxes a posicio x y
          moure_fitxes(that);

          // Canviar estat a seguent
          switch (that.estat) {
            case 'Moure Cavall':
              that.estat = 'Moure Clero';
              break;
            case 'Moure Clero':
              that.estat = 'Moure Ninja';
              break;
            case 'Moure Ninja':
              that.estat = 'Moure Cavall';
              that.jugador_actual = !that.jugador_actual;
          }
          that.torn++;

          break;
      }
    }
    
    let posicionar_fitxes = function(that) {
      // Posem les tropes al seu lloc

      // Equip vermell
      let posicioActual = casella_posicio(that.posicionsFitxes.cavallV.x, that.posicionsFitxes.cavallV.y);
      that.cavallerVermell = that.add.image(posicioActual.x, posicioActual.y, 'cavallerVermell');
      that.cavallerVermell.setDisplaySize(casellamidaY, casellamidaY);

      posicioActual = casella_posicio(that.posicionsFitxes.cleroV.x, that.posicionsFitxes.cleroV.y);
      that.cleroVermell = that.add.image(posicioActual.x, posicioActual.y, 'cleroVermell');
      that.cleroVermell.setDisplaySize(casellamidaY, casellamidaY);

      posicioActual = casella_posicio(that.posicionsFitxes.ninjaV.x, that.posicionsFitxes.ninjaV.y);
      that.ninjaVermell = that.add.image(posicioActual.x, posicioActual.y, 'ninjaVermell');
      that.ninjaVermell.setDisplaySize(casellamidaY, casellamidaY);


      // Equip blau
      posicioActual = casella_posicio(that.posicionsFitxes.cavallB.x, that.posicionsFitxes.cavallB.y);
      that.cavallerBlau = that.add.image(posicioActual.x, posicioActual.y, 'cavallerBlau');
      that.cavallerBlau.setDisplaySize(casellamidaY, casellamidaY);

      posicioActual = casella_posicio(that.posicionsFitxes.cleroB.x, that.posicionsFitxes.cleroB.y);
      that.cleroBlau = that.add.image(posicioActual.x, posicioActual.y, 'cleroBlau');
      that.cleroBlau.setDisplaySize(casellamidaY, casellamidaY);

      posicioActual = casella_posicio(that.posicionsFitxes.ninjaB.x, that.posicionsFitxes.ninjaB.y);
      that.ninjaBlau = that.add.image(posicioActual.x, posicioActual.y, 'ninjaBlau');
      that.ninjaBlau.setDisplaySize(casellamidaY, casellamidaY);
    }

    let moure_fitxes = function(that) {
      // Equip vermell
      let posicioActual = casella_posicio(that.posicionsFitxes.cavallV.x, that.posicionsFitxes.cavallV.y);
      that.cavallerVermell.setPosition(posicioActual.x, posicioActual.y);

      posicioActual = casella_posicio(that.posicionsFitxes.cleroV.x, that.posicionsFitxes.cleroV.y);
      that.cleroVermell.setPosition(posicioActual.x, posicioActual.y);

      posicioActual = casella_posicio(that.posicionsFitxes.ninjaV.x, that.posicionsFitxes.ninjaV.y);
      that.ninjaVermell.setPosition(posicioActual.x, posicioActual.y);


      // Equip blau
      posicioActual = casella_posicio(that.posicionsFitxes.cavallB.x, that.posicionsFitxes.cavallB.y);
      that.cavallerBlau.setPosition(posicioActual.x, posicioActual.y);;

      posicioActual = casella_posicio(that.posicionsFitxes.cleroB.x, that.posicionsFitxes.cleroB.y);
      that.cleroBlau.setPosition(posicioActual.x, posicioActual.y);

      posicioActual = casella_posicio(that.posicionsFitxes.ninjaB.x, that.posicionsFitxes.ninjaB.y);
      that.ninjaBlau.setPosition(posicioActual.x, posicioActual.y);
    }

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
          let posicioCasella = casella_posicio(i,j);
          let iconSettings = this.add.image(posicioCasella.x, posicioCasella.y, textura_cuadrats).setInteractive();
          iconSettings.setDisplaySize(casellamidaX,casellamidaX);
          that = this;
          iconSettings.on('pointerup', function(event) {
            console.log('----------------------\n' +
                        'CASELLA SELECCIONADA\n' +
                        'Casella: ' + i + ',' + j + '\n' + 
                        //'Muntanya: ' + es_muntanya(i, j) + '\n' +
                        'Palau: ' + es_palau(i,j) + '\n' +
                        'Sort: ' + es_sort(i,j) + '\n' +
                        'Tropes: ' + hi_ha_alguna_tropa(i,j, that).existeixTropa + ' Equip: ' + hi_ha_alguna_tropa(i,j, that).equip +
                        '\n----------------------');
            fer_estat(i,j, that);
          });
        }
      }
    }

    // POSO EL BOTO DE OPCIONS
    let settingsButton = this.add.image(window.innerWidth-60,60, 'iconSettings').setInteractive();
    settingsButton.setDisplaySize(60,60);
    that = this;
    settingsButton.on('pointerup', function(event) {
      that.scene.start('OpcionsScene', {monedes: that.monedes, torn: that.torn, jugador_actual: that.jugador_actual, estat: that.estat, posicionsFitxes: that.posicionsFitxes}); // Obre el menu d'opcions.
    });

    // POSO EL BOTO DE LA TENDA
    let midaTenda = 200;
    let posicioTendaX = window.innerWidth-80, posicioTendaY = window.innerHeight/2;
    let tendaButton = this.add.image(posicioTendaX, posicioTendaY, 'iconTenda').setInteractive();
    tendaButton.setDisplaySize(midaTenda*0.67,midaTenda);
    that = this;
    tendaButton.on('pointerup', function(event) {
      that.scene.start('TendaScene', {monedes: that.monedes, torn: that.torn, jugador_actual: that.jugador_actual, estat: that.estat, posicionsFitxes: that.posicionsFitxes}); // Obre la tenda.
    });

    // POSEM EL TEXT DE TORN I DEL JUGADOR ACTUAL A LA PANTALLA
    this.tornText = this.add.text(16, 50, 'Torn: ' + that.torn + '\nJugador: ' + this.jugador_actual + '\nEstat: ' + that.estat, {fontSize: '32px', fill: '#000'});

    // POSEM EL CONTADOR DE MONEDES
    let midaMoneda = 50;
    let monedesIcon = this.add.image(posicioTendaX, posicioTendaY + tendaButton.displayHeight + midaMoneda*0.25, 'moneda').setInteractive();
    monedesIcon.setDisplaySize(midaMoneda,midaMoneda);
    that = this;
    monedesIcon.on('pointerup', function(event) {
      that.monedes++; // Incrementa les monedes en 1 quantitat.
      that.monedesText.setText(that.monedes);
    });
    this.monedesText = this.add.text(posicioTendaX - monedesIcon.displayWidth - 50, posicioTendaY + tendaButton.displayHeight, this.monedes, { fontSize: '32px', fill: '#000'});

    that = this;
    posicionar_fitxes(that);

    // POSEM EL TEXT DEL MOUSE PER DEBUG
    this.posicioText = this.add.text(16, 16, 'Mouse:', { fontSize: '32px', fill: '#000'});
  }

  update () {
    this.posicioText.setText('Mouse: ' + this.input.mousePointer.x + ', ' + this.input.mousePointer.y);
    let nomJugador;
    this.jugador_actual ? nomJugador = 'Vermell' : nomJugador = 'Blau';
    this.tornText.setText('Torn: ' + this.torn + '\nJugador: ' + nomJugador + '\nEstat: ' + this.estat);
  }
}
