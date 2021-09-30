import { Application } from 'pixi.js'
import Keyboard, { keys } from './keyboard'
import Ship from './ship'

const app = new Application({ width: 640, height: 480 })
const ACCELERATION = 0.2
const MAX_VELOCITY = 5

document.body.appendChild(app.view)
Keyboard.init()
let elapsed = 0.0
let ship = Ship(app.view)
app.stage.addChild(ship)

app.ticker.add((delta) => {
  handleKeys()
  handleWrap()
  updateVelocity()
  elapsed += delta
})

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
        ship.vx -= ACCELERATION
        break
      case 'ArrowRight':
        ship.vx += ACCELERATION
        break
      case 'ArrowUp':
        ship.vy -= ACCELERATION
        break
      case 'ArrowDown':
        ship.vy += ACCELERATION
    }
  })
}
