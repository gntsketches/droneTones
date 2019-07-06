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
	},
	volume: 10,
	envelope: envelopeSettings
}

const triangle = {
	oscillator  : {
		type: 'triangle'
	},
	volume: 10,
	envelope: envelopeSettings
}

const sawtooth = {
	oscillator  : {
		type: 'sawtooth'
	},
	volume: -12,
	envelope: envelopeSettings
}

const square = {
	oscillator  : {
		type: 'square',
	},
	volume: -12,
	envelope: envelopeSettings
}