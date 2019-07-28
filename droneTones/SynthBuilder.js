DroneTones.SynthBuilder = function() {

	const synthOptions = DroneTones._activeSynthOptions

	const chosenSynthOptions = []
	for (const key in synthOptions) {
		if (synthOptions[key] === true) { chosenSynthOptions.push(key) }
	}

	const synthType = chosenSynthOptions[Math.floor(Math.random() * chosenSynthOptions.length)]
	const config = DroneTones.synthOptions[synthType]()
	this.synth = new Tone.Synth(config)
	// console.log("synth type:", this.synth.oscillator.type)

	this._autoFilter = new Tone.AutoFilter().start();
		this._autoFilter.frequency.value = Math.random() * 5
 		this._autoFilter.depth.value = Math.random() * 5
		this._autoFilter.octaves = Math.random() * 5
		this._autoFilter.wet.value = Math.random() //  /2 + 0.5// normal range

	this._chorus = new Tone.Chorus()
	  this._chorus.delayTime = Math.random() * 2 + 0.1 // in ms,3.5 ,usually between 2 and 20 // higher values do cool stuff!
		this._chorus.depth = Math.random() / 2 + 0.5 // normal range, 0.7
		this._chorus.frequency.value = Math.random() * 2  // of LFO, 1.5
		this._chorus.spread = Math.random() * 90 + 90 // degrees panning, 180
		this._chorus.wet.value = Math.random() //  /2 + 0.5// normal range
		
	this._vibrato = new Tone.Vibrato()
		this._vibrato.depth.value = Math.random() // normal range, 0.1, is fine.
		this._vibrato.frequency.value = Math.random() * 5 // frequency, 5
		this._vibrato.maxDelay = Math.random() // 0.005,
		this._vibrato.wet = Math.random() // /2 + 0.5 // normal range

	this._gain = new Tone.Gain(0.25)

	this.synth.connect(this._autoFilter)
	this._autoFilter.connect(this._chorus)
	this._chorus.connect(this._vibrato)
	this._vibrato.connect(this._gain)
	this._gain.toMaster()

	this.cleanup = () => {
		this.synth.dispose()
		this._gain.dispose()
		this._autoFilter.dispose()
		this._chorus.dispose()
		this._vibrato.dispose()
	}


	return this
};


// re: chosenSynthOptions:
	// OR use a do-while loop to randomly select true values from _activeSynthOptions with Object.keys?
	// OR use .filter()
	// const chosenSynthOptions = Object.keys(synthOptions)
	// 	.filter(synthName => synthOptions[synthName] === true) // can reference array as argument