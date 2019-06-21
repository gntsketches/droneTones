// 

function SynthBuilder() {
	const synthTypes = [sine]//, triangle, sawtooth]//, square]
	
	// 	this._autoFilter = new Tone.AutoFilter("4n").start();
	//this._tremolo = new Tone.Tremolo().start();	
	//this._phaser = new Tone.Phaser(); 
	
	//this._synth = new Tone.Synth(synthTypes[Math.floor(Math.random()*synthTypes.length)])
	this._synth = new Tone.Synth(new PartialBuilder())
	
	this._chorus = new Tone.Chorus()
	  this._chorus.delayTime = Math.random() * 2 + 0.1 // in ms,3.5 ,usually between 2 and 20 // higher values do cool stuff!
		this._chorus.depth = Math.random() / 2 + 0.5 // normal range, 0.7 
		this._chorus.frequency.value = Math.random() * 2  // of LFO, 1.5
		this._chorus.spread = Math.random() * 90 + 90 // degrees panning, 180
		// .type
		this._chorus.wet.value = Math.random() / 2 + 0.5// normal range 
		
	this._vibrato = new Tone.Vibrato()
		// this._vibrato.depth.value = Math.random() // normal range, 0.1, is fine.
		//this._vibrato.frequency.value = Math.random() * 5 // frequency, 5
		// this._vibrato.maxDelay = Math.random() // 0.005,
		// .type
		//this._vibrato.wet = Math.random() / 2 + 0.5 // normal range 

	this._synth.connect(this._chorus)
	this._chorus.connect(this._vibrato)
	this._vibrato.toMaster()

	return this._synth

};