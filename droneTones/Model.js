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
  _clustersDensitySetting: 0.2,
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

  setStarted(started) {
    this._started = started
  }

  // MODEL - business logic
  getChosenSynthOptions() {
    const synthOptions = this._settings._activeSynthOptions
    const chosenSynthOptions = []
    for (const key in synthOptions) {
      if (synthOptions[key] === true) { chosenSynthOptions.push(key) }
    }
    return chosenSynthOptions
  };


}