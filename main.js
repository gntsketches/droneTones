
// state
var synths = []
var counter = 0
var rests = 0 //3
var tempo = 15
// var pitches = ['g1', 'g2', 'g2', 'd3']
var basePitch = 'g1'
var detunings = [0, 1200, 1200, 1900]


// main 

function addSynth() {
	let synth = new SynthBuilder()
	synths.push(synth)
	//console.log(synth)
};

function shiftSynths() {
	synths[0].dispose() // does this work? doesn't seem like it.
	synths.shift()
	addSynth()}


var loop = new Tone.Loop(function (time) {
	var beat = counter % (synths.length + rests)
	//console.log(beat, time)
	var synth = new Tone.Synth()
	if (beat === 0) {
		shiftSynths()
	}
	if (beat < synths.length) { 
		synths[beat].detune.value = detunings[beat] // 400
		synths[beat].triggerAttackRelease(basePitch,8) // pitches[beat], 8)
		console.log(synths[beat].oscillator.type)
	}
	counter++
})


// initialize

for (var i=0; i<4; i++) {
	addSynth()
}

Tone.Transport.bpm.value = tempo
Tone.Transport.start();

// UI

document.querySelector('#start').addEventListener('click', () => { 
	//synth.triggerAttackRelease('c4', '16n')
	Tone.context.resume()
	loop.start(0)
})

document.querySelector('#stop').addEventListener('click', () => { 
	loop.stop()
})

document.querySelector('#base_pitch').addEventListener('change', (e) => {
	console.log(e.target.value)
	basePitch = e.target.value
})
// https://2ality.com/2012/08/ids-are-global.html
// https://stackoverflow.com/questions/3434278/do-dom-tree-elements-with-ids-become-global-variables

