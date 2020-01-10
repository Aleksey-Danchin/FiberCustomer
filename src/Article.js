import { Container } from "pixi.js";
import Grid from './Grid'
import Cell from './Cell'

export default class Article extends Container {
    constructor (originalParams = {}) {
        super(originalParams)

        const params = Object.assign(
            {},
            Article.DEFAULT_PARAMS,
            originalParams
        )
        
        this.columnsLeft = params.columnsLeft
        this.columnsRight = params.columnsRight
        this.rowsTop = params.rowsTop
        this.rowsBottom = params.rowsBottom
        this.gridsMargin = params.gridsMargin
        this.cellSize = params.cellSize

        this.refill = new Grid({
            columns: this.columnsLeft,
            rows: this.rowsTop,
            cellSize: this.cellSize,
            interactive: true
        })
        
        this.pedals = new Grid({
            x: this.refill.width + this.gridsMargin,
            columns: this.columnsRight,
            rows: this.rowsTop,
            cellSize: this.cellSize,
            interactive: true
        })
        
        this.patter = new Grid({
            y: this.gridsMargin + this.refill.height,
            columns: this.columnsLeft,
            rows: this.rowsBottom,
            cellSize: this.cellSize,
        })
        
        this.moves = new Grid({
            x: this.gridsMargin + this.refill.width,
            y: this.gridsMargin + this.refill.height,
            columns: this.columnsRight,
            rows: this.rowsBottom,
            cellSize: this.cellSize,
            interactive: true
        })

        this.addChild(this.refill, this.pedals, this.patter, this.moves)

        this.refill.on('click', event => {
            if (event.target instanceof Cell) {
                event.target.checked = !event.target.checked
            }
        })

        this.pedals.on('click', event => {
            if (event.target instanceof Cell) {
                event.target.checked = !event.target.checked
            }
        })

        this.moves.on('click', event => {
            if (event.target instanceof Cell) {
                event.target.checked = !event.target.checked
            }
        })
    }
}

Article.DEFAULT_PARAMS = {
    columnsLeft: 50,
    columnsRight: 5,
    rowsTop: 5,
    rowsBottom: 30,
    gridsMargin: 10,
    cellSize: 25
}