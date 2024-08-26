// JavaScript Document

//---------INITIALIZATION---------//
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

//---------CONSTANTS---------//

const globals = {
    percentChangeDirection: 50,
    initNumPlants: 6
}

//---------FUNCTIONS--------------//

//Inititalizations

//Utilities

function getRnd(max) {
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * maxFloored + 1)
}

//---------INSTANTIATIONS-----------//

const actors = []
const plants = []

actors[0] = new Actor({
    pos: {
        x: canvas.width / 2,
        y: canvas.height / 2
    },
    velocity: 12,
    direction: getRnd(8)
})

for (var i = 0; i < globals.initNumPlants; i++) {
    plants[i] = new Plant({
        pos: {
            x: getRnd(canvas.width - 20),
            y: getRnd(canvas.height - 20)
        }
    })
}

//----------ANIMATION-------------//

function animate() {
    //c.fillStyle = 'black'
    //c.fillRect(0, 0, canvas.width, canvas.height)
    actors[0].update()
    for (var i = 0; i < globals.initNumPlants; i++) {
        plants[i].update()
    }
    setTimeout(() => {
        window.requestAnimationFrame(animate)
    }, "66")
}

animate()