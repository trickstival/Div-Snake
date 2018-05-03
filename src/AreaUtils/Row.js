export default class Row {
  constructor(rowNumber, blocks = []) {
    this.blocks = blocks
    this.rowNumber = rowNumber
  }
  push(block) {
    block.row = this
    this.blocks.push(block)
  }
  render() {
    const renderedBlocks = this.blocks.map(block => block.render())

    this.renderedRow = document.createElement('div')
    this.renderedRow.className = 'row'
    renderedBlocks.forEach((block) => {
      this.renderedRow.appendChild(block)
      block.style.width = `${100 / (renderedBlocks.length)}%`
    })

    return this.renderedRow
  }
}