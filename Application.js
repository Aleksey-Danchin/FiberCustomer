class Application {
    constructor (originalParams = {}) {
        const params = Object.assign(
            {},
            Application.DEFAULT_PARAMS,
            originalParams
        )

        this.state = new Container

        if (!params.el) {
            params.el = document.body
        }

        this.el = params.el
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')

        this.el.append(this.canvas)

        document.body.style.overflow = 'hidden'
        document.body.style.padding = 0
        document.body.style.margin = 0

        this.canvas.style.margin = 0
        this.canvas.style.padding = 0

        this.canvasResize()

        window.addEventListener('resize', () => this.canvasResize())
    
        this.loop(0)
    }

    canvasResize () {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
    }
    
    clearCanvas () {
        this.canvas.width |= 0
    }

    tick () {}

    loop (timestamp) {
        requestAnimationFrame(x => this.loop(x))

        this.tick(timestamp)

        this.clearCanvas()
    }
}

Application.DEFAULT_PARAMS = {}