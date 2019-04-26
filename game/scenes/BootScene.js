import {Scene} from 'phaser'
import fons from '@/game/assets/sky.png';
import tauler from '@/game/assets/tauler1.png';
import bomb from '@/game/assets/bomb.png';
import icon from '@/game/assets/icon.svg';

export default class BootScene extends Scene {
    constructor() {
        super({key: 'BootScene'})
    }

    preload() {
        this.load.image('fons', fons)
        this.load.image('tauler', tauler)
        this.load.image('bomb', bomb)
        this.load.sprite('icon', icon);
        // this.load.audio('thud', ['assets/thud.mp3', 'assets/thud.ogg'])
    }

    create() {
        this.scene.start('PlayScene')
    }
}
