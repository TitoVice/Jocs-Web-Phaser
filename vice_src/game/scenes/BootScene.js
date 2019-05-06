import {Scene} from 'phaser'
import fons from '@/game/assets/Tauler/sky.png';
import tauler from '@/game/assets/Tauler/tauler1.png';
import bomb from '@/game/assets/Altres/bomb.png';

export default class BootScene extends Scene {
    constructor() {
        super({key: 'BootScene'})
    }

    preload() {
        this.load.image('fons', fons)
        this.load.image('tauler', tauler)
        this.load.image('bomb', bomb)
        // this.load.audio('thud', ['assets/thud.mp3', 'assets/thud.ogg'])
    }

    

    create() {
        this.scene.start('PlayScene')
    }
}
