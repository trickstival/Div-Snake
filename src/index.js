import AreaBuilder from './AreaBuilder'
import MOVES from './MOVES'

setup()

function setup() {
  const area = AreaBuilder.build(20, 20)
  document.querySelector('#game').appendChild(area.render())
  area.activate(10, 10)

  
  document.addEventListener('keydown', event => {
    const gottenKeycode = event.keyCode
    const validatedKeycode = Object.values(MOVES).filter(v => v === gottenKeycode)[0]
    if(validatedKeycode) area.move(validatedKeycode)
  })
}