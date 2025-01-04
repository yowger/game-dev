const ANIMATION_TYPES = {
    IDLE: "IDLE",
    JUMP: "JUMP",
    FALL: "FALL",
    RUN: "RUN",
    DIZZY: "DIZZY",
    SIT: "SIT",
    ROLL: "ROLL",
    BITE: "BITE",
    KO: "KO",
    GET_HIT: "GET_HIT",
} as const

type ObjectValues<T> = T[keyof T]

type AnimationTypes = ObjectValues<typeof ANIMATION_TYPES>

interface AnimationState {
    name: AnimationTypes
    frames: number
}

interface Frames {
    loc: Location[]
}

interface Location {
    x: number
    y: number
}

interface SpriteAnimations {
    [key: string]: Frames
}

const canvasEl = document.getElementById("canvas") as HTMLCanvasElement
if (!canvasEl) throw new Error("canvas not found")

const context = canvasEl.getContext("2d")

const CANVAS_WIDTH = (canvasEl.width = 600)
const CANVAS_HEIGHT = (canvasEl.height = 600)

const playerImage = new Image()
playerImage.src = "./assets/shadow_dog.png"

const spriteWidth = 575
const spriteHeight = 523
let gameFrame = 0
const staggerFrames = 9
const spriteAnimations: SpriteAnimations = {}
const animationStates: AnimationState[] = [
    { name: ANIMATION_TYPES.IDLE, frames: 7 },
    { name: ANIMATION_TYPES.JUMP, frames: 7 },
    { name: ANIMATION_TYPES.FALL, frames: 7 },
    { name: ANIMATION_TYPES.RUN, frames: 9 },
    { name: ANIMATION_TYPES.DIZZY, frames: 11 },
    { name: ANIMATION_TYPES.SIT, frames: 5 },
    { name: ANIMATION_TYPES.ROLL, frames: 7 },
    { name: ANIMATION_TYPES.BITE, frames: 7 },
    { name: ANIMATION_TYPES.KO, frames: 12 },
    { name: ANIMATION_TYPES.GET_HIT, frames: 4 },
]
// map animation frames
animationStates.forEach((state, index) => {
    let frames: Frames = { loc: [] }

    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth
        let positionY = index * spriteHeight
        frames.loc.push({ x: positionX, y: positionY })
    }

    spriteAnimations[state.name] = frames
})

console.log("spriteAnimations", spriteAnimations)

function animate() {
    if (!context) throw new Error("context not found")

    let position =
        Math.floor(gameFrame / staggerFrames) %
        spriteAnimations[ANIMATION_TYPES.KO].loc.length
    let frameX = spriteWidth * position
    let frameY = spriteAnimations[ANIMATION_TYPES.KO].loc[position].y

    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    context.drawImage(
        playerImage,
        frameX,
        frameY,
        spriteWidth,
        spriteHeight,
        0,
        0,
        spriteWidth,
        spriteHeight
    )

    gameFrame++
    window.requestAnimationFrame(animate)
}

animate()
