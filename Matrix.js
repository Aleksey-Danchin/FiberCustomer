class Matrix {
    constructor (columns, rows) {
        this.columns = columns
        this.rows = rows

        this.body = []

        let idCounter = 1
        for (let y = 0; y < this.rows; y++) {
            const row = []

            for (let x = 0; x < this.columns; x++) {
                const cell = {
                    id: idCounter,
                    x,
                    y
                }

                row.push(cell)

                idCounter++
            }

            this.body.push(row)
        }
    }

    get flatBody () {
        return this.body.flat()
    }

    forEach (handler) {
        let isContinue = true

        const stop = () => isContinue = false

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                if (isContinue) {
                    handler(this.body[y][x], stop)
                }
            }
        }
    }

    getCell (x, y) {
        if (this.body[y] && this.body[y][x]) {
            return this.body[y][x]
        }
    }
}