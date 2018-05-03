const jsImage = document.createElement('img')
jsImage.src = 'src/assets/js.png'
jsImage.className = 'jsImage'

export default class Block {
  constructor(rowNumber, blockNumber) {
    this.y = rowNumber
    this.x = blockNumber

    if(!rowNumber && !blockNumber) this.isHead = true
  }
  render() {
    this.renderedBlock = document.createElement('div')

    this.renderedBlock.className = 'block'
    
    return this.renderedBlock
  }
  spawn() {
    // todo
  }
  activate() {
    this.activated = 1
    this.renderedBlock.classList.add('block-active')
    this.renderedBlock.appendChild(jsImage)
  }
  deactivate() {
    this.activated = 0
    this.renderedBlock.classList.remove('block-active')
    this.renderedBlock.removeChild(jsImage)
  }
}