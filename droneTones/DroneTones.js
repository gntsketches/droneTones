let DroneTones = {
	// STATE
	_started: false,
	_synths: [],
	_counter: 0,
	_rests: 0, //3
	_basePitch: 'G1',
	_interval: 'Perfect 5',
	_tuning: 0,
	_speed: 15,
	_detunings: [0, 1200, 1200, 1900],
	_startStopButton: null,
	_activeSynthOptions: {
		'Sine': false,
		'Triangle': false,
		'Sawtooth': false,
		'Square': false,
		'Modulos': true,
		'Tens': true,
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

DroneTones.shiftSynths = function() {
	const synthToGo = this._synths[0]
	setTimeout(()=>{
		console.log('toGo', synthToGo)
		synthToGo.cleanup()
	}, 60000)
	// this._synths[0].cleanup()
	this._synths.shift()
	this.addSynth()
}

DroneTones.loop = new Tone.Loop(function (time) {
	// console.log(time)
	let  beat = this._counter % (this._synths.length + this._rests)
	if (beat === 0) {
		this.shiftSynths()
	}
	if (beat < this._synths.length) {
		this._synths[beat].synth.detune.value = this._tuning + this._detunings[beat]
		this._synths[beat].synth.triggerAttackRelease(this._basePitch, 2*Tone.Time('4n') )
		console.log(this._synths[beat].synth.oscillator.type, this._synths[beat].synth.oscillator.partials)
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
}

DroneTones.changeActiveSynthOptions = function(e) {
	if (true) {  // if there's not only one checked
		this._activeSynthOptions[e.target.name] = e.target.checked
	}

}

