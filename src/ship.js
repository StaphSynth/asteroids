import { Graphics } from 'pixi.js'
import { MAX_VELOCITY } from './constants'

const Ship = (view) => {
  const ship = new Graphics

  ship.lineStyle(2, 0xFFFFFF)
  ship.drawPolygon([10, 0, 20, 40, 10, 30, 0, 40])

  ship.pivot.set(ship.width / 2, ship.height / 2)
  ship.x = view.width / 2
  ship.y = view.height / 2
  ship.vx = 0
  ship.vy = 0
  ship.shouldBeDestroyed = false
  ship.update = (delta) => {
    handleWrap(ship, view)
    handleMovement(ship, delta)
  }

  return ship
}

const handleWrap = (ship, view) => {
  if (ship.x > view.width) {
    ship.x = 0
  } else if (ship.x < 0) {
    ship.x = view.width
  }

  if (ship.y > view.height) {
    ship.y = 0
  } else if (ship.y < 0) {
    ship.y = view.height
  }
}

const handleMovement = (ship, delta) => {
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

export default Ship
