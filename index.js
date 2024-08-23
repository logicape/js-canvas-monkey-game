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
//---------CLASSES-----------//

class Monkey {
    constructor({ pos, velocity, direction }) {
        this.pos = pos,
            this.color = 'red',
            this.size = {
                width: 30,
                height: 30
            },
            this.velocity = velocity,
            this.direction = direction,
            this.health,
            this.dirTendency = 1
    }

    draw() {
        //console.log('d:'+this.direction+' x:'+this.pos.x+' y:'+this.pos.y)
        c.fillStyle = this.color
        c.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height)
    }

    move() {
        if (true) { //why move?
            switch (this.direction) {
                case 1: // --N--
                    if (this.pos.y - this.velocity < 0) {
                        this.pos.y = 0
                        this.velocity = 0
                        this.direction = 5 // S reverse direction
                    } else {
                        this.pos.y -= this.velocity
                    }
                    break
                case 2: // --NE--
                    //check x
                    if (this.pos.x + this.velocity + this.size.width > canvas.width) {
                        this.pos.x = canvas.width - this.size.width
                        this.velocity = 0
                        this.direction = 8 // NW turn direction
                    } else {
                        this.pos.x += this.velocity
                    }
                    //check y
                    if (this.pos.y - this.velocity < 0) {
                        this.pos.y = 0
                        this.velocity = 0
                        this.direction = 6 // S finish reverse direction
                    } else {
                        this.pos.y -= this.velocity
                    }
                    break
                case 3: // --E--
                    if (this.pos.x + this.velocity + this.size.width > canvas.width) {
                        this.pos.x = canvas.width - this.size.width
                        this.velocity = 0
                        this.direction = 7 // W reverse direction
                    } else {
                        this.pos.x += this.velocity
                    }
                    break
                case 4: // --SE--
                    //check x
                    if (this.pos.x + this.velocity + this.size.width > canvas.width) {
                        this.pos.x = canvas.width - this.size.width
                        this.velocity = 0
                        this.direction = 6 // SW turn direction
                    } else {
                        this.pos.x += this.velocity
                    }
                    //check y
                    if (this.pos.y + this.velocity + this.size.height > canvas.height) {
                        this.pos.y = canvas.height - this.size.height
                        this.velocity = 0
                        this.direction = 8 // NE finish reverse direction
                    } else {
                        this.pos.y += this.velocity
                    }
                    break
                case 5: // --S--
                    if (this.pos.y + this.velocity + this.size.height > canvas.height) {
                        this.pos.y = canvas.height - this.size.height
                        this.velocity = 0
                        this.direction = 1 // N reverse direction
                    } else {
                        this.pos.y += this.velocity
                    }
                    break
                case 6: // --SW--
                    //check x
                    if (this.pos.x - this.velocity < 0) {
                        this.pos.x = 0
                        this.velocity = 0
                        this.direction = 4 // SE turn direction
                    } else {
                        this.pos.x -= this.velocity
                    }
                    //check y
                    if (this.pos.y + this.velocity + this.size.height > canvas.height) {
                        this.pos.y = canvas.height - this.size.height
                        this.velocity = 0
                        this.direction = 2 // NE finish reverse direction
                    } else {
                        this.pos.y += this.velocity
                    }
                    break
                case 7: // --W--
                    if (this.pos.x - this.velocity < 0) {
                        this.pos.x = 0
                        this.velocity = 0
                        this.direction = 3 // E reverse direction
                    } else {
                        this.pos.x -= this.velocity
                    }
                    break
                case 8: // --NW--
                    //check x
                    if (this.pos.x - this.velocity < 0) {
                        this.pos.x = 0
                        this.velocity = 0
                        this.direction = 2 // NE turn direction
                    } else {
                        this.pos.x -= this.velocity
                    }
                    //check y
                    if (this.pos.y - this.velocity < 0) {
                        this.pos.y = 0
                        this.velocity = 0
                        this.direction = 4 // SE finish reverse direction
                    } else {
                        this.pos.y -= this.velocity
                    }
                    break
            }
        }
    }
    determineIfNewDirection() {
        //determine if a new direction is desired
        //change direction 50% of the time
        if (getRnd(100) > globals.percentChangeDirection) {
            //determine new direction - first, left or right?
            if (getRnd(100) % 2 === 0) {
                //left - rotate even probability 1 to this.dirTendency
                this.direction -= getRnd(this.dirTendency)
                if (this.direction < 1) {
                    this.direction += 8
                }
            } else {
                //right - rotate even probability 1 to this.dirTendency
                this.direction += getRnd(this.dirTendency)
                if (this.direction > 8) {
                    this.direction -= 8
                }
            }
        }
    }

    update() {
        //other code that affects the Monkey before it's drawn
        this.draw()
        this.determineIfNewDirection()
        this.move()
    }
}

class Plant {
    constructor({ pos }) {
        this.pos = pos,
            this.color = 'green',
            this.size = {
                width: 20,
                height: 20
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
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    monkey.update()
    placePlants()
    setTimeout(() => {
        window.requestAnimationFrame(animate)
    }, "80")
}

animate()