
class Controller {
  constructor(model, view, audio) {
    this.model = model
    this.view = view
    this.audio = audio

    // SET UP EVENT LISTENERS ***********************************

    this.view.bindIntervalSelectors(this.changeInterval)
    this.view.bindBasePitchSelect(this.changeBasePitch)
    this.view.bindTuners(this.changeTuning)
    this.view.bindStartStop(this.startStop)
    this.view.bindSynthToggles(this.changeActiveSynthOptions)
    this.view.bindPartialsRanges(this.changePartialsRanges)
    this.view.bindClustersDensity(this.changeClustersDensity)
    this.view.bindEffectControls(this.changeEffectSetting)
    this.view.bindTimingControls(this.changeTimingSettings)
    this.view.bindReset(this.verifyReset)

    window.addEventListener('keydown', function(e){
      if (e.key===' ') {
        e.preventDefault()
        this.startStop()
      }
    }.bind(this)) // .bind and arrow functions both ok :)

  }


  startStop = () => {
    if (this.model._started === false) {
      this.model.start()
      this.view.start()
      this.audio.start()
      this.startTimeouts()
    } else {
      this.model.stop()
      this.view.stop()
      this.audio.stop()
    }
  }

  changeInterval = (index, value) => {
    this.model.setAnInterval(index, value)
  }

  changeBasePitch = value => {
    this.model.setBasePitch(value)
  }

  changeTuning = tuning => {
    this.model.setTuning(tuning)
    this.view.setTuningView()
  }

  changeActiveSynthOptions = (name, checked) => {  // if there's only one checked, prevent it from changing to false and check the toggle DOM element
    if (this.model.getChosenSynthOptions().length === 1 && checked === false) {
      this.view._synthOptionToggleCorrespondence[name].checked = true
    } else {
      this.model.setActiveSynthOptions(name, checked)
    }
  }

  changePartialsRanges = (name, value) => {
    this.model.setPartialsRanges(name, value)
  }

  changeClustersDensity = value => {
    this.model.setClustersDensity(value)
  }

  changeEffectSetting = payload => {
    this.model.setEffectSetting(payload)
  }

  changeTimingSettings = (phaseRange, value) => {
    const timing = this.model._settings._timing
    this.model.setTiming(phaseRange, value)

    if (phaseRange === 'riseMin' && timing['riseMin'] > timing['riseMax']) {
      this.model.setTiming('riseMax', timing['riseMin'])
      this.view.setTimingView('riseMax', timing['riseMax'])
    }

    if (phaseRange === 'riseMax' && timing['riseMax'] < timing['riseMin']) {
      this.model.setTiming('riseMin', timing['riseMax'])
      this.view.setTimingView('riseMin', timing['riseMin'])
    }

    if (phaseRange === 'fallMin' && timing['fallMin'] > timing['fallMax']) {
      this.model.setTiming('fallMax', timing['fallMin'])
      this.view.setTimingView('fallMax', timing['fallMax'])
    }

    if (phaseRange === 'fallMax' && timing['fallMax'] < timing['fallMin']) {
      this.model.setTiming('fallMin', timing['fallMax'])
      this.view.setTimingView('fallMin', timing['fallMin'])
    }

    if (phaseRange === 'restMin' && timing['restMin'] > timing['restMax']) {
      this.model.setTiming('restMax', timing['restMin'])
      this.view.setTimingView('restMax', timing['restMax'])
    }

    if (phaseRange === 'restMax' && timing['restMax'] < timing['restMin']) {
      this.model.setTiming('restMin', timing['restMax'])
      this.view.setTimingView('restMin', timing['restMin'])
    }
  }

  verifyReset = () => {
    const doReset = confirm("Reset DroneTones' default settings?")
    if (!doReset) { return }
    this.model.resetSettings()
    this.view.updateElementsFromState()
  }

  // ENGINE *********************************************************************************

  startTimeouts() {
    const firstActiveSynthNumber = this.model._settings._synthIntervals.findIndex(interval => {
      return interval !== 'Off'
    })
    if (firstActiveSynthNumber >= 0) {
      this.setUpSynth(firstActiveSynthNumber)
      this.assignTimeout('rise', firstActiveSynthNumber)
    } else {
      this.assignTimeout('rest', firstActiveSynthNumber)
    }
    for (let i=0; i<8; i++) {
      if (i !== firstActiveSynthNumber) {
        this.assignTimeout('rest', i)
      }
    }
  }

  setUpSynth(synthIndex) {
    this.model.setSynthTimingsPhase(synthIndex, 'rise')
    this.model.setSynthTimingsPhase(synthIndex, 'fall')
    this.model.setSynthTimingsPhase(synthIndex, 'rest')

    this.audio.assignSynthEffect(synthIndex, 'vibrato')
    this.audio.assignSynthEffect(synthIndex, 'filter')

    const chosenSynthOptions = this.model.getChosenSynthOptions()
    const synthType = chosenSynthOptions[Math.floor(Math.random() * chosenSynthOptions.length)]
    this.audio.assignSynthType(synthIndex, synthType)
    // Keep - console display of type/partials is mentioned in docs
    // console.log(synthType, nest.synthObject.oscillator.partials)
  }

  assignTimeout = (phase, synthIndex) => {
    const timings = this.model._synthTimings[synthIndex]
    const interval = this.model._settings._synthIntervals[synthIndex]
    switch (phase) {
      case 'rest':
        this.setUpSynth(synthIndex) // do this in rise instead?
        if (interval === 'Off') {
          this.model.setSynthTimeout(synthIndex, setTimeout(()=> { this.assignTimeout('rest', synthIndex) }, 1000 * timings.rest))
        } else {
          this.model.setSynthTimeout(synthIndex, setTimeout(()=> { this.assignTimeout('rise', synthIndex) }, 1000 * timings.rest))
        }
        break
      case 'rise':
        if (interval === 'Off') {
          this.model.setSynthTimeout(synthIndex, setTimeout(()=> { this.assignTimeout('rest', synthIndex) }, 1000 * timings.rest))
        } // this had been just "return", but seems like that removes the timeout from the flow
        // console.log('rise', nest.rise)
        this.audio.assignSynthParameter(synthIndex, 'detune')
        this.audio.assignSynthParameter(synthIndex, 'attack')
        this.audio.assignSynthParameter(synthIndex, 'release')
        this.audio.triggerAttack(synthIndex)
        this.model.setSynthTimeout(synthIndex, setTimeout(()=> { this.assignTimeout('fall', synthIndex) }, 1000 * timings.rest))
        this.view.glowIntervalSelectors('rise', synthIndex)
        break
      case 'fall':
        // console.log('fall', nest.fall)
        this.audio.triggerRelease(synthIndex)
        this.model.setSynthTimeout(synthIndex, setTimeout(()=> { this.assignTimeout('rest', synthIndex) }, 1000 * timings.rest))
        this.view.glowIntervalSelectors('fall', synthIndex)
        break
    }
  }


} // END CONTROLLER *************************************************************************************
