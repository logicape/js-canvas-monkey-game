// JavaScript Document

//---------CLASSES-----------//

class Actor {
    constructor({ pos, velocity, direction }) {
        this.pos = pos,
            this.color = {
                outer: 'red',
                inner: 'white'
            },
            this.size = {
                width: 20,
                height: 20
            },
            this.velocity = velocity,
            this.direction = direction,
            this.health,
            this.dirTendency = 1,
            this.age = 0,
            this.lifeExpectancy = 650,
            this.cyclesPerGrowth = 80,
            this.unitGrowth = 5,
            this.alive = true
    }

    move() {
        if (true) { //why move?
            switch (this.direction) {
                case 1: // --N--
                    if (this.pos.y - this.velocity < 0) {
                        this.pos.y = 0
                        //this.velocity = 0
                        this.direction = 5 // S reverse direction
                    } else {
                        this.pos.y -= this.velocity
                    }
                    break
                case 2: // --NE--
                    //check x
                    if (this.pos.x + this.velocity + this.size.width > canvas.width) {
                        this.pos.x = canvas.width - this.size.width
                        //this.velocity = 0
                        this.direction = 8 // NW turn direction
                    } else {
                        this.pos.x += this.velocity
                    }
                    //check y
                    if (this.pos.y - this.velocity < 0) {
                        this.pos.y = 0
                        //this.velocity = 0
                        this.direction = 6 // S finish reverse direction
                    } else {
                        this.pos.y -= this.velocity
                    }
                    break
                case 3: // --E--
                    if (this.pos.x + this.velocity + this.size.width > canvas.width) {
                        this.pos.x = canvas.width - this.size.width
                        //this.velocity = 0
                        this.direction = 7 // W reverse direction
                    } else {
                        this.pos.x += this.velocity
                    }
                    break
                case 4: // --SE--
                    //check x
                    if (this.pos.x + this.velocity + this.size.width > canvas.width) {
                        this.pos.x = canvas.width - this.size.width
                        //this.velocity = 0
                        this.direction = 6 // SW turn direction
                    } else {
                        this.pos.x += this.velocity
                    }
                    //check y
                    if (this.pos.y + this.velocity + this.size.height > canvas.height) {
                        this.pos.y = canvas.height - this.size.height
                        //this.velocity = 0
                        this.direction = 8 // NE finish reverse direction
                    } else {
                        this.pos.y += this.velocity
                    }
                    break
                case 5: // --S--
                    if (this.pos.y + this.velocity + this.size.height > canvas.height) {
                        this.pos.y = canvas.height - this.size.height
                        //this.velocity = 0
                        this.direction = 1 // N reverse direction
                    } else {
                        this.pos.y += this.velocity
                    }
                    break
                case 6: // --SW--
                    //check x
                    if (this.pos.x - this.velocity < 0) {
                        this.pos.x = 0
                        //this.velocity = 0
                        this.direction = 4 // SE turn direction
                    } else {
                        this.pos.x -= this.velocity
                    }
                    //check y
                    if (this.pos.y + this.velocity + this.size.height > canvas.height) {
                        this.pos.y = canvas.height - this.size.height
                        //this.velocity = 0
                        this.direction = 2 // NE finish reverse direction
                    } else {
                        this.pos.y += this.velocity
                    }
                    break
                case 7: // --W--
                    if (this.pos.x - this.velocity < 0) {
                        this.pos.x = 0
                        //this.velocity = 0
                        this.direction = 3 // E reverse direction
                    } else {
                        this.pos.x -= this.velocity
                    }
                    break
                case 8: // --NW--
                    //check x
                    if (this.pos.x - this.velocity < 0) {
                        this.pos.x = 0
                        //this.velocity = 0
                        this.direction = 2 // NE turn direction
                    } else {
                        this.pos.x -= this.velocity
                    }
                    //check y
                    if (this.pos.y - this.velocity < 0) {
                        this.pos.y = 0
                        //this.velocity = 0
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
        //change direction percentChangeDirection% of the time
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

    die() {
        this.alive = false
        //redraw as dead
        //shrink by outer rim
        this.size.width -= 10
        this.size.height -= 10
        this.pos.x += 5
        this.pos.y += 5
        c.fillStyle = 'grey'
        c.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height)
    }

    cycleTurn() {
        this.age += 1
        //die of old age?
        if (this.age > this.lifeExpectancy) {
            this.die()
            return
        } else {
            if (this.age % this.cyclesPerGrowth == 0) {
                this.size.width += this.unitGrowth
                this.size.height += this.unitGrowth
            }
        }
    }

    undraw() {
        c.fillStyle = 'black'
        c.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height)
    }
    draw() {
        //console.log('d:'+this.direction+' x:'+this.pos.x+' y:'+this.pos.y)
        c.fillStyle = this.color.outer
        c.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height)
        c.fillStyle = this.color.inner
        c.fillRect(this.pos.x + 5, this.pos.y + 5, this.size.width - 10, this.size.height - 10)
    }

    update() {
        //other code that affects the Actor before it's drawn
        if (this.alive) {
            this.undraw()
            this.determineIfNewDirection()
            this.move()
            this.draw()
            this.cycleTurn()
        } else {
            //what to do with Actor when dead
        }
    }
}

class Plant {
    constructor({ pos }) {
        this.pos = pos,
            this.color = {
                leaf: 'green',
                stem: 'brown'
            },
            this.unitSize = {
                width: 20,
                height: 20
            },
            this.stemLength = {
                n: 0,
                e: 0,
                s: 0,
                w: 0
            },
            this.leafRate = 10
        	this.growthRate = .1, // 0.1, 1.0, 1.3 - units per cycle
            //this.unitHealth,
            this.healthChangeWhenEaten, // -10, 0, 25
            this.leafs = []
    }

