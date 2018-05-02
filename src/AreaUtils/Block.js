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
  activate() {
    this.activated = 1
    this.renderedBlock.classList.add('block-active')
  }
  deactivate() {
    this.activated = 0
    this.renderedBlock.classList.remove('block-active')
  }
}