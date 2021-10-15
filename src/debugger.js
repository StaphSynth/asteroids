import { Text, TextStyle } from 'pixi.js'

const Debugger = (ship) => {
  const debug = new Text('', new TextStyle({
    fontFamily: 'Arial',
    fontSize: 12,
    fill: 'white',
    stroke: '#FFFFFF',
    strokeThickness: 1
  }))

  debug.update = (ship, entities) => {
    debug.text = `
      ROATION: ${ship.rotation.toFixed(2)}\n
      VX: ${ship.vx.toFixed(2)}\n
      VY: ${ship.vy.toFixed(2)}\n
      X: ${ship.x.toFixed(0)}\n
      Y: ${ship.y.toFixed(0)}\n
      ENTITIES: ${entities.length}
    `
  }

  return debug
}

export default Debugger
