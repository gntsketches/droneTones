// https://tonejs.github.io/docs/r13/Type#time // can hook to transport


const envelopeSettings = {
		attack  : 4,		
		decay  : 0,
		sustain  : 1,
		release  : 8,
		attackCurve: 'linear', // 'exponential' gave error "time constant must be geater than zero at t.Signal.t.Param.setTargetAtTime (Tone.min.js:1) at t.Signal.t.Param.exponentialApproachValueAtTime (Tone.min.js:1)at t.Signal.t.Param.targetRampTo (Tone.min.js:1) at t.AmplitudeEnvelope.t.Envelope.triggerAttack (Tone.min.js:1) at t.Synth._triggerEnvelopeAttack (Tone.min.js:1) at t.Synth.t.Monophonic.triggerAttack (Tone.min.js:1) at t.Synth.t.Instrument.triggerAttackRelease (Tone.min.js:1) at t.Loop.callback (main.js:31) at t.Loop._tick (Tone.min.js:1) at t.Event._tick (Tone.min.js:1)
		decayCurve: 'exponential',
		releaseCurve: 'exponential'
	}



	
	

const sine = {
	oscillator  : {
		type: 'sine',
		//partials: [1]
		//41,42,43,44,45,46,47,48,49,40,51,52,53,54,55,56,57,58,59,60,
		//61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80]
	},
	volume: 2,
	envelope: envelopeSettings
}

const triangle = {
	oscillator  : {
		type: 'triangle'
	},
	volume: 2,
	envelope: envelopeSettings
}

const sawtooth = {
	oscillator  : {
		type: 'sawtooth'
	},
	volume: -20,
	envelope: envelopeSettings
}

const square = {
	oscillator  : {
		type: 'square',
		//partials: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
	},
	volume: -20,
	envelope: envelopeSettings
}