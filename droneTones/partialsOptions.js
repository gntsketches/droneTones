// AUDIO, receives ranges/cluster density from state
const DroneTones = {}

DroneTones.partialsOptions = {

  FullStops(){
    let partials = []
    const range = DroneTones._partialsRanges['fullStops']
    for (let i=0; i < range; i++) {
      partials.push(1)
    }
    return partials
  },

  RandomStops(){
    let partials = []
    const range = DroneTones._partialsRanges['randomStops']
    for (let i=0; i < range; i++) {
      partials.push(Math.random())
    }
    return partials
  },

  Clusters() {
    const rand = Math.random
    let partials = [rand(), rand(), rand(), rand(), rand()]
    const range = DroneTones._partialsRanges['clusters']
    for (let i = 0; i < range; i++) {
      let num = 0

      if (Math.random() < DroneTones._clustersDensitySetting) {
        num = rand()
      }
      // for (let j = 0; j < Math.round[getRandomInRange(3,5)]; j++) {
      for (let j = 0; j < 5; j++) {
        partials = [...partials, num]
      }
    }
    return partials
  },

} // ****************************************************************
