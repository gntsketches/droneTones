
DroneTones.init = function() { // arrow function not working here, why?

  console.log(Tone.Time('4n',4))

  // INITIALIZE TRANSPORT
  this.setSpeed()
  Tone.Transport.start();

  // INITIALIZE THE SYNTHS
  DroneTones.hookUpToneJS()

  // CACHE THE DOM
  this._intervalChooser = document.querySelector('#interval_choosers')
  this._intervalSelectors = [].slice.call(this._intervalChooser.children)
  this._intervalAddButton = document.querySelector('#intervalAddButton')
  this._intervalRemoveButton = document.querySelector('#intervalRemoveButton')

  this._basePitchSelect = document.querySelector('#base_pitch')
  this._tuningMinus = document.querySelector('#tuning_minus')
  this._tuningPlus = document.querySelector('#tuning_plus')
  this._startStopButton = document.querySelector('#start_stop')
  this._speedInput = document.querySelector('#speed')

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

  this._vibratoRate = document.querySelector('#vibratoRate')
  this._chorusRate = document.querySelector('#chorusRate')
  this._filterRate = document.querySelector('#filterRate')
  this._vibratoDepth = document.querySelector('#vibratoDepth')
  this._chorusDepth = document.querySelector('#chorusDepth')
  this._filterDepth = document.querySelector('#filterDepth')


  // ADD A REPRESENTATION STRUCTURE FOR THE TOGGLES TO THE CONSTANTS OBJECT
  DroneTones.constants.synthOptionToggleCorrespondence = {
    'Sawtooth': DroneTones._toggleSawtooth,
    'FullStops': DroneTones._toggleFullStops,
    'RandomStops': DroneTones._toggleRandomStops,
    'Clusters': DroneTones._toggleClusters,
    'Singles': DroneTones._toggleSingles,
  }


  // SET HTML VALUES FROM STATE

  this._intervalSelectors.forEach((select, index) => {
    select.value = DroneTones._synthNests[index].interval
  })

  this._basePitchSelect.value = this._basePitch
  this.setTunings()
  this._speedInput.value = this._speed
  this.setSpeed()

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

  this._vibratoRate.value = this._effectSettings['vibrato']['rate']
  this._chorusRate.value = this._effectSettings['chorus']['rate']
  this._filterRate.value = this._effectSettings['filter']['rate']
  this._vibratoDepth.value = this._effectSettings['vibrato']['depth']
  this._chorusDepth.value = this._effectSettings['chorus']['depth']
  this._filterDepth.value = this._effectSettings['filter']['depth']


  // SET UP SYNTHS AND SYNTH MANAGEMENT
  this.SynthSetup.init()


  // ADD EVENT LISTENERS

  this._intervalSelectors.forEach((select, index) => {
    select.addEventListener('change', (e) => {
      DroneTones._synthNests[index].interval = e.target.value
      console.log(DroneTones._synthNests)
    })
  })

  this._basePitchSelect.addEventListener('change', (e) => {
    this._basePitch = e.target.value
  })

  this._tuningMinus.addEventListener('click', () => {
    this.setTunings('minus')
  })

  this._tuningPlus.addEventListener('click', () => {
    this.setTunings('plus')
  })

  this._startStopButton.addEventListener('click', (e) => {
    if (this._started === false) {
      this.start()
    } else {
      this.stop()
    }
  })

  this._speedInput.addEventListener('change', (e) => {
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

  this._vibratoRate.addEventListener('change', (e) => {
    this.changeEffectSetting(e)
  })
  this._chorusRate.addEventListener('change', (e) => {
    this.changeEffectSetting(e)
  })
  this._filterRate.addEventListener('change', (e) => {
    this.changeEffectSetting(e)
  })
  this._vibratoDepth.addEventListener('change', (e) => {
    this.changeEffectSetting(e)
  })
  this._chorusDepth.addEventListener('change', (e) => {
    this.changeEffectSetting(e)
  })
  this._filterDepth.addEventListener('change', (e) => {
    this.changeEffectSetting(e)
  })

  // https://www.reddit.com/r/chrome/comments/ca8uxk/windowaddeventlistener_suddenly_not_working/
  window.addEventListener('keydown', function(e){
    // console.log('this', this, 'e', e)
    if (e.key===' ' && this._started) {
      e.preventDefault()
      this.stop()
    } else if (e.key===' ') {
      e.preventDefault()
      this.start()
    }
  }.bind(this)) // .bind and arrow functions both ok :)


} //*************************************************************************
