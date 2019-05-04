import {Scene} from 'phaser'

// UI
import fons from '@/game/assets/sky.png';
import tauler from '@/game/assets/tauler1.png';
import imgMenuNormal from '@/game/assets/imgMenuNormal.png';
import imgMenuHover from '@/game/assets/imgMenuHover.png';
import imgMenuClicked from '@/game/assets/imgMenuClicked.png';
import iconSettings from '@/game/assets/settings.png';
import transparent from '@/game/assets/_transparent.png';
import debugSquare from '@/game/assets/cuadratDebug.png';
import iconTenda from '@/game/assets/store.png';
import moneda from '@/game/assets/coin.png';

// Tropes
import cavallerVermell from '@/game/assets/Fitxes/fitxes_caballer_red.png';
import cleroVermell from '@/game/assets/Fitxes/fitxes_clero_red.png';
import ninjaVermell from '@/game/assets/Fitxes/fitxes_ninja_red.png';

import cavallerBlau from '@/game/assets/Fitxes/fitxes_caballer_blau.png';
import cleroBlau from '@/game/assets/Fitxes/fitxes_clero_blau.png';
import ninjaBlau from '@/game/assets/Fitxes/fitxes_ninja_blau.png';


export default class BootScene extends Scene {
    constructor() {
        super({key: 'BootScene'})
    }

    preload() {

        // Carreguem assets de la UI
        this.load.image('fons', fons)
        this.load.image('tauler', tauler)
        this.load.image('imgMenuNormal', imgMenuNormal)
        this.load.image('imgMenuHover', imgMenuHover)
        this.load.image('imgMenuClicked', imgMenuClicked)
        this.load.image('iconSettings', iconSettings)
        this.load.image('transparent', transparent)
        this.load.image('debugSquare', debugSquare)
        this.load.image('iconTenda', iconTenda)
        this.load.image('moneda', moneda)


        // Carreguem assets de les tropes
        this.load.image('cavallerVermell', cavallerVermell)
        this.load.image('cleroVermell', cleroVermell)
        this.load.image('ninjaVermell', ninjaVermell)

        this.load.image('cavallerBlau', cavallerBlau)
        this.load.image('cleroBlau', cleroBlau)
        this.load.image('ninjaBlau', ninjaBlau)
    }

    create() {
        this.scene.start('MenuScene')
    }
}
