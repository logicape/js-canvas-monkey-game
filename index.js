// JavaScript Document

//---------INITIALIZATION---------//
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

//---------CONSTANTS---------//

const globals = {
    percentChangeDirection: 50
}

//---------FUNCTIONS--------------//

//Inititalizations

function placePlants() {
    plant1.draw()
    plant2.draw()
    plant3.draw()
}

//Utilities

function getRnd(max) {
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * maxFloored + 1)
}

//---------INSTANTIATIONS-----------//

const actor = new Actor({
    pos: {
        x: canvas.width / 2,
        y: canvas.height / 2
    },
    velocity: 12,
    direction: getRnd(8)
})

const plant1 = new Plant({
    pos: {
        x: getRnd(canvas.width - 20),
        y: getRnd(canvas.height - 20)
    }
})

const plant2 = new Plant({
    pos: {
        x: getRnd(canvas.width - 20),
        y: getRnd(canvas.height - 20)
    }
})

const plant3 = new Plant({
    pos: {
        x: getRnd(canvas.width - 20),
        y: getRnd(canvas.height - 20)
    }
})

//First Draws



//----------ANIMATION-------------//

function animate() {
    //c.fillStyle = 'black'
    //c.fillRect(0, 0, canvas.width, canvas.height)
    actor.update()
    plant1.update()
    plant2.update()
    plant3.update()
    placePlants()
    setTimeout(() => {
        window.requestAnimationFrame(animate)
    }, "10")
}

animate()