    growStem(direction) {
        c.fillStyle = this.color.stem
        switch (direction) {
            case 1:
                this.stemLength.n += 1
                c.fillRect(this.pos.x, this.pos.y - this.unitSize.height * this.stemLength.n, this.unitSize.width, this.unitSize.height)
                break
            case 2:
                this.stemLength.e += 1
                c.fillRect(this.pos.x + this.unitSize.width * this.stemLength.e, this.pos.y, this.unitSize.width, this.unitSize.height)
                break
            case 3:
                this.stemLength.s += 1
                c.fillRect(this.pos.x, this.pos.y + this.unitSize.height * this.stemLength.s, this.unitSize.width, this.unitSize.height)
                break
            case 4:
                this.stemLength.w += 1
                c.fillRect(this.pos.x - this.unitSize.width * this.stemLength.w, this.pos.y, this.unitSize.width, this.unitSize.height)
                break
        }
    }

    growLeaf(direction) {
        let node, evalX, evalY, leafExists
        c.fillStyle = this.color.leaf
        switch (direction) {
            case 1:
                node = getRnd(this.stemLength.n)
                if (getRnd(100) < 50) {
                    //left
                    evalX = this.pos.x - this.unitSize.width
                } else {
                    evalX = this.pos.x + this.unitSize.width
                }
                evalY = this.pos.y - this.unitSize.height * node
                break
            case 2:
                node = getRnd(this.stemLength.e)
                evalX = this.pos.x - this.unitSize.width * node
                if (getRnd(100) < 50) {
                    //top
                    evalY = this.pos.y - this.unitSize.height
                } else {
                    evalY = this.pos.y + this.unitSize.height
                }
                break
            case 3:
                node = getRnd(this.stemLength.s)
                if (getRnd(100) < 50) {
                    //left
                    evalX = this.pos.x - this.unitSize.width
                } else {
                    evalX = this.pos.x + this.unitSize.width
                }
                evalY = this.pos.y + this.unitSize.height * node
                break
            case 4:
                node = getRnd(this.stemLength.w)
                evalX = this.pos.x + this.unitSize.width * node
                if (getRnd(100) < 50) {
                    //top
                    evalY = this.pos.y - this.unitSize.height
                } else {
                    evalY = this.pos.y + this.unitSize.height
                }
                break
        }
        //if a leaf doesn't already exist at this postion...
        leafExists = false
        for (var i = 0; i < this.leafs.length; i++) {
            //console.log(this.leafs.length + " ----- " + this.leafs[i].position.x + ", " + this.leafs[i].position.y + " - " + evalX + ", " + evalY)
            //console.log("=======================")
            //console.log(this.leafs[i].position.x + ", " + evalX)
            //console.log(this.leafs[i].position.x == evalX)
            //console.log(this.leafs[i].position.y + ", " + evalY)
            //console.log(this.leafs[i].position.y == evalY)
            if (this.leafs[i].pos.x == evalX && this.leafs[i].pos.y == evalY) {
                //console.log("Yes, I do this too")
                leafExists = true
            }
        }
        if (!leafExists) {
            //draw leaf to canvas
            c.fillRect(evalX, evalY, this.unitSize.width, this.unitSize.height)
            //push to leafs array
            this.leafs.push(
                new Leaf({
                    pos: {
                        x: evalX,
                        y: evalY
                    }
                })
            )
        } else {
            //console.log("this was a leaf that I didn't add and therefore didn't make the array")
        }
    }

