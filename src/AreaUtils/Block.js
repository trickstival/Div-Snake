import MOVES from '../MOVES'

const jsImage = document.createElement('img')
jsImage.src = 'src/assets/js.png'
jsImage.className = 'jsImage'

export default class Block {
  constructor(rowNumber, blockNumber) {
    this.y = rowNumber
    this.x = blockNumber

    if (!rowNumber && !blockNumber) this.isHead = true
  }
  render() {
    this.renderedBlock = document.createElement('div')

    this.renderedBlock.classList.add('block')

    if(this.status === '1') {
      this.renderedBlock.classList.add('blocked-block')
    }

    return this.renderedBlock
  }
  to(movement) {
    if(!this.row.area.rows[this.y+1] || !this.row.area.rows[this.y-1]) return
    let nextBlock

    switch (movement) {
      case MOVES.DOWN: nextBlock = this.row.area.rows[this.y+=1].blocks[this.x]
        break;
      case MOVES.LEFT: nextBlock = this.row.blocks[this.x-=1]
        break;
      case MOVES.RIGHT: nextBlock = this.row.blocks[this.x+=1]
        break;
      case MOVES.UP: nextBlock = this.row.area.rows[this.y-=1].blocks[this.x]
    }

    return nextBlock
  }
  activate() {
    this.activated = 1
    this.renderedBlock.classList.add('block-active')
    this.renderedBlock.appendChild(jsImage)
  }
  deactivate() {
    this.activated = 0
    this.renderedBlock.classList.remove('block-active')
    jsImage.remove()
  }
  setStatus(status) {
    this.status = status
  }
}