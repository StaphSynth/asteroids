import { Application } from 'pixi.js'
import Keyboard, { keys } from './keyboard'
import Ship from './ship'

const app = new Application({ width: 320, height: 200 })

document.body.appendChild(app.view)
Keyboard.init()
let elapsed = 0.0
let ship = Ship(app.view)
app.stage.addChild(ship)

app.ticker.add((delta) => {
  handleKeys()
  handleWrap()
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

const handleKeys = () => {
  keys().forEach((key) => {
    switch (key) {
      case 'ArrowLeft':
        ship.x -= 5
        break
      case 'ArrowRight':
        ship.x += 5
        break
      case 'ArrowUp':
        ship.y -= 5
        break
      case 'ArrowDown':
        ship.y += 5
    }
  })
}
