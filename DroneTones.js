let DroneTones = {

	// STATE
	_started: false,
	_synths: [],
	_counter: 0,
	_rests: 0, //3
	_tempo: 15,
	_basePitch: 'g1',
	_tuning: 0,
	_detunings: [0, 1200, 1200, 1900],
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
	console.log(this)
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

DroneTones.init = function() { // arrow function not working here, why?
	console.log(this)
	for (let i = 0; i < 4; i++) {
		this.addSynth()
	}

	Tone.Transport.bpm.value = this._tempo
	Tone.Transport.start();

	document.querySelector('#start_stop').addEventListener('click', (e) => {
		if (this._started === false) {
			console.log(e)
			this._started = true
			e.target.innerHTML = 'Stop'
			Tone.context.resume()
			this.loop.start(0)
		} else {
			this._started = false
			e.target.innerHTML = 'Play'
			this.loop.stop()
		}
	})

	document.querySelector('#base_pitch').addEventListener('change', (e) => {
		console.log(e.target.value)
		this._basePitch = e.target.value
	})
	// https://2ality.com/2012/08/ids-are-global.html
	// https://stackoverflow.com/questions/3434278/do-dom-tree-elements-with-ids-become-global-variables
}


