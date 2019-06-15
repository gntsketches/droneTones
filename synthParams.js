// https://tonejs.github.io/docs/r13/Type#time // can hook to transport

const sine = {
	oscillator  : {
		type  : 'sine'
	},
	volume: 1,
	envelope  : {
		attack  : '8n',		
		decay  : 0,
		sustain  : 1,
		release  : 0.5
	}
}

const triangle = {
	oscillator  : {
		type  : 'triangle'
	},
	volume: 0,
	envelope  : {
		attack  : '8n',		
		decay  : 0,
		sustain  : 1,
		release  : 0.5
	}
}

const sawtooth = {
	oscillator  : {
		type  : 'sawtooth'
	},
	volume: -12,
	envelope  : {
		attack  : '8n',		
		decay  : 0,
		sustain  : 1,
		release  : 0.5
	}
}

const square = {
	oscillator  : {
		type  : 'square'
	},
	volume: -4,
	envelope  : {
		attack  : '8n',		
		decay  : 0,
		sustain  : 1,
		release  : 0.5
	}
}