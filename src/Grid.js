import {
    Sprite,
    Texture,
    Container
} from 'pixi.js-legacy'

import Cell from './Cell'

export default class Grid extends Container {
    constructor () {
        super()

        this.background = new Sprite(Texture.from('pixel.png'))
        this.background.width = 100
        this.background.height = 100
        this.background.tint = 0x000000

        this.matrix = []

        let counter = 0

        for (let y = 0; y < 3; y++) {
            const row = []

            for (let x = 0; x < 3; x++) {
                const cell = new Cell

                const item = {
                    id: ++counter,
                    cell,
                    x,
                    y,
                }

                cell.x = 5 + x * 20
                cell.y = 5 + y * 20

                row.push(item)
            }

            this.matrix.push(row)
        }

        this.addChild(this.background, ...this.matrix.flat().map(x => x.cell))
    }
}