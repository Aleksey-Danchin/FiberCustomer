class PatternGrid extends Grid {
    draw (context) {
        super.draw(context, () => {
            for (let y = 0; y < this.matrix.rows; y++) {
                for (let x = 0; x < this.matrix.columns; x++) {
                    const cell = this.matrix.body[y][x]

                    if (!cell.color) {
                        continue
                    }
                    
                    context.fillStyle = cell.color
                    context.beginPath()
                    context.rect(
                        x * this.cellSize,
                        y * this.cellSize,
                        this.cellSize,
                        this.cellSize
                    )
                    context.fill()
                }
            }
        })
    }
}