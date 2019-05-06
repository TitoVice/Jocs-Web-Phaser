import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PlayScene from './scenes/PlayScene'


function launch() {
    new Phaser.Game({
        type: Phaser.AUTO,
        width: "100%",
        height: "90%",
        parent: 'game-container',
        physics: {
            default: 'Arcade',
            arcade: {
                gravity: {y: 600},
                debug: false
            }
        },
        scene: [BootScene, PlayScene]
    })
}

export default launch
export {launch}
