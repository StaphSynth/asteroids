import { Graphics } from 'pixi.js'
import { MAX_BULLET_VELOCITY, VIEW_HEIGHT, VIEW_WIDTH } from './constants'

const Bullet = (ship) => {
  const sinRotation = Math.sin(ship.rotation)
  const cosRotation = Math.cos(ship.rotation)
  const offset = ship.height / 2
  let bullet = new Graphics

  bullet.beginFill(0xFFFFFF)
  bullet.drawCircle(0, 0, 2)
  bullet.endFill()
  bullet.x = ship.x + (offset * sinRotation) -1
  bullet.y = ship.y + -(offset * cosRotation) +1
  bullet.vx = (MAX_BULLET_VELOCITY * sinRotation)
  bullet.vy = -(MAX_BULLET_VELOCITY * cosRotation)
  bullet.shouldBeDestroyed = false

  bullet.update = (delta) => {
    bullet.x += bullet.vx
    bullet.y += bullet.vy

    if (
      bullet.x <= 0 || bullet.x >= VIEW_WIDTH ||
      bullet.y <= 0 || bullet.y >= VIEW_HEIGHT
    ) {
      bullet.shouldBeDestroyed = true
    }
  }

  return bullet
}

export default Bullet
