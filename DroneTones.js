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
		'Modulos': true,
		'Tens': true,
		'Sine': true,
		'Triangle': true,
		'Sawtooth': true,
		'Square': true,
	},
	_envelopeSettings: {
		attack: 4,
		decay: 0,
		sustain: 1,
		release: 8,
		attackCurve: 'linear', // 'exponential' gave error "time constant must be geater than zero at t.Signal.t.Param.setTargetAtTime (Tone.min.js:1) at t.Signal.t.Param.exponentialApproachValueAtTime (Tone.min.js:1)at t.Signal.t.Param.targetRampTo (Tone.min.js:1) at t.AmplitudeEnvelope.t.Envelope.triggerAttack (Tone.min.js:1) at t.Synth._triggerEnvelopeAttack (Tone.min.js:1) at t.Synth.t.Monophonic.triggerAttack (Tone.min.js:1) at t.Synth.t.Instrument.triggerAttackRelease (Tone.min.js:1) at t.Loop.callback (DroneTones.js:31) at t.Loop._tick (Tone.min.js:1) at t.Event._tick (Tone.min.js:1)
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
	this._synths[0].dispose() // does this work? doesn't seem like it.
	this._synths.shift()
	this.addSynth()
}

DroneTones.loop = new Tone.Loop(function (time) {
	console.log(time)
	let  beat = this._counter % (this._synths.length + this._rests)
	if (beat === 0) {
		this.shiftSynths()
	}
	if (beat < this._synths.length) {
		this._synths[beat].detune.value = this._tuning + this._detunings[beat] // 400
		this._synths[beat].triggerAttackRelease(this._basePitch,8) // pitches[beat], 8)
		console.log(this._synths[beat].oscillator.type)
	}
	this._counter++
}.bind(DroneTones))

// consider caching DOM?
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


// INITIALIZE IT. AND I'LL ADVERTIZE IT.

DroneTones.init = function() { // arrow function not working here, why?
	// SET UP SYNTHS
	for (let i = 0; i < 4; i++) {
		this.addSynth()
	}

	// INITIALIZE TRANSPORT
	this.setSpeed()
	Tone.Transport.start();

	// CACHE THE DOM
	this._startStopButton = document.querySelector('#start_stop')

	// SET HTML VALUES FROM STATE
	document.querySelector('#base_pitch').value = this._basePitch
	document.querySelector('#interval').value = this._interval
	this.setTunings()
	document.querySelector('#speed').value = this._speed


	// ADD EVENT LISTENERS
	document.querySelector('#start_stop').addEventListener('click', (e) => {
		if (this._started === false) {
			this.start()
		} else {
			this.stop()
		}
	})

	document.querySelector('#base_pitch').addEventListener('change', (e) => {
		this._basePitch = e.target.value
	})

	document.querySelector('#interval').addEventListener('change', (e) => {
		this._detunings[3] = 1200 + DroneTones.constants.intervals[e.target.value]
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
		this.setSpeed()
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