    grow() {
        if (this.growthRate > 1) {
            //TODO
        }
        //determine if the plant should grow
        if (getRnd(100) < this.growthRate * 100) {
            //grow plant place with n pixel overlap
            //determine which direction to try to grow off
            switch (getRnd(4)) {
                case 1: //N
                    //grow stem or leaf?
                    if (this.stemLength.n == 0) {
                        this.growStem(1)
                    } else if (getRnd(100) < this.leafRate * this.stemLength.n) { // % to grow a leaf
                        this.growLeaf(1)
                    } else { // else grow a stem
                        this.growStem(1)
                    }
                    break
                case 2: //E
                    //grow stem or leaf?
                    if (this.stemLength.e == 0) {
                        this.growStem(2)
                    } else if (getRnd(100) < this.leafRate * this.stemLength.e) { // % to grow a leaf
                        this.growLeaf(2)
                    } else { // else grow a stem
                        this.growStem(2)
                    }
                    break
                case 3: //S
                    //grow stem or leaf?
                    if (this.stemLength.s == 0) {
                        this.growStem(3)
                    } else if (getRnd(100) < this.leafRate * this.stemLength.s) { // % to grow a leaf
                        this.growLeaf(3)
                    } else { // else grow a stem
                        this.growStem(3)
                    }
                    break
                case 4: //W
                    //grow stem or leaf?
                    if (this.stemLength.w == 0) {
                        this.growStem(4)
                    } else if (getRnd(100) < this.leafRate * this.stemLength.w) { // % to grow a leaf
                        this.growLeaf(4)
                    } else { // else grow a stem
                        this.growStem(4)
                    }
                    break

            }
        }
    }

    draw() {
        c.fillStyle = this.color.stem
        c.fillRect(this.pos.x, this.pos.y, this.unitSize.width, this.unitSize.height)
    }

    redraw() {
        //stems
        c.fillStyle = this.color.stem
        //base
        c.fillRect(this.pos.x, this.pos.y, this.unitSize.width, this.unitSize.height)
        //four directions
        for (var i = 0; i <= this.stemLength.n; i++) {
        	c.fillRect(this.pos.x, this.pos.y - (this.unitSize.height * i), this.unitSize.width, this.unitSize.height)
        }
        for (var i = 0; i <= this.stemLength.e; i++) {
        	c.fillRect(this.pos.x + (this.unitSize.width * i), this.pos.y, this.unitSize.width, this.unitSize.height)
        }
        for (var i = 0; i <= this.stemLength.s; i++) {
        	c.fillRect(this.pos.x, this.pos.y + (this.unitSize.height * i), this.unitSize.width, this.unitSize.height)
        }
        for (var i = 0; i <= this.stemLength.w; i++) {
        	c.fillRect(this.pos.x - (this.unitSize.width * i), this.pos.y, this.unitSize.width, this.unitSize.height)
        }
        //leafs
        c.fillStyle = this.color.leaf
        for (var i = 0; i < this.leafs.length; i++) {
            c.fillRect(this.leafs[i].pos.x, this.leafs[i].pos.y, this.unitSize.width, this.unitSize.height)
        }
    }

    update() {
        this.grow()
        this.redraw()
    }

}

class Leaf extends Plant {
    constructor({
        pos,
        unitSize,
        color
    }) {
        super({
            color,
            unitSize
        })
        this.pos = pos
    }
}