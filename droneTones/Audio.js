
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

}