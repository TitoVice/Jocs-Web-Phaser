import { Scene } from 'phaser';


export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' });
    this.debugText = 0;
    this.debug = false;

    this.cavallerVermell = 0;
    this.cleroVermell = 0;
    this.ninjaVermell = 0;

    this.cavallerBlau = 0;
    this.cleroBlau = 0;
    this.ninjaBlau = 0;

    this.carta_sort_mostrada = false;
    this.textCartaSort = 0;
    this.cartaSort = 0;
    this.constant_temps_carta_sort = 1000;
    this.temps_carta_a_sortir = this.constant_temps_carta_sort; // En ms
  }

  init (data) { // Copiem totes les variables que ens passa la escena anterior
    this.torn = data.torn;
    this.jugador_actual = data.jugador_actual;
    this.estat = data.estat;
    this.posicionsFitxes = data.posicionsFitxes;
  }

  create () {
    let nomjugador;
    this.jugador_actual ? nomjugador = 'Vermell' : nomjugador = 'Groc';
    console.log("Starting PlayScene ..."
      + '\nTorn ' + this.torn
      + '\nJugador ' + nomjugador);

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

    let es_vei = function (x, y, fitxa) {
      /* Posicions disponibles per avançar 1 casella
          x-1, y-1	    x, 	 y-1      x+1, y-1
          x-1, y		    x,	 y		    x+1, y
          x-1, y+1      x,	 y+1    	x+1, y+1
      ![](/src/posició veins.png)
      */

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
     return vei;
    }

    let es_muntanya = function (x, y) {
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

    let es_palau = function (x, y, jugador_actual) {
      let palau = false;
      if (!jugador_actual) {
        palau = x === 4 && y === 0;
      } else {
        palau = x === 4 && y === 8;
      }
      return palau;
    };

    let es_sort = function (x, y) {
      return (x === 8 && y === 4) || (x === 0 && y === 4);
    };

    let casella_posicio = function (x, y) {
      let posicio = {x: x, y: y};
      let casellaX = x, casellaY = y;
      let offsetX = 6, offsetY = 25;
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
      if (!existeixTropa) {
        existeixTropa = that.posicionsFitxes.cleroV.x === x && that.posicionsFitxes.cleroV.y === y;
        if (!existeixTropa) {
          existeixTropa = that.posicionsFitxes.ninjaV.x === x && that.posicionsFitxes.ninjaV.y === y;
          if (!existeixTropa) {
            existeixTropa = that.posicionsFitxes.cavallG.x === x && that.posicionsFitxes.cavallG.y === y;
            if (!existeixTropa) {
              existeixTropa = that.posicionsFitxes.cleroG.x === x && that.posicionsFitxes.cleroG.y === y;
              if (!existeixTropa) {
                existeixTropa = that.posicionsFitxes.ninjaG.x === x && that.posicionsFitxes.ninjaG.y === y;
      }}}}}
      return existeixTropa;
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
            fitxa = that.posicionsFitxes.cavallG; break;
          case 'Moure Clero' :
            fitxa = that.posicionsFitxes.cleroG; break;
          case 'Moure Ninja' :
            fitxa = that.posicionsFitxes.ninjaG; break;
        }
      }
      switch (that.estat) {
        case 'Moure Cavall' :
        case 'Moure Clero' :
        case 'Moure Ninja' :
          // Actualitzar posicions a la estructura de dades
          if (that.debug) {
            console.log('!esMuntanya: '+!es_muntanya(x, y) + '\n' +
              '!hiHaTropa: ' + !hi_ha_alguna_tropa(x, y, that) + '\n' +
              'esVei: ' + es_vei(x, y, fitxa) + '\n' +
              '!esPalau:' + !es_palau(x, y, that.jugador_actual));
          }
          if (!es_muntanya(x, y) && !hi_ha_alguna_tropa(x, y, that) && es_vei(x, y, fitxa) && !es_palau(x, y, that.jugador_actual)) {
            fitxa.x = x;
            fitxa.y = y;
          } else { 
            break;
          }

          // Roba carta de la sort
          if (es_sort(x,y)) {
            // Roba carta de la sort
            let posicionovaX = Math.floor(Math.random() * (8-1) + 1);
            let posicionovaY = Math.floor(Math.random() * (8-1) + 1);
            
            let valid = !(es_muntanya(posicionovaX, posicionovaY, that.jugador_actual, fitxa, that) ||
              hi_ha_alguna_tropa(posicionovaX, posicionovaY, that) ||
              !es_de_dins(posicionovaX, posicionovaY));

            if (that.debug) {
              console.log('GENEREM UN NUMERO ALEATORI \n' + posicionovaX + ' ' + posicionovaY + '\nValid: ' + valid);
            }
            while (!valid) {
              posicionovaX = Math.floor(Math.random() * (8-1) + 1);
              posicionovaY = Math.floor(Math.random() * (8-1) + 1);
              if (that.debug) {
                console.log('GENEREM UN NOU NUMERO ALEATORI \n' + posicionovaX + ' ' + posicionovaY + '\nValid: ' + valid);
              }
              valid = ! (es_muntanya(posicionovaX, posicionovaY, that.jugador_actual, fitxa, that) ||
                hi_ha_alguna_tropa(posicionovaX, posicionovaY, that) ||
                !es_de_dins(posicionovaX, posicionovaY));
            }

            if (!that.cartaSort.visible) {
              let midaCarta = window.innerHeight/2;
              that.cartaSort = that.add.image(window.innerWidth/2, window.innerHeight/2, 'cartaSort');
              that.cartaSort.displayWidth = midaCarta * 0.65;
              that.cartaSort.displayHeight = midaCarta;
              that.cartaSort.visible = true;
              let jugador;
              that.jugador_actual ? jugador = ' vermell' : jugador = ' groc';
              that.textCartaSort = that.add.text(window.innerWidth/2 - midaCarta * 0.65/2 + 40, window.innerHeight/2 + midaCarta*0.25 - 40,
                that.estat + jugador + '\na la posició (' + posicionovaX + ',' + posicionovaY + ')\ndel tauler', { fontSize: '19px', fill: '#000'});
            }
            
            fitxa.x = posicionovaX;
            fitxa.y = posicionovaY;
            if (that.debug) {
              console.log(posicionovaX + ' ' + posicionovaY);
            }
          }
          
          // Guanyar la partida
          if (es_palau(x, y, !that.jugador_actual)) {
            that.jugador_actual ? that.estat = 'VERMELL' : that.estat = 'GROC';            
            that.scene.start('MenuScene', {estat: that.estat, torns: that.torns});
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
              that.torn++;
              break;
          }
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
      posicioActual = casella_posicio(that.posicionsFitxes.cavallG.x, that.posicionsFitxes.cavallG.y);
      that.cavallerBlau = that.add.image(posicioActual.x, posicioActual.y, 'cavallerGroc');
      that.cavallerBlau.setDisplaySize(casellamidaY, casellamidaY);

      posicioActual = casella_posicio(that.posicionsFitxes.cleroG.x, that.posicionsFitxes.cleroG.y);
      that.cleroBlau = that.add.image(posicioActual.x, posicioActual.y, 'cleroGroc');
      that.cleroBlau.setDisplaySize(casellamidaY, casellamidaY);

      posicioActual = casella_posicio(that.posicionsFitxes.ninjaG.x, that.posicionsFitxes.ninjaG.y);
      that.ninjaBlau = that.add.image(posicioActual.x, posicioActual.y, 'ninjaGroc');
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
      posicioActual = casella_posicio(that.posicionsFitxes.cavallG.x, that.posicionsFitxes.cavallG.y);
      that.cavallerBlau.setPosition(posicioActual.x, posicioActual.y);;

      posicioActual = casella_posicio(that.posicionsFitxes.cleroG.x, that.posicionsFitxes.cleroG.y);
      that.cleroBlau.setPosition(posicioActual.x, posicioActual.y);

      posicioActual = casella_posicio(that.posicionsFitxes.ninjaG.x, that.posicionsFitxes.ninjaG.y);
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
            if (that.debug) {
              console.log('----------------------\n' +
                'CASELLA SELECCIONADA\n' +
                'Casella: ' + i + ',' + j + '\n' + 
                //'Muntanya: ' + es_muntanya(i, j) + '\n' +
                'Palau: ' + es_palau(i,j) + '\n' +
                'Sort: ' + es_sort(i,j) + '\n' +
                'Tropes: ' + hi_ha_alguna_tropa(i,j, that) +
                '\n----------------------');
            }
            fer_estat(i,j, that);
          });
        }
      }
    }

    that = this;
    posicionar_fitxes(that);

    // POSEM EL TEXT DEL MOUSE PER DEBUG
    this.debugText = this.add.text(16, 16, '', { fontSize: '32px', fill: '#000', fontFamily: 'Montserrat'});
  }

  update () {
    if (this.debug) {
      let nomJugador;
      this.jugador_actual ? nomJugador = 'Vermell' : nomJugador = 'Groc';
      this.debugText.setText('Mouse: ' + this.input.mousePointer.x + ', ' + this.input.mousePointer.y +
        '\nTorn: ' + this.torn + '\nJugador: ' + nomJugador + '\nEstat: ' + this.estat);
      //console.log(this.debugText.text);
    }

    if (this.cartaSort.visible === true) {
      if (this.temps_carta_a_sortir <= 10) {
        this.cartaSort.visible = false;
        this.temps_carta_a_sortir = this.constant_temps_carta_sort;
        this.textCartaSort.setText('');
      } else {
        this.temps_carta_a_sortir -= 10;
        if (this.debug) {
          console.log('Temps: ' +this.temps_carta_a_sortir);
        }
      }
    }
  }
}
