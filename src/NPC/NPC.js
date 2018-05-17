import FrameworkIMGs from './FrameworkIMGs'
import BlockOracle from './BlockUtils/BlockOracle'

export default class NPC {
  constructor() {
    const actualURL = FrameworkIMGs[
      Math.floor(Math.random() * FrameworkIMGs.length, 1)
    ]

    this.element = document.createElement('img')
    this.element.src = actualURL
    this.element.className = 'jsImage'

    this.oracle = new BlockOracle()

    FrameworkIMGs.splice(FrameworkIMGs.indexOf(actualURL), 1)
  }
  goTo(block) {
    this.removeElement()
    let listener = block.renderedBlock.addEventListener('loaded', () => {
      this.actualBlock = block
      block.removeEventListener(listener)
    })
    block.renderedBlock.appendChild(this.element)
    if(block.activated) {
      block.renderedBlock.classList.add('dribbled')
      setTimeout(() => block.renderedBlock.classList.remove('dribbled'), 500)
    } 
    this.actualBlock = block
  }
  startToWalk() {
    this.interval = setInterval(() => {
      const move = this.oracle.guideMe(this.actualBlock, this.element.src)
      if(!move) return
      const nextBlock = move.block
      if (!nextBlock) return
      return this.goTo(nextBlock)
    }, 100)

  }
  removeElement() {
    if (!this.element.parentElement) {
      return
    }
    this.element.remove()
  }
  die() {
    console.log('dying')
    clearInterval(this.interval)
    FrameworkIMGs.push(this.element.src)
    this.actualBlock.renderedBlock.classList.add('eating')
    setTimeout(() => 
      this.actualBlock.renderedBlock.classList.remove('eating'),
    500)
    const npcs = this.actualBlock.row.area.npcs
    let idx = npcs.indexOf(this)
    if(idx === -1) return
    npcs.splice(idx, 1)
    this.removeElement()
  }
}