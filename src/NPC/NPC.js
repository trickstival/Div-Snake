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
  goTo(block, spawn) {
    this.removeElement()
    if (spawn) {
      this.startToWalk()
    }
    let listener = block.renderedBlock.addEventListener('loaded', () => {
      this.actualBlock = block
      block.removeEventListener(listener)
    })
    block.renderedBlock.appendChild(this.element)
    this.actualBlock = block
  }
  startToWalk() {
    this.interval = setInterval(() => {
      const move = this.oracle.guideMe(this.actualBlock, this.element.src)
      if(!move) return
      const nextBlock = move.block
      if (!nextBlock) return
      return this.goTo(nextBlock)
    }, 200)

  }
  removeElement() {
    if (!this.element.parentElement) {
      return
    }
    this.element.remove()
  }
  die() {
    clearInterval(this.interval)
    FrameworkIMGs.push(this.element.src)
    const npcs = this.actualBlock.row.area.npcs
    let idx = npcs.indexOf(this)
    if(idx === -1) return
    npcs.splice(idx, 1)
    this.removeElement()
  }
}