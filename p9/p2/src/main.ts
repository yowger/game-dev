const canvas = document.getElementById("canvas1") as HTMLCanvasElement
if (!canvas) throw new Error("canvas not found")

const context = canvas.getContext("2d")!
if (!context) throw new Error("context not found")

const CANVAS_WIDTH = (canvas.width = 600)
const CANVAS_HEIGHT = (canvas.height = 600)
let gameSpeed = 5
let gameFrame = 0

const backgroundSources = [
    "./assets/images/layer-1.png",
    "./assets/images/layer-2.png",
    "./assets/images/layer-3.png",
    "./assets/images/layer-4.png",
    "./assets/images/layer-5.png",
]

async function preloadImages(sources: string[]): Promise<HTMLImageElement[]> {
    return Promise.all(
        sources.map(
            (src) =>
                new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image()
                    img.src = src
                    img.onload = () => resolve(img)
                    img.onerror = () =>
                        reject(new Error(`Failed to load image: ${src}`))
                })
        )
    )
}

class Layer {
    private context: CanvasRenderingContext2D
    private image: HTMLImageElement
    private speed: number
    private speedModifier: number
    private x: number
    // private x2: number
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
        // this.x2 = this.width
        this.image = image
        this.speedModifier = speedModifier
        this.speed = gameSpeed * this.speedModifier
    }

    update(gameSpeed: number) {
        this.speed = gameSpeed * this.speedModifier
        // if (this.x <= -this.width) {
        //     this.x = this.width + this.x2 - this.speed
        // }
        // if (this.x2 <= -this.width) {
        //     this.x2 = this.width + this.x - this.speed
        // }
        // this.x = Math.floor(this.x - this.speed)
        // this.x2 = Math.floor(this.x2 - this.speed)
        this.x = (gameFrame * this.speed) % this.width
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
            this.x + this.width,
            this.y,
            this.width,
            this.height
        )
    }
}

async function init() {
    try {
        console.time("loadAssets")

        const images = await preloadImages(backgroundSources)
        const layerSpeed = [0.2, 0.4, 0.6, 0.8, 1]
        const layers = images.map(
            (image, index) =>
                new Layer(context, image, gameSpeed, layerSpeed[index])
        )

        console.timeEnd("loadAssets")

        function animate() {
            context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

            layers.forEach((layer) => {
                layer.update(gameSpeed)
                layer.drawImage()
            })

            gameFrame--
            window.requestAnimationFrame(animate)
        }

        animate()
    } catch (error) {
        console.log("failed to initialize game: ", error)
    }
}

init()
