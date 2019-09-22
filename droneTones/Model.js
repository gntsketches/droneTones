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
}


class Model {
  constructor() {
    this._settings = JSON.parse(localStorage.getItem('droneTonesState')) || settingsDefaults
    this._started = false
    this._timeouts = new Array(8)  // initializing array length since indexes are keys. (hmm, what happens if you set arr[5] on an empty array?)

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