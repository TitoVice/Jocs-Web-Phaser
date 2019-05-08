import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PlayScene from './scenes/PlayScene'
import MenuScene from './scenes/MenuScene'
import FinalScene from './scenes/FinalScene';

function launch() {
    new Phaser.Game({
        type: Phaser.AUTO,
        width: "100%",
        height: "99%",
        parent: 'game-container',
        scene: [BootScene, PlayScene, MenuScene, FinalScene]
    })
}

export default launch
export {launch}
