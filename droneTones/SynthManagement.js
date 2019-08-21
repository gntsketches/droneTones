DroneTones._synthNests = [
  {
    interval: 'Root',
    timeout: null,
    synthObject: new Tone.Synth(),
    vibrato: new Tone.Vibrato(),
    chorus: new Tone.Chorus(),
    filter: new Tone.AutoFilter(),
    gain: new Tone.Gain(),
  },
  {
    interval: 'Sub',
    timeout: null,
    synthObject: new Tone.Synth(),
    vibrato: new Tone.Vibrato(),
    chorus: new Tone.Chorus(),
    filter: new Tone.AutoFilter(),
    gain: new Tone.Gain(),
  },
  {
    interval: 'Root',
    timeout: null,
    synthObject: new Tone.Synth(),
    vibrato: new Tone.Vibrato(),
    chorus: new Tone.Chorus(),
    filter: new Tone.AutoFilter(),
    gain: new Tone.Gain(),
  },
  {
    interval: 'M6',
    timeout: null,
    synthObject: new Tone.Synth(),
    vibrato: new Tone.Vibrato(),
    chorus: new Tone.Chorus(),
    filter: new Tone.AutoFilter(),
    gain: new Tone.Gain(),
  },
  {
    interval: 'Off',
    timeout: null,
    synthObject: new Tone.Synth(),
    vibrato: new Tone.Vibrato(),
    chorus: new Tone.Chorus(),
    filter: new Tone.AutoFilter(),
    gain: new Tone.Gain(),
  },
  {
    interval: 'Off',
    timeout: null,
    synthObject: new Tone.Synth(),
    vibrato: new Tone.Vibrato(),
    chorus: new Tone.Chorus(),
    filter: new Tone.AutoFilter(),
    gain: new Tone.Gain(),
  },
  {
    interval: 'Off',
    timeout: null,
    synthObject: new Tone.Synth(),
    vibrato: new Tone.Vibrato(),
    chorus: new Tone.Chorus(),
    filter: new Tone.AutoFilter(),
    gain: new Tone.Gain(),
  },
  {
    interval: 'Off',
    timeout: null,
    synthObject: new Tone.Synth(),
    vibrato: new Tone.Vibrato(),
    chorus: new Tone.Chorus(),
    filter: new Tone.AutoFilter(),
    gain: new Tone.Gain(),
  },
]

// that's pretty. Root Sub P5 M2 P4 M6 with vibrato and filter
DroneTones.hookUpToneJS = function() {
  DroneTones._synthNests.forEach( nest => {
    nest.synthObject.connect(nest.vibrato)
    nest.vibrato.connect(nest.filter)
    // nest.chorus.connect(nest.gain)
    nest.filter.connect(nest.gain)
    nest.gain.toMaster()
    nest.gain.gain.value = 0.125
  })
}

DroneTones.switchSynth = function(nest) {
  console.log('nest', nest)
  nest.rise = getRandomInRange(DroneTones._riseMin, DroneTones._riseMax)
  nest.fall = getRandomInRange(DroneTones._fallMin, DroneTones._fallMax)
  nest.rest = getRandomInRange(DroneTones._restMin, DroneTones._restMax)
  const chosenSynthOptions = DroneTones.getChosenSynthOptions()
  const synthType = chosenSynthOptions[Math.floor(Math.random() * chosenSynthOptions.length)]
  switch (synthType) {
    case 'Sawtooth':
      nest.synthObject.oscillator.type = 'sawtooth'
      // nest.synthObject.volume = -12
      break
    case 'Whatever':
      // just to get that error to shut up.
      nest.synthObject.volume = -12
      break
    default:
      nest.oscillator.partials = DroneTones.partialsOptions(synthType)
      nest.synthObject.volume = -12
      break
  }
  // BUT VOLUME. maybe other stuff too

  // pass these in with new rather than define them each time:
  nest.synthObject.envelope.decay = 0
  nest.synthObject.envelope.sustain = 1
  nest.synthObject.envelope.attackCurve = 'linear' // was using 'linear because 'exponential' previously gave error "time constant must be geater than zero at t.Signal.t.Param.setTargetAtTime (Tone.min.js:1) at t.Signal.t.Param.exponentialApproachValueAtTime (Tone.min.js:1)at t.Signal.t.Param.targetRampTo (Tone.min.js:1) at t.AmplitudeEnvelope.t.Envelope.triggerAttack (Tone.min.js:1) at t.Synth._triggerEnvelopeAttack (Tone.min.js:1) at t.Synth.t.Monophonic.triggerAttack (Tone.min.js:1) at t.Synth.t.Instrument.triggerAttackRelease (Tone.min.js:1) at t.Loop.callback (DroneTones.js:31) at t.Loop._tick (Tone.min.js:1) at t.Event._tick (Tone.min.js:1)
  nest.synthObject.envelope.decayCurve = 'exponential'
  nest.synthObject.envelope.releaseCurve = 'linear'
}

DroneTones.setUpSynths = function() {
  this._synthNests.forEach( nest => {
    DroneTones.switchSynth(nest)
  })
}

DroneTones.startTimeouts = () => {
  // Tone.context.resume()

  // let startingDelay = 0
  // let nextDelay = 0
  for (var i=0; i<8; i++) {
    // DroneTones.assignTimeout('starting', i, startingDelay)
    DroneTones.assignTimeout('rise', i)
    // nextDelay = Math.random()*1000
    // startingDelay += nextDelay
  }
}

DroneTones.assignTimeout = (phase, nestNumber) => {
  const nest = DroneTones._synthNests[nestNumber]
  switch (phase) {
    case 'rest':
      if (nest.interval === 'Off') { return }
      clearTimeout(nest.timeout) // is this needed here?
      nest.timeout = setTimeout(()=> {
        DroneTones.assignTimeout('rise', nestNumber)
      }, nest.rest)
      break
    case 'rise':
      if (nest.interval === 'Off') { return }
      DroneTones.switchSynth(nest)
      const detune = DroneTones.constants.intervalToDetune[nest.interval] + DroneTones._tuning
      nest.synthObject.detune.value = detune
      nest.synthObject.envelope.attack = nest.rise
      console.log(nest.synthObject.envelope.attack)
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
      console.log('timeout in fall', nest.timeout)
      nest.synthObject.triggerRelease()
      nest.timeout = setTimeout(()=>{
        DroneTones.assignTimeout('rise', nestNumber)
      }, 1000 * nest.fall)
      DroneTones._intervalSelectors[nestNumber].style.transitionDuration = nest.fall + 's'
      DroneTones._intervalSelectors[nestNumber].classList.remove('glow')
      break
  }
}


// DroneTones.cancelTimeouts (clears all timeouts on ._synths)
