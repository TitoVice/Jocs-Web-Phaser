import {Scene} from 'phaser'
import fons from '@/game/assets/sky.png';
import tauler from '@/game/assets/tauler1.png';
import bomb from '@/game/assets/bomb.png';
import imgMenuNormal from '@/game/assets/imgMenuNormal.png';
import imgMenuHover from '@/game/assets/imgMenuHover.png';
import imgMenuClicked from '@/game/assets/imgMenuClicked.png';
//import icon from '@/game/assets/icon.svg';

export default class BootScene extends Scene {
    constructor() {
        super({key: 'BootScene'})
    }

    preload() {
        this.load.image('fons', fons)
        this.load.image('tauler', tauler)
        this.load.image('bomb', bomb)
        this.load.image('imgMenuNormal', imgMenuNormal)
        this.load.image('imgMenuHover', imgMenuHover)
        this.load.image('imgMenuClicked', imgMenuClicked)
        // this.load.sprite('icon', icon);
        // this.load.audio('thud', ['assets/thud.mp3', 'assets/thud.ogg'])
    }

    create() {
        this.scene.start('MenuScene')
    }
}
