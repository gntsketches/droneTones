
class Audio {
  constructor() {
    // interval and timeout to MODEL, ToneJS stuff to AUDIO
    // might break up functions if they just accept "nest"
    this._synthNests = [
      {
        interval: 'Root',
        timeout: null,
        synthObject: new Tone.Synth(),
        vibrato: new Tone.Vibrato(),
        filter: new Tone.AutoFilter(),
        gain: new Tone.Gain(),
      },
      {
        interval: 'Sub',
        timeout: null,
        synthObject: new Tone.Synth(),
        vibrato: new Tone.Vibrato(),
        filter: new Tone.AutoFilter(),
        gain: new Tone.Gain(),
      },
      {
        interval: 'Root',
        timeout: null,
        synthObject: new Tone.Synth(),
        vibrato: new Tone.Vibrato(),
        filter: new Tone.AutoFilter(),
        gain: new Tone.Gain(),
      },
      {
        interval: 'P5',
        timeout: null,
        synthObject: new Tone.Synth(),
        vibrato: new Tone.Vibrato(),
        filter: new Tone.AutoFilter(),
        gain: new Tone.Gain(),
      },
      {
        interval: 'Off',
        timeout: null,
        synthObject: new Tone.Synth(),
        vibrato: new Tone.Vibrato(),
        filter: new Tone.AutoFilter(),
        gain: new Tone.Gain(),
      },
      {
        interval: 'Off',
        timeout: null,
        synthObject: new Tone.Synth(),
        vibrato: new Tone.Vibrato(),
        filter: new Tone.AutoFilter(),
        gain: new Tone.Gain(),
      },
      {
        interval: 'Off',
        timeout: null,
        synthObject: new Tone.Synth(),
        vibrato: new Tone.Vibrato(),
        filter: new Tone.AutoFilter(),
        gain: new Tone.Gain(),
      },
      {
        interval: 'Off',
        timeout: null,
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
    // hmmm
    // DroneTones.startTimeouts()
    console.log('audio starting')
  }

  stop() {
    console.log('audio stopping')
  }

}