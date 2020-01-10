import {
    Sprite,
    Texture
} from 'pixi.js-legacy'

export default class Cell extends Sprite {
    constructor () {
        super(Texture.from('pixel.png'))

        this.width = 15
        this.height = 15
    }
}