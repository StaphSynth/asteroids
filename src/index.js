import { Application } from 'pixi.js'
import debounce from 'lodash/debounce'
import Keyboard, { keys } from './keyboard'
import Ship from './ship'
import Bullet from './bullet'
import Debugger from './debugger'
import {
  ACCELERATION,
  ANGULAR_ACCELERATION,
  VIEW_HEIGHT,
  VIEW_WIDTH
} from './constants'

const app = new Application({ width: VIEW_WIDTH, height: VIEW_HEIGHT })

document.body.appendChild(app.view)
Keyboard.init()
let elapsed = Date.now()
const ship = Ship(app.view)
const debugDisplay = Debugger(ship)
let entities = []

const generateBullet = debounce(() => {
  let bullet = Bullet(ship)
  entities.push(bullet)
  app.stage.addChild(bullet)
}, 50)

const updateEntities = (delta) => {
  const updatedEntities = []

  for (let i = 0; i < entities.length; i++) {
    let entity = entities[i]
    entity.update(delta)

    if (entity.shouldBeDestroyed) {
      entity.destroy()
    } else {
      updatedEntities.push(entity)
    }
  }

  entities = updatedEntities
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
        generateBullet()
        break
    }
  })
}

app.stage.addChild(ship)
app.stage.addChild(debugDisplay)

const loop = () => {
  let delta = Date.now() - elapsed
  handleKeys()
  ship.update(delta)
  updateEntities(delta)
  debugDisplay.update(ship, entities)
  elapsed += delta
  requestAnimationFrame(loop)
}

requestAnimationFrame(loop)
