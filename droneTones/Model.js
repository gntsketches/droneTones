const settingsDefaults = {
  // _counter: 0,  // don't think that's in use...
  _basePitch: 'G2',
  _tuning: 0,
  _timing: {
    'riseMin': 4,
    'riseMax': 8,
    'fallMin': 4,
    'fallMax': 8,
    'restMin': 2,
    'restMax': 6,
  },
  _startStopButton: null,
  _activeSynthOptions: {
    'Sawtooth': true,
    'FullStops': false,
    'RandomStops': false,
    'Clusters': false,
  },
  _partialsRanges: {
    'fullStops': 20,
    'randomStops': 3,
    'clusters': 20,
  },
  _clustersDensity: 0.2,
  _effectSettings: {
    'vibrato': {
      'on': true,
      'rate': 0.5,
      'depth': 0.5,
    },
    'filter': {
      'on': true,
      'rate': 0.5,
      'depth': 0.5,
    },
  },
  _synthIntervals: [
    'Root', 'Sub', 'Root', 'P5', 'Off', 'Off', 'Off', 'Off'
  ]
}


class Model {
  constructor() {
    this._settings = JSON.parse(localStorage.getItem('droneTonesSettings')) || JSON.parse(JSON.stringify(settingsDefaults))
    this._started = false
    this._synthTimings = [{},{}, {},{}, {},{}, {},{}]  // timeout, rise, fall, rest

  }

  _commitToLocalStorage() {
    localStorage.setItem('droneTonesSettings', JSON.stringify(this._settings))
  }

  // START/STOP
  start() {
    this._started = true
  }

  stop() {
    this._started = false
    for (let i=0; i<8; i++) {
      clearTimeout(this._synthTimings[i].timeout)
    }
  }

  // GETTERS
  getChosenSynthOptions() {
    const synthOptions = this._settings._activeSynthOptions
    const chosenSynthOptions = []
    for (const key in synthOptions) {
      if (synthOptions[key] === true) { chosenSynthOptions.push(key) }
    }
    return chosenSynthOptions
  }

  // SETTERS
  setAnInterval(index, value) {
    this._settings._synthIntervals[index] = value
    this._commitToLocalStorage()
  }

  setBasePitch(value) {
    this._settings._basePitch = value
    this._commitToLocalStorage()
  }

  setTuning(tuning) {
    if (tuning === 'minus') {
      this._settings._tuning -= 1
    } else if (tuning === 'plus') {
      this._settings._tuning += 1
    }
    this._commitToLocalStorage()
  }

  setActiveSynthOptions(name, checked) {
    this._settings._activeSynthOptions[name] = checked
    this._commitToLocalStorage()
  }

  setPartialsRanges(name, value) {
    this._settings._partialsRanges[name] = parseInt(value, 10)
    this._commitToLocalStorage()
  }

  setClustersDensity(value) {
    this._settings._clustersDensity = parseFloat(value)
    this._commitToLocalStorage()
  }

  setEffectSetting({ effect, field, value }) {
    this._settings._effectSettings[effect][field] = value
    this._commitToLocalStorage()
  }

  setTiming(phaseRange, value) {
    this._settings._timing[phaseRange] = parseFloat(value)
    this._commitToLocalStorage()
  }

  resetSettings() {
    this._settings = JSON.parse(JSON.stringify(settingsDefaults))
    this._commitToLocalStorage()
  }

} // END MODEL ************************************************************************************