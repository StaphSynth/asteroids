import { Graphics } from 'pixi.js'

const Ship = (view) => {
  let ship = new Graphics
  ship.lineStyle(2, 0xFFFFFF)
  ship.drawPolygon([10, 0, 20, 40, 10, 30, 0, 40])

  ship.pivot.set(ship.width / 2, ship.height / 2)
  ship.x = view.width / 2
  ship.y = view.height / 2
  ship.vx = 0
  ship.vy = 0

  return ship
}

export default Ship
