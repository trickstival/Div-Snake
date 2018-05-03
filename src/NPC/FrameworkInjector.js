import NPC from './NPC'

export default {
  injectOn(area) {
    for(let x=0;x<area.getHeight();x+=2) {
      const npc = new NPC()
      area.addNPC(npc, { x, y: 0 })
    }
  },
}