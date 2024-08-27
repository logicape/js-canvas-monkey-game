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
    initNumPlants: 6,
    plantUnitSize: 20
}

//---------FUNCTIONS--------------//

//Inititalizations

//Utilities

function getRnd(max) {
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * maxFloored + 1)
}

function actorPlantCollision(actor, plant) {
    return actor.pos.x + actor.size.width >= plant.pos.x &&
        actor.pos.x <= plant.pos.x + plant.unitSize.width &&
        actor.pos.y + actor.size.height >= plant.pos.y &&
        actor.pos.y <= plant.pos.y + plant.unitSize.height
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
            x: getRnd(canvas.width - globals.plantUnitSize),
            y: getRnd(canvas.height - globals.plantUnitSize)
        }
    })
}

//----------ANIMATION-------------//

function animate() {

    //update objects
    actors[0].update()
    for (var i = 0; i < globals.initNumPlants; i++) {
        plants[i].update()
    }

    //check for Trunk collisions
    for (var i = 0; i < globals.initNumPlants; i++) {
        if (actorPlantCollision(actors[0], plants[i])) {
            handleTrunkCollision(actors[0])
        }
    }

    //check for Leaf collisions
    for (var i = 0; i < globals.initNumPlants; i++) {
        for (var j = 0; j < plants[i].leafs.length; j++) {
            if (actorPlantCollision(actors[0], plants[i].leafs[j])) {
                handleLeafCollision(actors[0], plants[i].leafs[j])

            }
        }
    }

    //set framerate
    setTimeout(() => {
        window.requestAnimationFrame(animate)
    }, "66")
}

animate()

//-------------CoLLISION---------------//

function handleTrunkCollision(actor) {
    actor.direction += 4
    if (actor.direction > 8) {
        actor.direction -= 8
    }
}

function handleLeafCollision(actor, leaf) {
    console.log("hit a leaf")
    leaf.color = 'black'
    c.fillStyle.color = leaf.color
    c.fillRect(leaf.pos.x, leaf.pos.y, leaf.unitSize.width, leaf.unitSize.height)
}