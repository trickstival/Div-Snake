export default class BlockOracle {
  constructor() {
    this.blockFound = false
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
      x = this.randomQuota(xQuota)
      y = this.randomQuota(yQuota)

    const block = area.rows[y].blocks[x]
    return block
  }
  funcaoDoGabryelPraDescobrirOProximoBloco() {

  }
  guideMe(actualBlock) {
    const area = block.row.area

    if(this.blockFound) {
      this.destinationBlock = this.randomBlock(area)
    }
    
    nextBlock = this.funcaoDoGabryelPraDescobrirOProximoBloco(this.destinationBlock)

    if(nextBlock === this.destinationBlock) {
      this.blockFound = true
    }
  }
}
