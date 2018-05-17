import MovePossibilties from './MovePossibilities'

export default class BlockOracle {
  constructor() {
    this.blockFound = true
  }
  // DEPRECATED
  randomMove() {
    const keys = Object.keys(moves)
    keys.splice(keys.indexOf(moves[moves.NONE]), 1)
    const movePosition = this.randomQuota(keys.length)
    return moves[keys[movePosition]]
  }
  randomQuota(quota) {
    return Math.floor(Math.random() * quota, 1)
  }
  randomBlock(area) {
    const xQuota = area.getWidth(),
      yQuota = area.getHeight(),
      x = this.randomQuota(xQuota),
      y = this.randomQuota(yQuota)

    const block = area.rows[y].blocks[x]
    // console.log(block)
    return block
  }
  touchingBlocks(block) {
    const touchingBlocks = []
    const movePossibilties = MovePossibilties(block)

    const area = block.row.area

    return movePossibilties.map(move => {
      const possibleRow = area.rows[move.y]
      if(!possibleRow) return null
      const possibleBlock = possibleRow.blocks[move.x]
      if(!possibleBlock) return null

      const retorno = {
        name: move.name,
        block: possibleBlock
      }
      return retorno
    }).filter(e => e)
  }
  wayBlocks(actualBlock, destinationBlock) {
    const possibilities = this.touchingBlocks(actualBlock)
    const remainingBlocks = []
    const moveTo = name => remainingBlocks.push(possibilities.filter(poss => poss.name === name)[0])

    const toMyRight = destinationBlock.x > actualBlock.x,
      toMyLeft = destinationBlock.x < actualBlock.x,
      toMyBottom = destinationBlock.y > actualBlock.y,
      toMyTop = destinationBlock.y < actualBlock.y

    if (toMyRight) moveTo('Right') 
    if(toMyLeft) moveTo('Left')

    if (toMyTop) moveTo('Up')
    else if (toMyBottom) moveTo('Down')

    if (toMyTop && toMyLeft) moveTo('Upleft')
    else if (toMyTop && toMyRight) moveTo('Upright')
    else if (toMyBottom && toMyLeft) moveTo('Downleft')
    else if (toMyBottom && toMyRight) moveTo('DownRight')

    return remainingBlocks
  }
  findNextBlock(actualBlock, destinationBlock) {    
    const alternatives = this.wayBlocks(actualBlock, destinationBlock)
    const quota = this.randomQuota(alternatives.length)
    return alternatives[quota]
  }
  guideMe(actualBlock, src) {
    const area = actualBlock.row.area

    if(this.blockFound) {
      this.destinationBlock = this.randomBlock(area)
      this.blockFound = false
      return
    }
    
    const nextBlock = this.findNextBlock(actualBlock, this.destinationBlock)
    if(!nextBlock) {
      this.destinationBlock = this.randomBlock(area)
      return
    }
    if(nextBlock.block === this.destinationBlock) {
      this.blockFound = true
    }

    // if(src === 'http://127.0.0.1:5500/src/assets/frameworks/vue.png') console.log('block:', actualBlock, 'this:', this,)
    return nextBlock
  }
}
