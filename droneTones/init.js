
DroneTones.init = function() { // arrow function not working here, why?

  // INITIALIZE THE SYNTHS
    // AUDIO
  DroneTones.hookUpToneJS()




  // SET HTML VALUES FROM STATE
    // VIEW
  this._intervalSelectors.forEach((select, index) => {
    select.value = DroneTones._synthNests[index].interval
  })

  this._basePitchSelect.value = this._basePitch
  this.setTunings()

  this._toggleSawtooth.checked = this._activeSynthOptions.Sawtooth
  this._toggleFullStops.checked = this._activeSynthOptions.FullStops
  this._toggleRandomStops.checked = this._activeSynthOptions.RandomStops
  this._toggleClusters.checked = this._activeSynthOptions.Clusters

  this._fullStopsRange.value = this._partialsRanges['fullStops']
  this._randomStopsRange.value = this._partialsRanges['randomStops']
  this._clustersRange.value = this._partialsRanges['clusters']
  this._clustersDensity.value = this._clustersDensitySetting

  this._toggleVibrato.checked = this._effectSettings['vibrato']['on']
  this._toggleFilter.checked = this._effectSettings['filter']['on']

  this._vibratoRate.value = this._effectSettings['vibrato']['rate']
  this._filterRate.value = this._effectSettings['filter']['rate']
  this._vibratoDepth.value = this._effectSettings['vibrato']['depth']
  this._filterDepth.value = this._effectSettings['filter']['depth']

  this._riseMin.value = this._timing.riseMin
  this._riseMax.value = this._timing.riseMax
  this._fallMin.value = this._timing.fallMin
  this._fallMax.value = this._timing.fallMax
  this._restMin.value = this._timing.restMin
  this._restMax.value = this._timing.restMax


  /*
  ADD EVENT LISTENERS
    CONTROLLER? I think so, since that's what they are "doing",
      even though they are on HTML elements, which are part of the "view",
      the 'listening' function is really an aspect of controller
      some are directly manipulating STATE,
      so that should be be calling controllers to change the model...
      most call controller-esq functions like setTunings
    Not so fast. Lately in reading, it's looking like the View "is" the UI
      so in Tania's MVC, listeners are defined in View, but pass their data to handlers from the Controller
      since you're querying the DOM here, would it really make sense to define them elsewhere?
    OR, maybe you're right after all.
      a) it's easy to attach to the View from the Controller,
      b) you're checking to model to change things conditionally
   */

  this._intervalSelectors.forEach((select, index) => {
    // maybe this function should be described elsewhere...
    select.addEventListener('change', (e) => {
      const nest = DroneTones._synthNests[index]
      nest.interval = e.target.value
      if (DroneTones._started && e.target.value === 'Off') {
        DroneTones.assignTimeout('fall', index)
      }
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

  DroneTones._synthOptionToggleCorrespondence = {
    'Sawtooth': DroneTones._toggleSawtooth,
    'FullStops': DroneTones._toggleFullStops,
    'RandomStops': DroneTones._toggleRandomStops,
    'Clusters': DroneTones._toggleClusters,
  },

  this._fullStopsRange.addEventListener('change', (e) => {
    this.changePartialsRanges(e)
  })
  this._randomStopsRange.addEventListener('change', (e) => {
    this.changePartialsRanges(e)
  })
  this._clustersRange.addEventListener('change', (e) => {
    this.changePartialsRanges(e)
  })
  this._clustersDensity.addEventListener('change', (e) => {
    this.changeClustersDensitySetting(e)
  })

  this._toggleVibrato.addEventListener('change', (e) => {
    this.changeEffectSetting(e)
  })
  this._toggleFilter.addEventListener('change', (e) => {
    this.changeEffectSetting(e)
  })

  this._vibratoRate.addEventListener('change', (e) => {
    this.changeEffectSetting(e)
  })
  this._filterRate.addEventListener('change', (e) => {
    this.changeEffectSetting(e)
  })
  this._vibratoDepth.addEventListener('change', (e) => {
    this.changeEffectSetting(e)
  })
  this._filterDepth.addEventListener('change', (e) => {
    this.changeEffectSetting(e)
  })

  this._riseMin.addEventListener('change', (e) => {
    this.changeTimingSettings(e)
  })
  this._riseMax.addEventListener('change', (e) => {
    this.changeTimingSettings(e)
  })
  this._fallMin.addEventListener('change', (e) => {
    this.changeTimingSettings(e)
  })
  this._fallMax.addEventListener('change', (e) => {
    this.changeTimingSettings(e)
  })
  this._restMin.addEventListener('change', (e) => {
    this.changeTimingSettings(e)
  })
  this._restMax.addEventListener('change', (e) => {
    this.changeTimingSettings(e)
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
