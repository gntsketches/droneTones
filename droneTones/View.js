
class View {
  constructor(model) {

    this.model = model

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

    this._reset = document.querySelector('#reset')

    this.updateElementsFromState()

  }

  updateElementsFromState() {
    const settings = this.model._settings

    this._intervalSelectors.forEach((select, index) => {
      select.value = settings._synthIntervals[index]
    })
    this._basePitchSelect.value = settings._basePitch
    this.setTuningView()

    this._toggleSawtooth.checked = settings._activeSynthOptions.Sawtooth
    this._toggleFullStops.checked = settings._activeSynthOptions.FullStops
    this._toggleRandomStops.checked = settings._activeSynthOptions.RandomStops
    this._toggleClusters.checked = settings._activeSynthOptions.Clusters

    this._fullStopsRange.value = settings._partialsRanges['fullStops']
    this._randomStopsRange.value = settings._partialsRanges['randomStops']
    this._clustersRange.value = settings._partialsRanges['clusters']
    this._clustersDensity.value = settings._clustersDensity

    this._toggleVibrato.checked = settings._effectSettings['vibrato']['on']
    this._toggleFilter.checked = settings._effectSettings['filter']['on']

    this._vibratoRate.value = settings._effectSettings['vibrato']['rate']
    this._filterRate.value = settings._effectSettings['filter']['rate']
    this._vibratoDepth.value = settings._effectSettings['vibrato']['depth']
    this._filterDepth.value = settings._effectSettings['filter']['depth']

    this._riseMin.value = settings._timing.riseMin
    this._riseMax.value = settings._timing.riseMax
    this._fallMin.value = settings._timing.fallMin
    this._fallMax.value = settings._timing.fallMax
    this._restMin.value = settings._timing.restMin
    this._restMax.value = settings._timing.restMax

  }

  // BIND STUFF

  bindIntervalSelectors(handler) {
    this._intervalSelectors.forEach((select, index) => {
      select.addEventListener('change', (e) => { handler(index, e.target.value) })
    })
  }

  bindBasePitchSelect(handler) {
    this._basePitchSelect.addEventListener('change', event => { handler(event.target.value) })
  }

  bindTuners(handler) {
    this._tuningMinus.addEventListener('click', () => { handler('minus') })
    this._tuningPlus.addEventListener('click', () => { handler('plus') })
  }

  bindStartStop(handler) {
    this._startStopButton.addEventListener('click', () => { handler() })
  }

  bindSynthToggles(handler) {
    this._toggleSawtooth.addEventListener('change', e => { handler(e.target.name, e.target.checked) })
    this._toggleFullStops.addEventListener('change', e => { handler(e.target.name, e.target.checked) })
    this._toggleRandomStops.addEventListener('change', e => { handler(e.target.name, e.target.checked) })
    this._toggleClusters.addEventListener('change', e => { handler(e.target.name, e.target.checked) })
  }

  bindPartialsRanges(handler) {
    this._fullStopsRange.addEventListener('change', e => { handler(e.target.name, e.target.value) })
    this._randomStopsRange.addEventListener('change', e => { handler(e.target.name, e.target.value) })
    this._clustersRange.addEventListener('change', e => { handler(e.target.name, e.target.value) })
  }

  bindClustersDensity(handler) {
    this._clustersDensity.addEventListener('change', e => { handler(e.target.value) })
  }

  bindEffectControls(handler) {
    function processEffectEvent(e) {
      const effect = e.target.name.split('-')[0]
      const field = e.target.name.split('-')[1]
      const value = field === 'on' ? e.target.checked : parseFloat(e.target.value)
      return { effect: effect, field: field, value: value}
    }
    this._toggleVibrato.addEventListener('change', (e) => { handler(processEffectEvent(e)) })
    this._toggleFilter.addEventListener('change', (e) => { handler(processEffectEvent(e)) })
    this._vibratoRate.addEventListener('change', (e) => { handler(processEffectEvent(e)) })
    this._filterRate.addEventListener('change', (e) => { handler(processEffectEvent(e)) })
    this._vibratoDepth.addEventListener('change', (e) => { handler(processEffectEvent(e)) })
    this._filterDepth.addEventListener('change', (e) => { handler(processEffectEvent(e)) })
  }

  bindTimingControls(handler) {
    this._riseMin.addEventListener('change', (e) => { handler(e.target.name, e.target.value) })
    this._riseMax.addEventListener('change', (e) => { handler(e.target.name, e.target.value) })
    this._fallMin.addEventListener('change', (e) => { handler(e.target.name, e.target.value) })
    this._fallMax.addEventListener('change', (e) => { handler(e.target.name, e.target.value) })
    this._restMin.addEventListener('change', (e) => { handler(e.target.name, e.target.value) })
    this._restMax.addEventListener('change', (e) => { handler(e.target.name, e.target.value) })
  }

  bindReset(handler) {
    this._reset.addEventListener('click', () => { handler() })
  }

  // GENERAL FUNCTIONS

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

  setTimingView(phaseRange, value) {
    const map = {
      'riseMin': this._riseMin, 'riseMax': this._riseMax,
      'fallMin': this._fallMin, 'fallMax': this._fallMax,
      'restMin': this._restMin, 'restMax': this._restMax,
    }
    map[phaseRange].value = value
  }

  glowIntervalSelectors(phase, synthIndex) {
    const timings = this.model._synthTimings[synthIndex]
    if (phase === 'rise') {
      this._intervalSelectors[synthIndex].style.transitionDuration = timings.rise + 's'
      this._intervalSelectors[synthIndex].classList.add('glow')
    } else {
      this._intervalSelectors[synthIndex].style.transitionDuration = timings.fall + 's'
      this._intervalSelectors[synthIndex].classList.remove('glow')
    }
  }

} // END VIEW ********************************************************************