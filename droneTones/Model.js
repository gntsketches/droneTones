const settingsDefaults = {
  // _counter: 0,  // don't think that's in use...
  _basePitch: 'G2',
  _tuning: 1,
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
    this._settings = JSON.parse(localStorage.getItem('droneTonesSettings')) || settingsDefaults
    this._started = false
    this._synthTimings = [{},{}, {},{}, {},{}, {},{}]  // timeout, rise, fall, rest

    // bindTodoListChanged(callback) {
    //   this.onTodoListChanged = callback
    // }
  }

  // _commit(todos) {
  //   this.onTodoListChanged(todos)
  //   localStorage.setItem('todos', JSON.stringify(todos))
  // }

  start() {
    this._started = true
  }

  stop() {
    this._started = false
    for (let i=0; i<8; i++) {
      clearTimeout(this._synthTimings[i].timeout)
    }
  }

  // MODEL - business logic
  getChosenSynthOptions() {
    const synthOptions = this._settings._activeSynthOptions
    const chosenSynthOptions = []
    for (const key in synthOptions) {
      if (synthOptions[key] === true) { chosenSynthOptions.push(key) }
    }
    return chosenSynthOptions
  }

  setTuning(tuning) {
    if (tuning === 'minus') {
      this._settings._tuning -= 1
    } else if (tuning === 'plus') {
      this._settings._tuning += 1
    }
  }

  setAnInterval(index, value) {
    this._settings._synthIntervals[index] = value
  }

  setBasePitch(value) {
    this._settings._basePitch = value
  }

  setActiveSynthOptions(name, checked) {
    this._settings._activeSynthOptions[name] = checked
  }

  setPartialsRanges(name, value) {
    this._settings._partialsRanges[name] = parseInt(value, 10)
  }

  setClustersDensity(value) {
    this._settings._clustersDensity = parseFloat(value)
  }

  setEffectSetting(e) {
    // note how this receives the event, while other Model functions get value, etc.
    const effect = e.target.name.split('-')[0]
    const field = e.target.name.split('-')[1]
    const value = field === 'on' ? e.target.checked : parseFloat(e.target.value)
    this._settings._effectSettings[effect][field] = value
  }

} // END MODEL ************************************************************************************