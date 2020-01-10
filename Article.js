class Article extends Container {
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
            cellSize: this.cellSize
        })
        
        this.pedals = new Grid({
            offsetX: this.refill.commonWidth + this.gridsMargin,
            columns: this.columnsRight,
            rows: this.rowsTop,
            cellSize: this.cellSize
        })
        
        this.patter = new PatternGrid({
            offsetY: this.gridsMargin + this.refill.commonHeight,
            columns: this.columnsLeft,
            rows: this.rowsBottom,
            cellSize: this.cellSize
        })
        
        this.moves = new Grid({
            offsetX: this.gridsMargin + this.refill.commonWidth,
            offsetY: this.gridsMargin + this.refill.commonHeight,
            columns: this.columnsRight,
            rows: this.rowsBottom,
            cellSize: this.cellSize
        })

        this.add(this.refill, this.pedals, this.patter, this.moves)
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