const canvas = document.getElementById("canvas1") as HTMLCanvasElement
if (!canvas) throw new Error("canvas not found")

const context = canvas.getContext("2d")!
if (!context) throw new Error("context not found")

const CANVAS_WIDTH = (canvas.width = 600)
const CANVAS_HEIGHT = (canvas.height = 600)
let gameSpeed = 5

const backgroundLayer1 = new Image()
const backgroundLayer2 = new Image()
const backgroundLayer3 = new Image()
const backgroundLayer4 = new Image()
const backgroundLayer5 = new Image()

backgroundLayer1.src = "./assets/images/layer-1.png"
backgroundLayer2.src = "./assets/images/layer-2.png"
backgroundLayer3.src = "./assets/images/layer-3.png"
backgroundLayer4.src = "./assets/images/layer-4.png"
backgroundLayer5.src = "./assets/images/layer-5.png"

class Layer {
    private context: CanvasRenderingContext2D
    private image: HTMLImageElement
    private speed: number
    private speedModifier: number
    private x: number
    private x2: number
    private y: number
    private width: number
    private height: number

    constructor(
        context: CanvasRenderingContext2D,
        image: HTMLImageElement,
        gameSpeed: number,
        speedModifier: number
    ) {
        this.context = context
        this.x = 0
        this.y = 0
        this.width = 2400
        this.height = 700
        this.x2 = this.width
        this.image = image
        this.speedModifier = speedModifier
        this.speed = gameSpeed * this.speedModifier
    }

    update(gameSpeed: number) {
        this.speed = gameSpeed * this.speedModifier
        if (this.x <= -this.width) {
            this.x = this.width + this.x2 - this.speed
        }
        if (this.x2 <= -this.width) {
            this.x2 = this.width + this.x - this.speed
        }
        this.x = Math.floor(this.x - this.speed)
        this.x2 = Math.floor(this.x2 - this.speed)
    }

    drawImage() {
        this.context.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height
        )
        this.context.drawImage(
            this.image,
            this.x2,
            this.y,
            this.width,
            this.height
        )
    }
}

const layer4 = new Layer(context, backgroundLayer4, gameSpeed, 0.2)
const layer5 = new Layer(context, backgroundLayer5, gameSpeed, 0.5)

function animate() {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    layer4.update(gameSpeed)
    layer4.drawImage()
    layer5.update(gameSpeed)
    layer5.drawImage()

    window.requestAnimationFrame(animate)
}

animate()
