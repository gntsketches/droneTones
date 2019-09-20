// MODEL

let DroneTones = {
	// STATE
	_started: false,
	_counter: 0,
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

// CONTROLLER
	// change model
DroneTones.setTunings = function(tuning) {
	if (tuning==='minus') {
		this._tuning -= 1
	} else if (tuning==='plus') {
		this._tuning += 1
	}
	// change view
	document.querySelector('#tuning_value').innerHTML = this._tuning
}

// CONTROLLER
DroneTones.start = function() {
	// change model
	this._started = true
	// change view
	this._startStopButton.innerHTML = 'Stop'
	this._startStopButton.classList.add('pulse')
	// change audio
	Tone.context.resume()
	// hmmm
	DroneTones.startTimeouts()
}

// CONTROLLER
DroneTones.stop = function() {
	// change model
	this._started = false
	// change view
	this._startStopButton.innerHTML = 'Play'
	this._startStopButton.classList.remove('pulse')
	// synthNests is in Model?
	this._synthNests.forEach((nest, nestNumber) => {
		// change audio
		clearTimeout(nest.timeout)
		nest.synthObject.triggerRelease()
		// (...same code as in 'fall' timeout... abstract to a function to make more DRY?)
		// change view
		DroneTones._intervalSelectors[nestNumber].style.transitionDuration = nest.fall + 's'
		DroneTones._intervalSelectors[nestNumber].classList.remove('glow')
	})
}

// CONTROLLER
DroneTones.changeActiveSynthOptions = function(e) {  // if there's only one checked, prevent it from changing to false and check the toggle DOM element
	// change model
	if (DroneTones.getChosenSynthOptions().length === 1 && e.target.checked === false) {
		DroneTones._synthOptionToggleCorrespondence[e.target.name].checked = true
	} else {
		// change view
		this._activeSynthOptions[e.target.name] = e.target.checked
	}
}

// MODEL - business logic
DroneTones.getChosenSynthOptions = function() {
	const synthOptions = DroneTones._activeSynthOptions
	const chosenSynthOptions = []
	for (const key in synthOptions) {
		if (synthOptions[key] === true) { chosenSynthOptions.push(key) }
	}
	return chosenSynthOptions
};

// CONTROLLER
DroneTones.changePartialsRanges = function(e) {
	// change model
	this._partialsRanges[e.target.name] = parseInt(e.target.value, 10)
}

// CONTROLLER
DroneTones.changeClustersDensitySetting = function(e) {
	// change model
	this._clustersDensitySetting = parseFloat(e.target.value)
}

// CONTROLLER
DroneTones.changeEffectSetting = function(e) {
	// change model
	const effect = e.target.name.split('-')[0]
	const field = e.target.name.split('-')[1]
	const value = field === 'on' ? e.target.checked : parseFloat(e.target.value)
	this._effectSettings[effect][field] = value
	// console.log(this._effectSettings)
}

// CONTROLLER
DroneTones.changeTimingSettings = function(e) {
	const timingEl = e.target.name
	console.log(timingEl);

	this._timing[timingEl] = parseFloat(e.target.value)
	console.log(this._timing)

	// EACH HAS A change model AND A change view
	if (timingEl==='riseMin' && this._timing['riseMin'] > this._timing['riseMax']) {
		this._timing['riseMax'] = this._timing['riseMin']
		this._riseMax.value = this._timing.riseMax
	}
	if (timingEl==='riseMax' && this._timing['riseMax'] < this._timing['riseMin']) {
		this._timing['riseMin'] = this._timing['riseMax']
		this._riseMin.value = this._timing.riseMin
	}
	if (timingEl==='fallMin' && this._timing['fallMin'] > this._timing['fallMax']) {
		this._timing['fallMax'] = this._timing['fallMin']
		this._fallMax.value = this._timing.fallMax
	}
	if (timingEl==='fallMax' && this._timing['fallMax'] < this._timing['fallMin']) {
		this._timing['fallMin'] = this._timing['fallMax']
		this._fallMin.value = this._timing.fallMin
	}
	if (timingEl==='restMin' && this._timing['restMin'] > this._timing['restMax']) {
		this._timing['restMax'] = this._timing['restMin']
		this._restMax.value = this._timing.restMax
	}
	if (timingEl==='restMax' && this._timing['restMax'] < this._timing['restMin']) {
		this._timing['restMin'] = this._timing['restMax']
		this._restMin.value = this._timing.restMin
	}

} // *****************************************************************************
