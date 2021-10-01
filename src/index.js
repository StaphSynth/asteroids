import { Application, Text, TextStyle } from 'pixi.js'
import Keyboard, { keys } from './keyboard'
import Ship from './ship'

const app = new Application({ width: 640, height: 480 })
const ACCELERATION = 0.3
const MAX_VELOCITY = 5
const ANGULAR_ACCELERATION = 0.06

document.body.appendChild(app.view)
Keyboard.init()
let elapsed = 0.0
let ship = Ship(app.view)
let debug = new Text('', new TextStyle({
  fontFamily: 'Arial',
  fontSize: 12,
  fill: 'white',
  stroke: '#FFFFFF',
  strokeThickness: 1
}))
app.stage.addChild(ship)
app.stage.addChild(debug)

// console.log("SHIP: ", Object.keys(ship))

app.ticker.add((delta) => {
  handleKeys()
  handleWrap()
  updateVelocity()
  updateDebugString()
  elapsed += delta
})

const updateDebugString = () => {
  debug.text = `
    ROATION: ${ship.rotation.toFixed(2)}\n
    VX: ${ship.vx.toFixed(2)}\n
    VY: ${ship.vy.toFixed(2)}\n
    X: ${ship.x.toFixed(0)}\n
    Y: ${ship.y.toFixed(0)}
  `
}

const handleWrap = () => {
  if (ship.x > app.view.width) {
    ship.x = 0
  } else if (ship.x < 0) {
    ship.x = app.view.width
  }

  if (ship.y > app.view.height) {
    ship.y = 0
  } else if (ship.y < 0) {
    ship.y = app.view.height
  }
}

const updateVelocity = () => {
  if (ship.vx > MAX_VELOCITY) {
    ship.vx = MAX_VELOCITY
  } else if (ship.vx < -MAX_VELOCITY) {
    ship.vx = -MAX_VELOCITY
  }


  if (ship.vy > MAX_VELOCITY) {
    ship.vy = MAX_VELOCITY
  } else if (ship.vy < -MAX_VELOCITY) {
    ship.vy = -MAX_VELOCITY
  }

  ship.x += ship.vx
  ship.y += ship.vy
}

const handleKeys = () => {
  keys().forEach((key) => {
    switch (key) {
      case 'ArrowLeft':
        ship.rotation -= ANGULAR_ACCELERATION
        break
      case 'ArrowRight':
        ship.rotation += ANGULAR_ACCELERATION
        break
      case 'ArrowUp':
        ship.vy += -(ACCELERATION * Math.cos(ship.rotation))
        ship.vx += (ACCELERATION * Math.sin(ship.rotation))
        break
      case 'ArrowDown':
        ship.vy += (ACCELERATION * Math.cos(ship.rotation))
        ship.vx += -(ACCELERATION * Math.sin(ship.rotation))
        break
      case ' ':
        // pew pew pew
        break
    }
  })
}
