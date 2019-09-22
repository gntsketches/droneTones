

// AUDIO


// AUDIO i think
DroneTones.setUpSynth = function(nest) {
  // console.log('nest', nest)
  nest.rise = getRandomInRange(DroneTones._timing.riseMin, DroneTones._timing.riseMax)
  nest.fall = getRandomInRange(DroneTones._timing.fallMin, DroneTones._timing.fallMax)
  nest.rest = getRandomInRange(DroneTones._timing.restMin, DroneTones._timing.restMax)

  const vibratoSettings = DroneTones._effectSettings['vibrato']
  nest.vibrato.frequency.value = Math.random() * vibratoSettings.rate // frequency, 5
  nest.vibrato.depth.value = Math.random() * vibratoSettings.depth // normal range, 0.1, is fine.
  nest.vibrato.wet.value = vibratoSettings['on'] ? Math.random() : 0 // Math.random() // /2 + 0.5 // normal range

  // console.log('vibrato')
  // console.log(nest.vibrato.frequency.value)
  // console.log(nest.vibrato.depth.value)
  // console.log('vibrato on?', nest.vibrato.wet.value)

  const filterSettings = DroneTones._effectSettings['filter']
  nest.filter.frequency.value = Math.random() * filterSettings.rate
  nest.filter.depth.value = Math.random() * filterSettings.depth // normal range
  nest.filter.octaves = Math.random() * 5 // different?
  nest.filter.wet.value = filterSettings['on'] ? Math.random() : 0 //  /2 + 0.5// normal range

  // console.log('filter')
  // console.log(nest.filter.frequency.value)
  // console.log(nest.filter.depth.value)
  // console.log(nest.filter.octaves)
  // console.log('filter on?', nest.filter.wet.value)

  const chosenSynthOptions = DroneTones.getChosenSynthOptions()
  const synthType = chosenSynthOptions[Math.floor(Math.random() * chosenSynthOptions.length)]
  // console.log('setUpSynth synthType', synthType)
  switch (synthType) {
    case 'Sawtooth':
      nest.synthObject.oscillator.type = 'sawtooth'
      nest.synthObject.volume = -6
      break
    case 'FullStops':
      nest.synthObject.oscillator.partials = DroneTones.partialsOptions[synthType]()
      nest.synthObject.volume = -6
      break
    case 'RandomStops':
      nest.synthObject.oscillator.partials = DroneTones.partialsOptions[synthType]()
      nest.synthObject.volume = 0
      break
    case 'Clusters':
      nest.synthObject.oscillator.partials = DroneTones.partialsOptions[synthType]()
      nest.synthObject.volume = -6
      break
    default:
      nest.synthObject.oscillator.partials = DroneTones.partialsOptions[synthType]()
      nest.synthObject.volume = -12
      break
  }

  // Keep - console display of type/partials is mentioned in docs
  console.log(synthType, nest.synthObject.oscillator.partials)

  // pass these in with new rather than define them each time:
  nest.synthObject.envelope.decay = 0
  nest.synthObject.envelope.sustain = 1
  nest.synthObject.envelope.attackCurve = 'linear' // was using 'linear because 'exponential' previously gave error "time constant must be geater than zero at t.Signal.t.Param.setTargetAtTime (Tone.min.js:1) at t.Signal.t.Param.exponentialApproachValueAtTime (Tone.min.js:1)at t.Signal.t.Param.targetRampTo (Tone.min.js:1) at t.AmplitudeEnvelope.t.Envelope.triggerAttack (Tone.min.js:1) at t.Synth._triggerEnvelopeAttack (Tone.min.js:1) at t.Synth.t.Monophonic.triggerAttack (Tone.min.js:1) at t.Synth.t.Instrument.triggerAttackRelease (Tone.min.js:1) at t.Loop.callback (DroneTones.js:31) at t.Loop._tick (Tone.min.js:1) at t.Event._tick (Tone.min.js:1)
  nest.synthObject.envelope.decayCurve = 'exponential'
  nest.synthObject.envelope.releaseCurve = 'linear'
}

// CONTROLLER
  // needs intervals from MODEL
DroneTones.startTimeouts = () => {
  const firstActiveSynthNumber = DroneTones._synthNests.findIndex((nest) => {
    return nest.interval !== 'Off'
  })
  if (firstActiveSynthNumber >= 0) {
    DroneTones.setUpSynth(DroneTones._synthNests[firstActiveSynthNumber])
    DroneTones.assignTimeout('rise', firstActiveSynthNumber)
  } else {
    DroneTones.assignTimeout('rest', firstActiveSynthNumber)
  }
  for (let i=0; i<8; i++) {
    if (i !== firstActiveSynthNumber) {
      DroneTones.assignTimeout('rest', i)
    }
  }
}

// pretty sure it's still CONTROLLER
  // needs intervals and timeouts from MODEL
    // probably passed in as params...
    // vs giving access to model? also needs _basePitch, _constants...
DroneTones.assignTimeout = (phase, nestNumber) => {
  const nest = DroneTones._synthNests[nestNumber]
  switch (phase) {
    case 'rest':
      DroneTones.setUpSynth(nest)
      // console.log('rest', nest.rest)
      if (nest.interval === 'Off') {
        nest.timeout = setTimeout(()=> { DroneTones.assignTimeout('rest', nestNumber) }, 1000 * nest.rest)
      } else {
        nest.timeout = setTimeout(()=> { DroneTones.assignTimeout('rise', nestNumber) }, 1000 * nest.rest)
      }
      break
    case 'rise':
      if (nest.interval === 'Off') { return }
      // console.log('rise', nest.rise)
      const detune = DroneTones.constants.intervalToDetune[nest.interval] + DroneTones._tuning
      nest.synthObject.detune.value = detune
      nest.synthObject.envelope.attack = nest.rise
      nest.synthObject.envelope.release = nest.fall
      nest.synthObject.triggerAttack(DroneTones._basePitch)
      nest.timeout = setTimeout(()=>{
        DroneTones.assignTimeout('fall', nestNumber)
      }, 1000 * nest.rise)
      DroneTones._intervalSelectors[nestNumber].style.transitionDuration = nest.rise + 's'
      DroneTones._intervalSelectors[nestNumber].classList.add('glow')
      break
    case 'fall':
      // clearTimeout(nest.timeout)
      // console.log('fall', nest.fall)
      nest.synthObject.triggerRelease()
      nest.timeout = setTimeout(()=>{
        DroneTones.assignTimeout('rest', nestNumber)
      }, 1000 * nest.fall)
      DroneTones._intervalSelectors[nestNumber].style.transitionDuration = nest.fall + 's'
      DroneTones._intervalSelectors[nestNumber].classList.remove('glow')
      break
  }
} // ************************************************************************

// DroneTones.cancelTimeouts (clears all timeouts on ._synths)
