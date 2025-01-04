interface PlayerOptions {
    x: number
    y: number
    radius: number
    color: string
}

class Player {
    private x: number
    private y: number
    private radius: number
    private color: string

    constructor(options: PlayerOptions) {
        this.x = options.x
        this.y = options.y
        this.radius = options.radius
        this.color = options.color
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        context.fillStyle = this.color
        context.fill()
    }
}

interface ProjectileOptions {
    x: number
    y: number
    radius: number
    color: string
}

class Projectile {
    private x: number
    private y: number
    private radius: number
    private color: string

    constructor(options: ProjectileOptions) {
        this.x = options.x
        this.y = options.y
        this.radius = options.radius
        this.color = options.color
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        context.fillStyle = this.color
        context.fill()
    }
}

const canvasEl = document.querySelector("canvas")
if (!canvasEl) throw new Error("canvas not found")

canvasEl.width = window.innerWidth
canvasEl.height = window.innerHeight

const context = canvasEl.getContext("2d")
if (!context) throw new Error("context not found")

const centerX = canvasEl.width / 2
const centerY = canvasEl.height / 2
const player = new Player({
    x: centerX,
    y: centerY,
    radius: 30,
    color: "red",
})

player.draw(context)

window.addEventListener("click", (event: MouseEvent) => {
    // event.
    // const projectile = new Projectile({})
})
