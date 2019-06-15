console.log(" synth builder")





function SynthBuilder() {
	const synthTypes = [sine, triangle, sawtooth, square]
	
	this._synth = new Tone.Synth(synthTypes[Math.floor(Math.random()*synthTypes.length)])
	console.log(this._synth.oscillator.type)
	this._chorus = new Tone.Chorus()
	this._vibrato = new Tone.Vibrato()
	this._vibrato.toMaster()
	
	this._synth.connect(this._chorus)
	this._chorus.connect(this._vibrato)
	this._lfo = new Tone.LFO(0.125, 0, 0.25)
	this._lfo.connect(this._vibrato.depth)
	this._lfo.start()
	return this._synth
};