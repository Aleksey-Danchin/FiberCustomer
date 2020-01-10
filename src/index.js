import {
    Application
} from 'pixi.js-legacy'


import Article from './Article'

const app = new Application({
    backgroundColor: 0xffffff,
    resizeTo: window
})

const article = new Article

app.stage.addChild(article)

console.log(article)

document.body.append(app.view)

/*
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
*/