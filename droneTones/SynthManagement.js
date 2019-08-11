DroneTones._synthNests = [
  {
    interval: 'Root',
    timeout: null,
    synthObject: null,
    attack: null,
    release: null,
  },
  {
    interval: 'Sub',
    timeout: null,
    synthObject: null,
  },
  {
    interval: 'Root',
    timeout: null,
    synthObject: null,
  },
  {
    interval: 'P5',
    timeout: null,
    synthObject: null,
  },
  {
    interval: 'Off',
    timeout: null,
    synthObject: null,
  },
  {
    interval: 'Off',
    timeout: null,
    synthObject: null,
  },
  {
    interval: 'Off',
    timeout: null,
    synthObject: null,
  },
  {
    interval: 'Off',
    timeout: null,
    synthObject: null,
  },
]

DroneTones.switchSynth = (nest) => {
    // console.log('instance?', nest.synthObject instanceof DroneTones.SynthBuilder)
    if (nest.synthObject instanceof DroneTones.SynthBuilder) {
      nest.synthObject.cleanup()
    }
    nest.synthObject = new DroneTones.SynthBuilder()
}

DroneTones.setUpSynths = function() {
  this._synthNests.forEach((object) => {
    this.switchSynth(object)
  })
}

DroneTones.startTimeouts = () => {
  // let startingDelay = 0
  // let nextDelay = 0
  for (var i=0; i<8; i++) {
    // DroneTones.assignTimeout('starting', i, startingDelay)
    DroneTones.assignTimeout('rise', i)
    // nextDelay = Math.random()*1000
    // startingDelay += nextDelay
  }
}

DroneTones.assignTimeout = (phase, nestNumber, initialDelay) => {
  const nest = DroneTones._synthNests[nestNumber]
  console.log('nest', nest)
  if (nest.interval === 'Off') { return }
  switch (phase) {
    // case 'starting':
    //   console.log('starting delay', initialDelay)
    //   clearTimeout(nest.timeout)
    //   nest.timeout = setTimeout(()=>{
    //     DroneTones.assignTimeout('rise', nestNumber)
    //   }, initialDelay)
    //   break
    case 'rise':
      console.log('timeout in rise', nest.timeout)
      // clearTimeout(nest.timeout)
      DroneTones.switchSynth(nest)
      nest.attack = getRandomInRange(DroneTones._riseMin, DroneTones._riseMax)
      nest.release = getRandomInRange(DroneTones._fallMin, DroneTones._fallMax)
      const detune = DroneTones.constants.intervalToDetune[nest.interval] + DroneTones._tuning
      nest.synthObject.synth.detune.value = detune
      nest.synthObject.synth.envelope.attack = nest.attack
      nest.synthObject.synth.envelope.release = nest.release
      nest.synthObject.synth.triggerAttack(DroneTones._basePitch)
      nest.timeout = setTimeout(()=>{
        DroneTones.assignTimeout('fall', nestNumber)
      }, 1000 * nest.attack)
      // get the corresponding intervalSelector and apply a glow animation
      break
    case 'fall':
      // clearTimeout(nest.timeout)
      console.log('timeout in fall', nest.timeout)
      nest.synthObject.synth.triggerRelease()
      nest.timeout = setTimeout(()=>{
        DroneTones.assignTimeout('rise', nestNumber)
      }, 1000 * nest.release)
      break
  }
}


// DroneTones.cancelTimeouts (clears all timeouts on ._synths)
