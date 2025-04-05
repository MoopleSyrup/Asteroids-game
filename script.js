const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
/* const windows = window */
canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Player {
    constructor({ position, velocity }) {
        this.position = position // {x, y}
        this.velocity = velocity
        this.rotation = 0
    }

    draw() {
        c.save()

        c.translate(this.position.x, this.position.y)
        c.rotate(this.rotation)
        c.translate(-this.position.x, -this.position.y)

        c.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2, false)
        c.fillStyle = 'red'
        c.fill()
        
        /* c.fillRect(this.position.x, this.position.x, 100, 100) */
        c.beginPath()
        c.moveTo(this.position.x + 30, this.position.y)
        c.lineTo(this.position.x - 10, this.position.y - 10)
        c.lineTo(this.position.x - 10, this.position.y + 10)
        c.closePath()

        c.strokeStyle = 'White'
        c.stroke()
        c.restore()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        }
    }

class Projectile {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.radius = 5
    }
    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
        c.closePath()
        c.fillStyle = 'white'
        c.fill()
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

const player = new Player({
    position: {x: canvas.width / 2, y: canvas.height / 2},
    velocity: {x: 0, y: 0},
})

player.draw()

const keys = {
    w: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
}

const SPEED = 3  //player speed value
const ROTATIONAL_SPEED = 0.03 //player rotation speed value
const FRICTION = 0.97 //player friction value

const projectiles = []

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    player.update()

    for (let i = projectiles.length - 1; i >= 0; i--) {
        const projectile = projectiles[i]
        projectile.update() 
    }

    if (keys.w.pressed) {
        player.velocity.x = Math.cos(player.rotation) * SPEED
        player.velocity.y = Math.sin(player.rotation) * SPEED
    } else if (!keys.w.pressed) {
        player.velocity.x *= FRICTION
        player.velocity.y *= FRICTION
    }

    if (keys.d.pressed) player.rotation += ROTATIONAL_SPEED
    else if (keys.a.pressed) player.rotation -= ROTATIONAL_SPEED
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.code){
        case 'KeyW':
            console.log('w was pressed')
            keys.w.pressed = true
            break
        case 'KeyA':
            console.log('a was pressed')
            keys.a.pressed = true
            break
        case 'KeyD':
            console.log('d was pressed')
            keys.d.pressed = true
            break
        case 'Space':
            projectiles.push(
                new Projectile({
                position: {
                    x: player.position.x + 30,
                    y: player.position.y
                },
                velocity: {
                    x: 1,
                    y: 0
                },
            }))
    }
})
window.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyW':
            console.log('w was pressed')
            keys.w.pressed = false
            break
        case 'KeyA':
            console.log('a was pressed')
            keys.a.pressed = false
            break
        case 'KeyD':
            console.log('d was pressed')
            keys.d.pressed = false
            break
    }    console.log(event.key)
})