
// goal: a constructor which returns a synth with random property assignments
	// can accept an object for testing?
// https://propa.app/
// todo: Why is it needed to trigger the synthesizer before the loop?
// todo: Why doesn't it play when release is assigned '8n'
// todo: caster questions - How fast can you speak/How many commands in a row/Different types of commands? 
		//commands for: comment, new, 

// https://codepen.io/gntsketches/pen/KjVdBm?editors=1010

console.log(" main")


var synths = []
var counter = 0

function addSynth() {
	let synth = new SynthBuilder()
	synths.push(synth)
	console.log(synth)
};

for (var i=0; i<3; i++) {
	addSynth()
}

var synth = new Tone.Synth()

var loop = new Tone.Loop(function (time) {
	console.log(time)
	//synth.triggerAttackRelease('g1', '4n')
	var which = counter%synths.length
	console.log(which)
	synths[which].triggerAttackRelease('g1', '4n')

	counter++
})

Tone.Transport.bpm.value = 30
Tone.Transport.start();


document.querySelector('#start').addEventListener('click', () => { 
	synth.triggerAttackRelease('c4', '16n')
	loop.start(0)

})
document.querySelector('#stop').addEventListener('click', () => { 
	loop.stop()

})

