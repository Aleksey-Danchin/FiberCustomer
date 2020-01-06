class Grid extends DisplayObject {
    constructor (originalParams = {}) {
        super(originalParams)

        const params = Object.assign({}, Grid.DEFAULT_PARAMS, originalParams)

        this.matrix = new Matrix(params.columns, params.rows)
        this.cellSize = params.cellSize
    }

    get commonWidth () {
        return this.matrix.columns * this.cellSize
    }

    get commonHeight () {
        return this.matrix.rows * this.cellSize
    }

    draw (context, func = () => {}) {
        super.draw(context, () => {
            const commonWidth = this.commonWidth
            const commonHeight = this.commonHeight
        
            context.strokeStyle = 'gray'
            context.lineWidth = 1

            for (let row = 0; row <= this.matrix.rows; row++) {
                const y = row * this.cellSize

                context.beginPath()
                context.moveTo(0, y)
                context.lineTo(commonWidth, y)
                context.stroke()
            }

            for (let column = 0; column <= this.matrix.columns; column++) {
                const x = column * this.cellSize

                context.beginPath()
                context.moveTo(x, 0)
                context.lineTo(x, commonHeight)
                context.stroke()
            }

            context.fillStyle = 'black'

            this.matrix.forEach(cell => {
                if (cell.checked) {
                    context.beginPath()
                    context.rect(
                        cell.x * this.cellSize,
                        cell.y * this.cellSize,
                        this.cellSize,
                        this.cellSize
                    )
                    context.fill()
                }
            })

            func()
        })
    }

    isUnder (x, y) {
        x -= this.offsetX
        y -= this.offsetY

        return 0 <= x && x <= this.commonWidth
            && 0 <= y && y <= this.commonHeight
    }

    getCellUnder (x, y) {
        x = parseInt((x - this.offsetX) / this.cellSize)
        y = parseInt((y - this.offsetY) / this.cellSize)

        return this.matrix.getCell(x, y)
    }
}

Grid.DEFAULT_PARAMS = {
    rows: 10,
    columns: 10,
    cellSize: 25
}