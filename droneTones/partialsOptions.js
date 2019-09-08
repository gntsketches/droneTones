
DroneTones.partialsOptions = {

  FullStops(){
    let partials = []
    const range = DroneTones._partialsRanges['fullStops']
    for (let i=0; i < range; i++) {
      partials.push(1)
    }
    // console.log('FullStops', partials)
    return partials
  },

  RandomStops(){
    let partials = []
    const range = DroneTones._partialsRanges['randomStops']
    for (let i=0; i < range; i++) {
      partials.push(Math.random())
    }
    // console.log('RandomStops', partials)
    return partials
  },

  Clusters() {
    const rand = Math.random
    let partials = [rand(), rand(), rand()]
    const range = DroneTones._partialsRanges['clusters']
    for (let i = 0; i < range; i++) {
      let num = 0
      if (Math.random() < DroneTones._clustersDensity) {
        num = rand()
      }
      for (let j = 0; j < Math.round[getRandomInRange(3,5)]; j++) {
        partials = [...partials, num]
      }
    }
    // console.log('Clusters', partials)
    return partials
  },





}


// Tens(){
//   const rand = Math.random
//   let partials = [rand(), rand(), rand()]
//   for (let i=0; i < 33 ; i++) {
//     let num = 0
//     if (Math.random()<0.2) { num = rand() }
//     for (let j=0; j<3; j++) {
//       partials = [...partials, num]
//     }
//   }
//   console.log('tens', partials)
//   return {
//     oscillator  : {
//       type: 'sine',
//       partials: partials
//     },
//     volume: -12,
//     envelope: DroneTones._envelopeSettings
//   }
// },




// Modulos (modulo=2, range=60) {
//   let partials = [1]
//   for (let i=1; i < range ; i++) {
//     if ((i+1) % modulo === 0) {
//       partials = [...partials, Math.random()]
//     }
//   }
//   // console.log('modulos', partials)
//   return {
//     oscillator  : {
//       type: 'sine',
//       partials: partials
//     },
//     volume: -12,
//     envelope: DroneTones._envelopeSettings
//   }
// },




// Sine() {
//   return {
//     oscillator: {
//       type: 'sine',
//     },
//     volume: 7,
//     envelope: DroneTones._envelopeSettings
//   }
// },
//
// Triangle() {
//   return {
//     oscillator: {
//       type: 'triangle',
//     },
//     volume: 5,
//     envelope: DroneTones._envelopeSettings
//   }
// },
//
// Square() {
//   return {
//     oscillator: {
//       type: 'square',
//     },
//     volume: -24,
//     envelope: DroneTones._envelopeSettings
//   }
// },

