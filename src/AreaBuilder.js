import Block from './AreaUtils/Block'
import Row from './AreaUtils/Row'
import Area from './AreaUtils/Area'

export default {
  build(map) {
    const area = new Area()

    // Building rows
    map.rows.forEach((row, i) => {
      const rowObj = new Row(i)

      const blocks = row.split('')

      // Building blocks
      blocks.forEach((status, j) => {
        const blockObj = new Block(i, j)
        blockObj.setStatus(status)
        rowObj.push(blockObj)
      })

      area.push(rowObj)
    })
    
    return area
  }
}