import {
    Sprite,
    Texture
} from 'pixi.js-legacy'

export default class Cell extends Sprite {
    constructor (originalParams) {
        super(Texture.from('pixel.png'))

        const params = Object.assign(
            {},
            Cell.DEFAULT_PARAMS,
            originalParams
        )

        this.x = params.x
        this.y = params.y

        this.width = params.width
        this.height = params.height

        this.interactive = params.interactive
        this.checkedColor = params.checkedColor
        this._checked = false
    }

    get checked () {
        return this._checked
    }

    set checked (value) {
        this._checked = !!value

        if (this._checked) {
            this.tint = this.checkedColor
        }

        return value
    }
}

Cell.DEFAULT_PARAMS = {
    x: 0,
    y: 0,
    width: 10,
    height: 10,
    interactive: false,
    checkedColor: 0x000000,
    color: 0x000000
}