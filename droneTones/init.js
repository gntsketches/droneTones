
DroneTones.init = function() { // arrow function not working here, why?

  // console.log(Tone.Time('4n',4))

  // SET UP SYNTHS
  for (let i = 0; i < 4; i++) {
    this.addSynth()
  }


  // INITIALIZE TRANSPORT
  this.setSpeed()
  Tone.Transport.start();


  // CACHE THE DOM

  this._intervalChooser = document.querySelector('#interval_choosers')
  this._intervalAddButton = document.querySelector('#intervalAddButton')
  this._intervalRemoveButton = document.querySelector('#intervalRemoveButton')
  this._startStopButton = document.querySelector('#start_stop')

  this._toggleSawtooth = document.querySelector('#toggleSawtooth')
  this._toggleFullStops = document.querySelector('#toggleFullStops')
  this._toggleRandomStops = document.querySelector('#toggleRandomStops')
  this._toggleClusters = document.querySelector('#toggleClusters')
  this._toggleSingles = document.querySelector('#toggleSingles')

  this._fullStopsRange = document.querySelector('#fullStopsRange')
  this._randomStopsRange = document.querySelector('#randomStopsRange')
  this._clustersRange = document.querySelector('#clustersRange')
  this._singlesRange = document.querySelector('#singlesRange')

  this._toggleVibrato = document.querySelector('#toggleVibrato')
  this._toggleChorus = document.querySelector('#toggleChorus')
  this._toggleFilter = document.querySelector('#toggleFilter')

  // SET HTML VALUES FROM STATE
  document.querySelector('#base_pitch').value = this._basePitch
  this.setTunings()
  document.querySelector('#speed').value = this._speed

  this.SynthSetup.init()

  this._toggleSawtooth.checked = this._activeSynthOptions.Sawtooth
  this._toggleFullStops.checked = this._activeSynthOptions.FullStops
  this._toggleRandomStops.checked = this._activeSynthOptions.RandomStops
  this._toggleClusters.checked = this._activeSynthOptions.Clusters
  this._toggleSingles.checked = this._activeSynthOptions.Singles

  this._fullStopsRange.value = this._partialsRanges['fullStops']
  this._randomStopsRange.value = this._partialsRanges['randomStops']
  this._clustersRange.value = this._partialsRanges['clusters']
  this._singlesRange.value = this._partialsRanges['singles']

  this._toggleVibrato.checked = this._effectSettings['vibrato']['on']
  this._toggleChorus.checked = this._effectSettings['chorus']['on']
  this._toggleFilter.checked = this._effectSettings['filter']['on']



  // ADD EVENT LISTENERS

  this._startStopButton.addEventListener('click', (e) => {
    if (this._started === false) {
      this.start()
    } else {
      this.stop()
    }
  })

  document.querySelector('#tuning_minus').addEventListener('click', () => {
    this.setTunings('minus')
  })

  document.querySelector('#tuning_plus').addEventListener('click', () => {
    this.setTunings('plus')
  })

  document.querySelector('#speed').addEventListener('change', (e) => {
    // console.log(e.target.value)
    this._speed = e.target.value
    console.log('bpm', this._speed)
    this.setSpeed()
  })


  this._toggleSawtooth.addEventListener('change', (e) => {
    this.changeActiveSynthOptions(e)
  })
  this._toggleFullStops.addEventListener('change', (e) => {
    this.changeActiveSynthOptions(e)
  })
  this._toggleRandomStops.addEventListener('change', (e) => {
    this.changeActiveSynthOptions(e)
  })
  this._toggleClusters.addEventListener('change', (e) => {
    this.changeActiveSynthOptions(e)
  })
  this._toggleSingles.addEventListener('change', (e) => {
    this.changeActiveSynthOptions(e)
  })

  this._fullStopsRange.addEventListener('change', (e) => {
    this.changePartialsRanges(e)
  })
  this._randomStopsRange.addEventListener('change', (e) => {
    this.changePartialsRanges(e)
  })
  this._clustersRange.addEventListener('change', (e) => {
    this.changePartialsRanges(e)
  })
  this._singlesRange.addEventListener('change', (e) => {
    this.changePartialsRanges(e)
  })

  this._toggleVibrato.addEventListener('change', (e) => {
    this.changeEffectSetting(e)
  })
  this._toggleChorus.addEventListener('change', (e) => {
    this.changeEffectSetting(e)
  })
  this._toggleFilter.addEventListener('change', (e) => {
    this.changeEffectSetting(e)
  })


  // https://www.reddit.com/r/chrome/comments/ca8uxk/windowaddeventlistener_suddenly_not_working/
  window.addEventListener('keydown', function(e){
    // console.log('this', this, 'e', e)
    if (e.key===' ' && this._started) {
      this.stop()
    } else if (e.key===' ') {
      this.start()
    }
  }.bind(this)) // .bind and arrow functions both ok :)


} //*************************************************************************
