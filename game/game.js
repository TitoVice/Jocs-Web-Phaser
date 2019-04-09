import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PlayScene from './scenes/PlayScene'


function launch() {
    new Phaser.Game({
        type: Phaser.AUTO,
        width: "100%",
        height: "99%",
        parent: 'game-container',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 800},
                debug: false
            }
        },
        scene: [BootScene, PlayScene]
    })
}

export default launch
export {launch}
