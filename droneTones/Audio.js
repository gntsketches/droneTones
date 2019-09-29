
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

  setSynthParameters(synthIndex, param) {
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