// JavaScript Document

//---------INITIALIZATION---------//
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

//---------CONSTANTS---------//

//---------CLASSES-----------//

class Monkey {
    constructor({ pos }) {
        this.pos = pos,
            this.color = 'red',
            this.size = {
                width: 50,
                height: 50
            },
            this.velocity,
            this.direction,
            this.health,
            this.dirTendency = 1
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height)
    }

    move() {
        if (true) { //why move?
            switch (this.direction) {
                case 1:                         // N
                    if (this.pos.y - this.velocity < 0) {
                        this.pos.y = 0
                        this.velocity = 0
                        this.direction = 5      // S reverse direction
                    } else {
                        this.pos.y -= this.velocity
                    }
                break
                case 3:                         // E
                    if (this.pos.x + this.velocity + this.size.width > canvas.width + this.size.width) {
                        this.pos.x = canvas.width - this.size.width
                        this.velocity = 0
                        this.direction = 7      // W reverse direction
                    } else {
                        this.pos.x += this.velocity
                    }
                break
                case 5:                         // S
                    if (this.pos.y + this.velocity + this.size.height > canvas.height + this.size.height) {
                        this.pos.y = canvas.height - this.size.height
                        this.velocity = 0
                        this.direction = 1      // N reverse direction
                    } else {
                        this.pos.y += this.velocity
                    }
                break
                case 7:                         // W
                    if (this.pos.x - this.velocity < 0) {
                        this.pos.x = 0
                        this.velocity = 0
                        this.direction = 3      // E reverse direction
                    } else {
                        this.pos.x -= this.velocity
                    }
                break
            }
        }
    }

    update() {
        //other code that affects the Monkey before it's drawn
        this.move()
        this.draw()
    }
}

class Plant {
    constructor({ pos }) {
        this.pos = pos,
            this.color = 'green',
            this.size = {
                width: 25,
                height: 25
            },
            this.health
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height)
    }

    update() {
        this.draw()
    }

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

const monkey = new Monkey({
    pos: {
        x: canvas.width / 2,
        y: canvas.height / 2
    }
})

const plant1 = new Plant({
    pos: {
        x: getRnd(canvas.width - 5),
        y: getRnd(canvas.height - 5)
    }
})

const plant2 = new Plant({
    pos: {
        x: getRnd(canvas.width - 5),
        y: getRnd(canvas.height - 5)
    }
})

const plant3 = new Plant({
    pos: {
        x: getRnd(canvas.width - 5),
        y: getRnd(canvas.height - 5)
    }
})

//First Draws

placePlants()

//----------ANIMATION-------------//

function animate() {
    window.requestAnimationFrame(animate)
    monkey.update()

}

animate()