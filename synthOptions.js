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
    console.log(partials)
    return {
      oscillator  : {
        type: 'sine',
        partials: partials
      },
      volume: 2,
      envelope: DroneTones._envelopeSettings
    }
  },

  Tens(){
    let partials = []
    for (var i=0; i < 20 ; i++) {
      if (Math.random()<0.1) {
        console.log(i)
        for (var j=0; j<9; j++) {
          partials = [...partials, i*10 + j]
        }
      }
    }
    console.log(partials)
    return {
      oscillator  : {
        type: 'sine',
        partials: partials
      },
      volume: 2,
      envelope: DroneTones._envelopeSettings
    }
  },

  Sine() {
    return {
      oscillator: {
        type: 'sine',
      },
      volume: 10,
      envelope: DroneTones._envelopeSettings
    }
  },

  Triangle() {
    return {
      oscillator: {
        type: 'triangle',
      },
      volume: 10,
      envelope: DroneTones._envelopeSettings
    }
  },

  Sawtooth() {
    return {
      oscillator: {
        type: 'sawtooth'
      },
      volume: -12,
      envelope: DroneTones._envelopeSettings
    }
  },

  Square() {
    return {
      oscillator: {
        type: 'square',
      },
      volume: -12,
      envelope: DroneTones._envelopeSettings
    }
  },
}




