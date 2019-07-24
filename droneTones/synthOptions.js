// unknown: will each synth need different envelope settings?

DroneTones.synthOptions = {

  Modulos (rangeInTens=20, spread=10, modulo=1, odds=0.1) {
    let partials = []
    for (var i=0; i < rangeInTens ; i++) {
      if (Math.random() < odds) {
        for (var j=0; j < spread-1; j++) {
          if (j % modulo === 0) {
            partials = [...partials, i*10 + j]
          }
        }
      }
    }
    // console.log('modulos', partials)
    return {
      oscillator  : {
        type: 'sine',
        partials: partials
      },
      volume: -12,
      envelope: DroneTones._envelopeSettings
    }
  },

  Tens(){
    let partials = []
    for (var i=0; i < 20 ; i++) {
      if (Math.random()<0.1) {
        // console.log(i)
        for (var j=0; j<9; j++) {
          partials = [...partials, i*10 + j]
        }
      }
    }
    // console.log('tens', partials)
    return {
      oscillator  : {
        type: 'sine',
        partials: partials
      },
      volume: -12,
      envelope: DroneTones._envelopeSettings
    }
  },

  Singles(range=500){
    let partials = [Math.random()]
    console.log('singles', partials)
    return {
      oscillator  : {
        // type: 'sine',
        partials: partials
      },
      volume: 1,
      envelope: DroneTones._envelopeSettings
    }
  },

  Sine() {
    return {
      oscillator: {
        type: 'sine',
      },
      volume: 7,
      envelope: DroneTones._envelopeSettings
    }
  },

  Triangle() {
    return {
      oscillator: {
        type: 'triangle',
      },
      volume: 5,
      envelope: DroneTones._envelopeSettings
    }
  },

  Sawtooth() {
    return {
      oscillator: {
        type: 'sawtooth'
      },
      volume: -24,
      envelope: DroneTones._envelopeSettings
    }
  },

  Square() {
    return {
      oscillator: {
        type: 'square',
      },
      volume: -24,
      envelope: DroneTones._envelopeSettings
    }
  },
}




