import Block from './AreaUtils/Block'
import Row from './AreaUtils/Row'
import Area from './AreaUtils/Area'

export default {
  build(width, height) {
    const area = new Area()

    // Building rows
    for(let i=0;i<height;i++) {
      const row = new Row(i)

      // Building blocks
      for(let j=0;j<width;j++) {
        const block = new Block(i, j)
        row.push(block)
      }

      area.push(row)
    }

    return area
  }
}