const BORDER_PADDING = 10
const GRID_PADDING = 15
const CELL_SIZE = 20

const COLUMNS1 = 50
const COLUMNS2 = 5
const ROWS1 = 4
const ROWS2 = 40

const TOP_COLOR = 'green'
const RIGHT_COLOR = 'pink'

const app = new Application()

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const mouse = new Mouse(canvas)

const refillGrid = new Grid({
    offsetX: BORDER_PADDING,
    offsetY: BORDER_PADDING,
    columns: COLUMNS1,
    rows: ROWS1,
    cellSize: CELL_SIZE
})

const pedalsGrid = new Grid({
    offsetX: BORDER_PADDING + refillGrid.commonWidth + GRID_PADDING,
    offsetY: BORDER_PADDING,
    columns: COLUMNS2,
    rows: ROWS1,
    cellSize: CELL_SIZE
})

const patterGrid = new PatternGrid({
    offsetX: BORDER_PADDING,
    offsetY: BORDER_PADDING + GRID_PADDING + refillGrid.commonHeight,
    columns: COLUMNS1,
    rows: ROWS2,
    cellSize: CELL_SIZE
})

const movesGrid = new Grid({
    offsetX: BORDER_PADDING + GRID_PADDING + refillGrid.commonWidth,
    offsetY: BORDER_PADDING + GRID_PADDING + refillGrid.commonHeight,
    columns: COLUMNS2,
    rows: ROWS2,
    cellSize: CELL_SIZE
})

init()

function init () {
    canvasResize()
    
    window.addEventListener('resize', canvasResize)

    loop(0)
}

function canvasResize () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

function clearCanvas () {
    canvas.width |= 0
}

function loop (timestampe) {
    requestAnimationFrame(loop)

    clearCanvas()

    drawRectangle(
        BORDER_PADDING,
        BORDER_PADDING,
        refillGrid.commonWidth,
        3,
        TOP_COLOR
    )

    drawRectangle(
        BORDER_PADDING + refillGrid.commonWidth + GRID_PADDING + pedalsGrid.commonWidth,
        BORDER_PADDING + pedalsGrid.commonHeight + GRID_PADDING,
        3,
        movesGrid.commonHeight,
        RIGHT_COLOR
    )

    refillGrid.draw(context)
    pedalsGrid.draw(context)
    patterGrid.draw(context)
    movesGrid.draw(context)

    if (refillGrid.isUnder(mouse.x, mouse.y)) {
        const cell = refillGrid.getCellUnder(mouse.x, mouse.y)

        if (cell) {
            drawRectangle(
                refillGrid.offsetX + cell.x * refillGrid.cellSize,
                refillGrid.offsetY + cell.y * refillGrid.cellSize,
                refillGrid.cellSize,
                refillGrid.cellSize,
                'red'
            )

            if (!mouse.left && mouse.pleft) {
                if (cell.checked) {
                    cell.checked = false
                }

                else {
                    refillGrid.matrix.forEach(cCell => {
                        if (cCell.x === cell.x) {
                            cCell.checked = false
                        }
                    })

                    cell.checked = true
                }

                updatePatternMatrix()
            }
        }
    }

    if (pedalsGrid.isUnder(mouse.x, mouse.y)) {
        const cell = pedalsGrid.getCellUnder(mouse.x, mouse.y)

        if (cell) {
            drawRectangle(
                pedalsGrid.offsetX + cell.x * pedalsGrid.cellSize,
                pedalsGrid.offsetY + cell.y * pedalsGrid.cellSize,
                pedalsGrid.cellSize,
                pedalsGrid.cellSize,
                'green'
            )

            if (!mouse.left && mouse.pleft) {
                cell.checked = !cell.checked

                updatePatternMatrix()
            }
        }
        
    }

    if (movesGrid.isUnder(mouse.x, mouse.y)) {
        const cell = movesGrid.getCellUnder(mouse.x, mouse.y)

        if (cell) {
            drawRectangle(
                movesGrid.offsetX + cell.x * movesGrid.cellSize,
                movesGrid.offsetY + cell.y * movesGrid.cellSize,
                movesGrid.cellSize,
                movesGrid.cellSize,
                'blue'
            )

            if (!mouse.left && mouse.pleft) {
                if (cell.checked) {
                    cell.checked = false
                }

                else {
                    movesGrid.matrix.forEach(cCell => {
                        if (cCell.y === cell.y) {
                            cCell.checked = false
                        }
                    })
                    cell.checked = true
                }

                updatePatternMatrix()
            }
        }
        
    }

    mouse.tick()
}

function drawRectangle (x, y, widht, height, color) {
    context.fillStyle = color

    context.beginPath()
    context.rect(x, y, widht, height)
    context.fill()
}

function updatePatternMatrix () {
    patterGrid.matrix.forEach(cell => cell.color = false)
    
    for (let y = 0; y < ROWS2; y++) {
        const moves = movesGrid.matrix.body[y].filter(cell => cell.checked)

        if (!moves.length) {
            continue
        }

        const move = moves[0].x

        const pedals = pedalsGrid.matrix.flatBody
            .filter(cell => cell.x === move && cell.checked)
            .map(cell => cell.y)

        if (!pedals.length) {
            continue
        }

        const refills = pedals.map(y => refillGrid.matrix.body[y])

        for (let x = 0; x < COLUMNS1; x++) {
            const flag = refills.some(row => row[x].checked)

            patterGrid.matrix.body[y][x].color = flag ? TOP_COLOR : RIGHT_COLOR
        }
    }
}