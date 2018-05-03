import NPC from './NPC'
import FrameworksIMGs from './FrameworkIMGs'
const length = FrameworksIMGs.length
export default {
  injectOn(area) {
    let count = 0
    for(let x=0;x<area.getHeight();x+=2) {
      if(count>=length) break
      const npc = new NPC()
      area.addNPC(npc, { x, y: 0 })
      count++
    }
  },
}