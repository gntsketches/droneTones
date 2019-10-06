
class Audio {
  constructor(model) {

    this.model = model

    this._synthNests = [
      {
        synthObject: new Tone.Synth(),
        vibrato: new Tone.Vibrato(),
        filter: new Tone.AutoFilter(),
        gain: new Tone.Gain(),
      },
      {
        synthObject: new Tone.Synth(),
        vibrato: new Tone.Vibrato(),
        filter: new Tone.AutoFilter(),
        gain: new Tone.Gain(),
      },
      {
        synthObject: new Tone.Synth(),
        vibrato: new Tone.Vibrato(),
        filter: new Tone.AutoFilter(),
        gain: new Tone.Gain(),
      },
      {
        synthObject: new Tone.Synth(),
        vibrato: new Tone.Vibrato(),
        filter: new Tone.AutoFilter(),
        gain: new Tone.Gain(),
      },
      {
        synthObject: new Tone.Synth(),
        vibrato: new Tone.Vibrato(),
        filter: new Tone.AutoFilter(),
        gain: new Tone.Gain(),
      },
      {
        synthObject: new Tone.Synth(),
        vibrato: new Tone.Vibrato(),
        filter: new Tone.AutoFilter(),
        gain: new Tone.Gain(),
      },
      {
        synthObject: new Tone.Synth(),
        vibrato: new Tone.Vibrato(),
        filter: new Tone.AutoFilter(),
        gain: new Tone.Gain(),
      },
      {
        synthObject: new Tone.Synth(),
        vibrato: new Tone.Vibrato(),
        filter: new Tone.AutoFilter(),
        gain: new Tone.Gain(),
      },
    ]

    this._synthNests.forEach( nest => {
      nest.synthObject.connect(nest.vibrato)
      nest.vibrato.connect(nest.filter)
      nest.filter.connect(nest.gain)
      nest.gain.toMaster()
      nest.gain.gain.value = 0.125
      nest.filter.start()
    })

  }

  start() {
    Tone.context.resume()
    console.log('audio starting')
  }

  stop() {
    console.log('audio stopping')
    this._synthNests.forEach((nest, index) => {
      nest.synthObject.triggerRelease()
    })
  }

  assignSynthParameter(synthIndex, param) {
    const settings = this.model._settings
    const timings = this.model._synthTimings[synthIndex]
    switch (param) {
      case 'detune':
        const interval = settings._synthIntervals[synthIndex]
        const detune = this.model._intervalToDetune[interval] + settings._tuning
        this._synthNests[synthIndex].synthObject.detune.value = detune
        break
      case 'attack':
        this._synthNests[synthIndex].synthObject.envelope.attack = timings.rise
        break
      case 'release':
        this._synthNests[synthIndex].synthObject.envelope.release = timings.fall
        break
    }
  }

  assignSynthEffect(synthIndex, effect) {
    const nest = this._synthNests[synthIndex]

    if (effect === 'vibrato') {
      const vibratoSettings = this.model._settings._effectSettings['vibrato']
      nest.vibrato.frequency.value = Math.random() * vibratoSettings.rate // frequency, 5
      nest.vibrato.depth.value = Math.random() * vibratoSettings.depth // normal range, 0.1, is fine.
      nest.vibrato.wet.value = vibratoSettings['on'] ? Math.random() : 0 // Math.random() // /2 + 0.5 // normal range
      // console.log('vibrato')
      // console.log(nest.vibrato.frequency.value)
      // console.log(nest.vibrato.depth.value)
      // console.log('vibrato on?', nest.vibrato.wet.value)
    } else if (effect === 'filter') {
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
    }
  }

  assignSynthType(synthIndex, synthType) {
    const nest = this._synthNests[synthIndex]

    switch (synthType) {
      case 'Sawtooth':
        nest.synthObject.oscillator.type = 'sawtooth'
        nest.synthObject.volume.value = -6
        break
      case 'FullStops':
        nest.synthObject.oscillator.partials = this.getPartials(synthType)
        nest.synthObject.volume.value = -6
        break
      case 'RandomStops':
        nest.synthObject.oscillator.partials = this.getPartials(synthType)
        nest.synthObject.volume.value = 0
        break
      case 'Clusters':
        nest.synthObject.oscillator.partials = this.getPartials(synthType)
        nest.synthObject.volume.value = -6
        break
    }

    nest.synthObject.envelope.decay = 0
    nest.synthObject.envelope.sustain = 1
    nest.synthObject.envelope.attackCurve = 'linear' // was using 'linear because 'exponential' previously gave error "time constant must be geater than zero at t.Signal.t.Param.setTargetAtTime (Tone.min.js:1) at t.Signal.t.Param.exponentialApproachValueAtTime (Tone.min.js:1)at t.Signal.t.Param.targetRampTo (Tone.min.js:1) at t.AmplitudeEnvelope.t.Envelope.triggerAttack (Tone.min.js:1) at t.Synth._triggerEnvelopeAttack (Tone.min.js:1) at t.Synth.t.Monophonic.triggerAttack (Tone.min.js:1) at t.Synth.t.Instrument.triggerAttackRelease (Tone.min.js:1) at t.Loop.callback (DroneTones.js:31) at t.Loop._tick (Tone.min.js:1) at t.Event._tick (Tone.min.js:1)
    nest.synthObject.envelope.decayCurve = 'exponential'
    nest.synthObject.envelope.releaseCurve = 'linear'
  }

  triggerAttack(synthIndex) {
    this._synthNests[synthIndex].synthObject.triggerAttack(this.model._settings._basePitch)
  }

  triggerRelease(synthIndex) {
    this._synthNests[synthIndex].synthObject.triggerRelease()
  }

  getPartials(type) {
    const settings = this.model._settings
    let partials = []
    let range
    switch (type) {
      case 'FullStops':
        range = settings._partialsRanges['fullStops']
        for (let i = 0; i < range; i++) {
          partials.push(1)
        }
        return partials
      case 'RandomStops':
        range = settings._partialsRanges['randomStops']
        for (let i = 0; i < range; i++) {
          partials.push(Math.random())
        }
        return partials
    case'Clusters':
      const rand = Math.random
      partials = [rand(), rand(), rand(), rand(), rand()]
      range = settings._partialsRanges['clusters']
      for (let i = 0; i < range; i++) {
        let num = 0
        if (Math.random() < settings._clustersDensity) {
          num = rand()
        }
        // for (let j = 0; j < Math.round[getRandomInRange(3,5)]; j++) {
        for (let j = 0; j < 5; j++) {
          partials = [...partials, num]
        }
      }
      return partials
    }
  }

} // END AUDIO ***********************************************************************************************