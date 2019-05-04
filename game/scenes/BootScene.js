import {Scene} from 'phaser'
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

export default class BootScene extends Scene {
    constructor() {
        super({key: 'BootScene'})
    }

    preload() {
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
    }

    create() {
        this.scene.start('MenuScene')
    }
}
