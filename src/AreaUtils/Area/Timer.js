export default {
  async countRound(cb, secs = 10) {
    for(let i=secs;i>=0;i--) {
      if(this.cancelled) return
      await timeout(1000)
      cb(i)
    }
  },
  cancel() {
    this.cancelled = true
  },
  startCounting(secs) {
    this.cancelled = false
    return new Promise(resolve => {
      this.countRound(count => {
        this.domEl.innerHTML = `${(count/60).toFixed(0)}:${('0'+(count % 60)).slice(-2)}`
        if(!count) resolve()
      }, secs)
    })
  },
  makeItATimer(domEl) {
    this.domEl = domEl
  }
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
