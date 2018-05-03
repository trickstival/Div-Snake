import FrameworkIMGs from './FrameworkIMGs'

export default class NPC {
  constructor() {
    const actualURL = FrameworkIMGs[
      Math.floor(Math.random() * FrameworkIMGs.length, 1)
    ]

    this.element = document.createElement('img')
    this.element.src = actualURL
    this.element.className = 'jsImage'

    FrameworkIMGs.splice(FrameworkIMGs.indexOf(actualURL), 1)
  }
  spawnAt(block) {
    this.actualBlock = block
    // todo
  }
  
  die() {
    FrameworkIMGs.push(this.element.src)
    this.element.parentElement.removeChild(this.element)
    this.element = null
  }
}