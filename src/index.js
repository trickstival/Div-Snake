import AreaBuilder from './AreaBuilder'
import MOVES from './MOVES'
import FrameworkInjector from './NPC/FrameworkInjector'
import lvl1 from './maps/lvl1'
import throttle from './utils/throttle'

const ROWS_NUMBER = 20
const COLUMNS_NUMBER = 20

setupArea()

function setupArea() {
  const area = AreaBuilder.build(lvl1)
  document.querySelector('#game').appendChild(area.render())

  area.activate(10, 10)
  FrameworkInjector.injectOn(area)

  document.addEventListener('keydown', throttle(event => {
    const gottenKeycode = event.keyCode
    const lastKey = Object.values(MOVES).filter(v => v === gottenKeycode)[0]
    if (lastKey) area.move(lastKey)
  }, 70))

  const btnGo = document.getElementById('btn-go')
  const readyTile = document.getElementById('ready-tile')

  btnGo.addEventListener('click', () => {
    area.npcs.forEach(npc => npc.startToWalk())
    readyTile.style.display = 'none'
    area.Timer.makeItATimer(document.getElementById('timer-number'))
    area.Timer.startCounting(120).then(() => area.lose())
  })
}
