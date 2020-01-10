class Container extends DisplayObject {
    constructor (originalParams = {}) {
        super(originalParams)

        this.items = []
    }

    add (...items) {
        for (const item of items) {
            if (item.parent && item.parent !== this) {
                item.parent.remove(item)
                item.parent = this
                this.items.push(item)
            }
        }
    }

    isUnder (x, y) {
        return this.items.some(item => item.isUnder(x, y))
    }

    draw (context, func = () => {}) {
        super.draw(context, () => {
            for (const item of this.items) {
                item.draw(context)
            }
        })
    }
}