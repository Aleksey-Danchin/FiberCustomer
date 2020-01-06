class DisplayObject {
    constructor (originalParams = {}) {
        const params = Object.assign({}, DisplayObject.DEFAULT_PARAMS, originalParams)

        this.show = params.show
        this.offsetX = params.offsetX
        this.offsetY = params.offsetY
    }

    get commonWidth () {
        return 0
    }

    get commonHeight () {
        return 0
    }

    isUnder () {
        return false
    }

    draw (context, handler) {
        if (!this.show) {
            return
        }

        context.save()
        context.translate(this.offsetX, this.offsetY)

        handler(this, context)

        context.restore()
    }
}

DisplayObject.DEFAULT_PARAMS = {
    show: true,
    offsetX: 0,
    offsetY: 0
}