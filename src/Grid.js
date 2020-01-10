import {
    Sprite,
    Texture,
    Container
} from 'pixi.js-legacy'

import Cell from './Cell'

export default class Grid extends Container {
    constructor (originalParams = {}) {
        super(originalParams)

        const params = Object.assign(
            {},
            Grid.DEFAULT_PARAMS,
            originalParams
        )

        this.interactive = params.interactive

        this.cellSize = params.cellSize
        this.padding = params.padding
        this.margin = params.margin

        this.columns = params.columns
        this.rows = params.rows

        this.x = params.x
        this.y = params.y

        this.background = new Sprite(Texture.from('pixel.png'))
        this.background.width = this.padding * 2 + this.columns * this.cellSize + (this.columns - 1) * this.margin
        this.background.height = this.padding * 2 + this.rows * this.cellSize + (this.rows - 1) * this.margin
        this.background.tint = 0x000000

        this.matrix = []

        for (let y = 0; y < this.rows; y++) {
            const row = []

            for (let x = 0; x < this.columns; x++) {
                const cell = new Cell({
                    x: this.padding + x * (this.cellSize + this.margin),
                    y: this.padding + y * (this.cellSize + this.margin),
                    width: this.cellSize,
                    height: this.cellSize
                })

                row.push(cell)
            }

            this.matrix.push(row)
        }

        this.addChild(this.background, ...this.matrix.flat())

        if (this.interactive) {
            for (const cell of this.matrix.flat()) {
                cell.interactive = true

                // for (const key of ["click"]) {
                //     cell.on(key, event => this.emit(key, event))
                // }
            }
        }
    }
}

Grid.DEFAULT_PARAMS = {
    x: 0,
    y: 0,
    columns: 3,
    rows: 3,
    cellSize: 10,
    margin: 1,
    padding: 1,
    interactive: false
}