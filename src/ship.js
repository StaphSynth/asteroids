import { Graphics } from 'pixi.js'

const Ship = (view) => {
  let ship = new Graphics
  ship.lineStyle(2, 0xFFFFFF)
  ship.drawPolygon([0, 0, 40, 10, 0, 20, 10, 10])

  ship.pivot.set(ship.width / 2, ship.height / 2)
  ship.x = view.width / 2
  ship.y = view.height / 2

  return ship
}

export default Ship
