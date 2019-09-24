
class View {
  constructor(model) {

    this.model = model
    const settings = this.model._settings

    // CACHE THE DOM
    this._intervalChoosers = document.querySelector('#interval_choosers')
    this._intervalSelectors = [].slice.call(this._intervalChoosers.children)

    this._basePitchSelect = document.querySelector('#base_pitch')
    this._tuningValue = document.querySelector('#tuning_value')
    this._tuningMinus = document.querySelector('#tuning_minus')
    this._tuningPlus = document.querySelector('#tuning_plus')
    this._startStopButton = document.querySelector('#start_stop')

    this._toggleSawtooth = document.querySelector('#toggleSawtooth')
    this._toggleFullStops = document.querySelector('#toggleFullStops')
    this._toggleRandomStops = document.querySelector('#toggleRandomStops')
    this._toggleClusters = document.querySelector('#toggleClusters')

    this._synthOptionToggleCorrespondence = {
      'Sawtooth': this._toggleSawtooth,
      'FullStops': this._toggleFullStops,
      'RandomStops': this._toggleRandomStops,
      'Clusters': this._toggleClusters,
    }

    this._fullStopsRange = document.querySelector('#fullStopsRange')
    this._randomStopsRange = document.querySelector('#randomStopsRange')
    this._clustersRange = document.querySelector('#clustersRange')
    this._clustersDensity = document.querySelector('#clustersDensity')

    this._toggleVibrato = document.querySelector('#toggleVibrato')
    this._toggleFilter = document.querySelector('#toggleFilter')

    this._vibratoRate = document.querySelector('#vibratoRate')
    this._filterRate = document.querySelector('#filterRate')
    this._vibratoDepth = document.querySelector('#vibratoDepth')
    this._filterDepth = document.querySelector('#filterDepth')

    this._riseMin = document.querySelector('#riseMin')
    this._riseMax = document.querySelector('#riseMax')
    this._fallMin = document.querySelector('#fallMin')
    this._fallMax = document.querySelector('#fallMax')
    this._restMin = document.querySelector('#restMin')
    this._restMax = document.querySelector('#restMax')

    // SET HTML VALUES FROM STATE
    this._intervalSelectors.forEach((select, index) => {
      select.value = settings._synthIntervals[index]
    })
    this._basePitchSelect.value = settings._basePitch
    this.setTuningView()

    this._toggleSawtooth.checked = settings._activeSynthOptions.Sawtooth
    this._toggleFullStops.checked = settings._activeSynthOptions.FullStops
    this._toggleRandomStops.checked = settings._activeSynthOptions.RandomStops
    this._toggleClusters.checked = settings._activeSynthOptions.Clusters

    // this._fullStopsRange.value = this._partialsRanges['fullStops']
    // this._randomStopsRange.value = this._partialsRanges['randomStops']
    // this._clustersRange.value = this._partialsRanges['clusters']
    // this._clustersDensity.value = this._clustersDensitySetting
    //
    // this._toggleVibrato.checked = this._effectSettings['vibrato']['on']
    // this._toggleFilter.checked = this._effectSettings['filter']['on']
    //
    // this._vibratoRate.value = this._effectSettings['vibrato']['rate']
    // this._filterRate.value = this._effectSettings['filter']['rate']
    // this._vibratoDepth.value = this._effectSettings['vibrato']['depth']
    // this._filterDepth.value = this._effectSettings['filter']['depth']
    //
    // this._riseMin.value = this._timing.riseMin
    // this._riseMax.value = this._timing.riseMax
    // this._fallMin.value = this._timing.fallMin
    // this._fallMax.value = this._timing.fallMax
    // this._restMin.value = this._timing.restMin
    // this._restMax.value = this._timing.restMax
  }


  start() {
    this._startStopButton.innerHTML = 'Stop'
    this._startStopButton.classList.add('pulse')
  }

  stop() {
    this._startStopButton.innerHTML = 'Play'
    this._startStopButton.classList.remove('pulse')

    // (...same code as in 'fall' timeout... abstract to a function to make more DRY?)
    this._intervalSelectors.forEach((selector, index) => {
      selector.style.transitionDuration = this.model._synthTimings[index].fall + 's'
      selector.classList.remove('glow')
    })
  }

  setTuningView() {
    this._tuningValue.innerHTML = this.model._settings._tuning
  }


}