let activeKeys = []

const init = () => {
  window.addEventListener('keydown', downHandler)
  window.addEventListener('keyup', upHandler)
}

const downHandler = (event) => {
  const key = event.key

  if (!isActive(key)) {
    activeKeys.push(key)
    event.preventDefault()
  }
}

const upHandler = (event) => {
  activeKeys = activeKeys.filter((key) => (
    key !== event.key
  ))
}

const isActive = (key) => (
  activeKeys.includes(key)
)

export const keys = () => activeKeys

export default {
  init,
  keys
}
