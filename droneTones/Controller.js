
class Controller {
  constructor(model, view, audio) {
    this.model = model
    this.view = view
    this.audio = audio
    console.log(audio)

    this.view._startStopButton.addEventListener('click', (e) => {
      if (this.model._started === false) {
        this.start()
      } else {
        this.stop()
      }
    })
  }

  init() {
    console.log('it inits')
  }

  start() {
    this.model.setStarted(true)
    this.view.start()
    this.audio.start()
    this.startTimeouts()
  }

  stop() {
    this.model.setStarted(false)
    this.view.stop()
    this.audio.stop()

    // ???._synthNests.forEach((nest, nestNumber) => {
    //   // change audio
    //   clearTimeout(nest.timeout)
    //   nest.synthObject.triggerRelease()
    //   // (...same code as in 'fall' timeout... abstract to a function to make more DRY?)
    //   // change view
    //   DroneTones._intervalSelectors[nestNumber].style.transitionDuration = nest.fall + 's'
    //   DroneTones._intervalSelectors[nestNumber].classList.remove('glow')
    // })
  }

  startTimeouts() {
    const firstActiveSynthNumber = this.model._settings._synthIntervals.findIndex(interval => {
      return interval !== 'Off'
    })
    if (firstActiveSynthNumber >= 0) {
      this.setUpSynth(firstActiveSynthNumber)
      this.assignTimeout('rise', firstActiveSynthNumber)
    } else {
      this.assignTimeout('rest', firstActiveSynthNumber)
    }
    for (let i=0; i<8; i++) {
      if (i !== firstActiveSynthNumber) {
        this.assignTimeout('rest', i)
      }
    }
  }

  setUpSynth(synthIndex) {
    const settings = this.model._settings
    const timings = this.model._synthTimings[synthIndex]
    const nest = this.audio._synthNests[synthIndex]
    timings.rise = getRandomInRange(settings._timing.riseMin, settings._timing.riseMax)
    timings.fall = getRandomInRange(settings._timing.fallMin, settings._timing.fallMax)
    timings.rest = getRandomInRange(settings._timing.restMin, settings._timing.restMax)

    const vibratoSettings = this.model._settings._effectSettings['vibrato']
    nest.vibrato.frequency.value = Math.random() * vibratoSettings.rate // frequency, 5
    nest.vibrato.depth.value = Math.random() * vibratoSettings.depth // normal range, 0.1, is fine.
    nest.vibrato.wet.value = vibratoSettings['on'] ? Math.random() : 0 // Math.random() // /2 + 0.5 // normal range

    // console.log('vibrato')
    // console.log(nest.vibrato.frequency.value)
    // console.log(nest.vibrato.depth.value)
    // console.log('vibrato on?', nest.vibrato.wet.value)

    const filterSettings = this.model._settings._effectSettings['filter']
    nest.filter.frequency.value = Math.random() * filterSettings.rate
    nest.filter.depth.value = Math.random() * filterSettings.depth // normal range
    nest.filter.octaves = Math.random() * 5 // different?
    nest.filter.wet.value = filterSettings['on'] ? Math.random() : 0 //  /2 + 0.5// normal range

    // console.log('filter')
    // console.log(nest.filter.frequency.value)
    // console.log(nest.filter.depth.value)
    // console.log(nest.filter.octaves)
    // console.log('filter on?', nest.filter.wet.value)

    const chosenSynthOptions = this.model.getChosenSynthOptions()
    const synthType = chosenSynthOptions[Math.floor(Math.random() * chosenSynthOptions.length)]
    switch (synthType) {
      case 'Sawtooth':
        nest.synthObject.oscillator.type = 'sawtooth'
        nest.synthObject.volume.value = -6
        break
      case 'FullStops':
        nest.synthObject.oscillator.partials = DroneTones.partialsOptions[synthType]()
        nest.synthObject.volume.value = -6
        break
      case 'RandomStops':
        nest.synthObject.oscillator.partials = DroneTones.partialsOptions[synthType]()
        nest.synthObject.volume.value = 0
        break
      case 'Clusters':
        nest.synthObject.oscillator.partials = DroneTones.partialsOptions[synthType]()
        nest.synthObject.volume.value = -6
        break
      default:
        nest.synthObject.oscillator.partials = DroneTones.partialsOptions[synthType]()
        nest.synthObject.volume.value = -12
        break
    }

    // Keep - console display of type/partials is mentioned in docs
    // console.log(synthType, nest.synthObject.oscillator.partials)

    // pass these in with new rather than define them each time:
    nest.synthObject.envelope.decay = 0
    nest.synthObject.envelope.sustain = 1
    nest.synthObject.envelope.attackCurve = 'linear' // was using 'linear because 'exponential' previously gave error "time constant must be geater than zero at t.Signal.t.Param.setTargetAtTime (Tone.min.js:1) at t.Signal.t.Param.exponentialApproachValueAtTime (Tone.min.js:1)at t.Signal.t.Param.targetRampTo (Tone.min.js:1) at t.AmplitudeEnvelope.t.Envelope.triggerAttack (Tone.min.js:1) at t.Synth._triggerEnvelopeAttack (Tone.min.js:1) at t.Synth.t.Monophonic.triggerAttack (Tone.min.js:1) at t.Synth.t.Instrument.triggerAttackRelease (Tone.min.js:1) at t.Loop.callback (DroneTones.js:31) at t.Loop._tick (Tone.min.js:1) at t.Event._tick (Tone.min.js:1)
    nest.synthObject.envelope.decayCurve = 'exponential'
    nest.synthObject.envelope.releaseCurve = 'linear'
  }

  assignTimeout = (phase, synthIndex) => {
      console.log(phase)
    const timings = this.model._synthTimings[synthIndex]
    const nest = this.audio._synthNests[synthIndex]
    const settings = this.model._settings
    const interval = this.model._settings._synthIntervals[synthIndex]
    switch (phase) {
      case 'rest':
        this.setUpSynth(synthIndex)
        if (interval === 'Off') {
          timings.timeout = setTimeout(()=> { this.assignTimeout('rest', synthIndex) }, 1000 * timings.rest)
        } else {
          timings.timeout = setTimeout(()=> { this.assignTimeout('rise', synthIndex) }, 1000 * timings.rest)
        }
        break
      case 'rise':
        if (interval === 'Off') { return }
        // console.log('rise', nest.rise)
        const detune = DroneTones.constants.intervalToDetune[interval] + settings._tuning
        nest.synthObject.detune.value = detune
        nest.synthObject.envelope.attack = timings.rise
        nest.synthObject.envelope.release = timings.fall
        nest.synthObject.triggerAttack(settings._basePitch)
        timings.timeout = setTimeout(()=>{
          this.assignTimeout('fall', synthIndex)
        }, 1000 * timings.rise)
        this.view._intervalSelectors[synthIndex].style.transitionDuration = timings.rise + 's'
        this.view._intervalSelectors[synthIndex].classList.add('glow')
        break
      case 'fall':
        // clearTimeout(nest.timeout)
        // console.log('fall', nest.fall)
        nest.synthObject.triggerRelease()
        timings.timeout = setTimeout(()=>{
          this.assignTimeout('rest', synthIndex)
        }, 1000 * timings.fall)
        this.view._intervalSelectors[synthIndex].style.transitionDuration = timings.fall + 's'
        this.view._intervalSelectors[synthIndex].classList.remove('glow')
        break
    }
  }



} // END CONTROLLER *************************************************************************************
