import MOVES from '../MOVES'

export default class Area {
  constructor(rows = []) {
    this.rows = rows
    this.npcs = []
    this.render()
  }
  activate(x, y) {
    const block = this.getBlock(x, y)
    block.activate()
    this.activeBlock = block
  }
  deactivate(x, y) {
    const block = this.getBlock(x, y)
    block.deactivate()
  }
  addNPC(npc, position) {
    const block = this.getBlock(position.x, position.y)
    npc.goTo(block, true)
    this.npcs.push(npc)
  }
  getNPCsAt(position) {
    const block = this.getBlock(position.x, position.y)
    return this.npcs.filter(npc => npc.actualBlock === block)
  }
  captureNPCsAt(position) {
    const npcs = this.getNPCsAt(position)
    npcs.forEach(npc => npc.die())
    if(!this.npcs.length) this.win()
  }
  win() {
    alert('You won!')
  }
  move(direction = MOVES.RIGHT) {
    let oldX = this.activeBlock.x, 
      oldY = this.activeBlock.y,
      newX = oldX,
      newY = oldY
    
    switch(direction) {
      case MOVES.UP: ++newY;break;
      case MOVES.DOWN: --newY;break;
      case MOVES.RIGHT: ++newX;break;
      case MOVES.LEFT: --newX;break;
    }

    if(newY >= this.getHeight()  || newX >= this.getWidth()
      || newY < 0 || newX < 0 || this.getBlock(newX, newY).status === '1') return
    
    this.deactivate(oldX, oldY)
    this.captureNPCsAt({x: newX, y: newY})
    this.activate(newX, newY)

    // console.log(newX, newY)
  }
  getBlock(x, y) {
    return this.rows[y].blocks[x]
  }
  getHeight() {
    return this.rows.length
  }
  getWidth() {
    return this.rows[0].blocks.length
  }
  render() {
    const renderedRows = this.rows.map(row => row.render())
    
    this.renderedArea = document.createElement('div')
    this.renderedArea.className = 'area'

    renderedRows.forEach((row) => {
      this.renderedArea.appendChild(row)
      row.style.height = `${100 / (renderedRows.length)}%`
    })

    return this.renderedArea
  }
  push(row) {
    row.area = this
    this.rows.push(row)
  }
}