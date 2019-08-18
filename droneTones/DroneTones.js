let DroneTones = {
	// STATE
	_started: false,
	// _synths: [],
	_counter: 0,
	_basePitch: 'G2',
	_tuning: 0,
	_riseMin: 4,
	_riseMax: 8,
	_fallMin: 4,
	_fallMax: 8,
	_intervals: ['Root', 'Sub','Root', 'P5', 'Off', 'Off', 'Off', 'Off'],
	_startStopButton: null,
	_activeSynthOptions: {
		'Sawtooth': true,
		'FullStops': false,
		'RandomStops': false,
		'Clusters': false,
		'Singles': false,
	},
	_partialsRanges: {
		'fullStops': 20,
		'randomStops': 20,
		'clusters': 20,
		'singles': 20,
	},
	_effectSettings: {
		'vibrato': {
			'on': true,
			'rate': 1,
			'depth': 0.5,
		},
		'chorus': {
			'on': true,
			'rate': 1,
			'depth': 0.5,
		},
		'filter': {
			'on': true,
			'rate': 1,
			'depth': 0.5,
		},
	},
	_envelopeSettings: {
		attack: Tone.Time('4n'),
		decay: 0,
		sustain: 1,
		release: Tone.Time('2n'),
		attackCurve: 'linear', // was using 'linear because 'exponential' previously gave error "time constant must be geater than zero at t.Signal.t.Param.setTargetAtTime (Tone.min.js:1) at t.Signal.t.Param.exponentialApproachValueAtTime (Tone.min.js:1)at t.Signal.t.Param.targetRampTo (Tone.min.js:1) at t.AmplitudeEnvelope.t.Envelope.triggerAttack (Tone.min.js:1) at t.Synth._triggerEnvelopeAttack (Tone.min.js:1) at t.Synth.t.Monophonic.triggerAttack (Tone.min.js:1) at t.Synth.t.Instrument.triggerAttackRelease (Tone.min.js:1) at t.Loop.callback (DroneTones.js:31) at t.Loop._tick (Tone.min.js:1) at t.Event._tick (Tone.min.js:1)
		decayCurve: 'exponential',
		releaseCurve: 'linear' // somehow, linear actually sounds smoother tho...
	},
}

// GENERAL FUNCTIONS

DroneTones.setTunings = function(tuning) {
	if (tuning==='minus') {
		this._tuning -= 1
	} else if (tuning==='plus') {
		this._tuning += 1
	}
	document.querySelector('#tuning_value').innerHTML = this._tuning
}

DroneTones.setSpeed = function() {
	// Tone.Transport.bpm.value = this._speed
}

DroneTones.addSynth = function() {
	let synth = new DroneTones.SynthBuilder()
	this._synths.push(synth)
}

DroneTones.stageCleanup = function(synthToGo) {
	setTimeout(()=>{
		synthToGo.cleanup()
	}, 20000)
}

DroneTones.popSynth = function() {
	DroneTones.stageCleanup(DroneTones._synths[DroneTones._synths.length-1])
	this._synths.pop()
}

DroneTones.shiftSynths = function() {
	DroneTones.stageCleanup(DroneTones._synths[0])
	this._synths.shift()
	this.addSynth()
}

DroneTones.start = function() {
	// DroneTones.setUpSynths()
		// don't think this function is actually needed... redundant because each synth is set up at rise
	this._started = true
	this._startStopButton.innerHTML = 'Stop'
	Tone.context.resume()
	// this.loop.start(0)
	DroneTones.startTimeouts()
}

DroneTones.stop = function() {
	this._started = false
	this._startStopButton.innerHTML = 'Play'
	// this.loop.stop()
	this._synthNests.forEach((nest) => {
		clearTimeout(nest.timeout)
		nest.synthObject.triggerRelease()
	})
}

DroneTones.changeActiveSynthOptions = function(e) {
	// if there's only one checked, prevent it from changing to false and check the toggle DOM element
	if (DroneTones.getChosenSynthOptions().length === 1 && e.target.checked === false) {
		DroneTones.constants.synthOptionToggleCorrespondence[e.target.name].checked = true
	} else {
		this._activeSynthOptions[e.target.name] = e.target.checked
	}
}

DroneTones.getChosenSynthOptions = function() {
	const synthOptions = DroneTones._activeSynthOptions
	const chosenSynthOptions = []
	for (const key in synthOptions) {
		if (synthOptions[key] === true) { chosenSynthOptions.push(key) }
	}
	return chosenSynthOptions
};

DroneTones.changePartialsRanges = function(e) {
	this._partialsRanges[e.target.name] = parseInt(e.target.value, 10)
}

DroneTones.changeEffectSetting = function(e) {
	const effect = e.target.name.split('-')[0]
	const field = e.target.name.split('-')[1]
	const value = field === 'on' ? e.target.checked : parseFloat(e.target.value)
	this._effectSettings[effect][field] = value
	console.log(this._effectSettings)
}

