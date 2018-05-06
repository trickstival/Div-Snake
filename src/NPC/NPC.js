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

    if(spawn) {
      this.startToWalk()
    }
    block.renderedBlock.appendChild(this.element)
    this.actualBlock = block
  }
  startToWalk() {
    setInterval(() => {
      // const move = oracle.randomMove()
      const move = this.oracle.guideMe(this.actualBlock)
      // if(this.element.src === 'http://127.0.0.1:5500/src/assets/frameworks/vue.png') console.log(move)
      const nextBlock = move.block
      if(!nextBlock) return
      this.goTo(nextBlock)
    }, 100)
  }
  removeElement() {
    if(!this.element.parentElement) {
      return
    }
    this.element.parentElement.removeChild(this.element)
  }
  die() {
    FrameworkIMGs.push(this.element.src)
    this.removeElement()
    this.element = null
  }
}