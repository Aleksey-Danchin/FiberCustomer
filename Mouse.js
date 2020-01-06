class Mouse {
    constructor (canvas) {
        const mouse = this

        this.x = 0
        this.y = 0

        this.left = false
        this.pleft = false

        canvas.addEventListener('mousemove', function (event) {
            const rect = this.getBoundingClientRect()
            mouse.x = event.clientX - rect.left
            mouse.y = event.clientY - rect.top
        })

        canvas.addEventListener('mouseup', function (event) {
            mouse.pleft = mouse.left
            mouse.left = event.buttons === 1
        })
    
        canvas.addEventListener('mousedown', function (event) {
            mouse.pleft = mouse.left
            mouse.left = event.buttons === 1
        })
    }

    tick () {
        this.pleft = this.left
    }
}