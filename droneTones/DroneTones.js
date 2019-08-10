let DroneTones = {
	// STATE
	_started: false,
	_synths: [],
	_counter: 0,
	_rests: 0, //3
	_basePitch: 'G2',
	_tuning: 0,
	_speed: 15,
	_intervals: ['Root', 'Sub','Root', 'Rest'],
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
		releaseCurve: 'exponential'
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
	Tone.Transport.bpm.value = this._speed
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

DroneTones.loop = new Tone.Loop(function (time) {
	// console.log(time)
	const beat = this._counter % (this._synths.length + this._rests)
	if (beat === 0) {
		this.shiftSynths()
	}
	const synth = this._synths[beat]
	const interval = this._intervals[beat]
	if (beat < this._synths.length && interval !== 'Rest') {
		synth.synth.detune.value = this._tuning + this.constants.intervalToDetune[this._intervals[beat]]
		synth.synth.triggerAttackRelease(this._basePitch, 2*Tone.Time('4n') )
		// console.log(this._synths[beat].synth.oscillator.type, this._synths[beat].synth.oscillator.partials)
	}
	this._counter++
}.bind(DroneTones), '4n')


DroneTones.start = function() {
	this._started = true
	this._startStopButton.innerHTML = 'Stop'
	Tone.context.resume()
	this.loop.start(0)
}

DroneTones.stop = function() {
	this._started = false
	this._startStopButton.innerHTML = 'Play'
	this.loop.stop()
	this._synths.forEach((synth) => {
		synth.synth.triggerRelease()
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

