import AreaBuilder from './AreaBuilder'
import MOVES from './MOVES'
import FrameworkInjector from './NPC/FrameworkInjector'

const ROWS_NUMBER = 20
const COLUMNS_NUMBER = 20

setupArea()

function setupArea() {
  const area = AreaBuilder.build(ROWS_NUMBER, COLUMNS_NUMBER)
  document.querySelector('#game').appendChild(area.render())

  area.activate(10, 10)
  FrameworkInjector.injectOn(area)
  
  document.addEventListener('keydown', event => {
    const gottenKeycode = event.keyCode
    const validatedKeycode = Object.values(MOVES).filter(v => v === gottenKeycode)[0]
    if(validatedKeycode) area.move(validatedKeycode)
  })
}