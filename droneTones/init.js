
DroneTones.init = function() { // arrow function not working here, why?

  // console.log(Tone.Time('4n',4))

  // SET UP SYNTHS
  for (let i = 0; i < 4; i++) {
    this.addSynth()
  }

  // INITIALIZE TRANSPORT
  this.setSpeed()
  Tone.Transport.start();

  // CACHE THE DOM
  this._intervalChooser = document.querySelector('#interval_choosers')
  this._intervalAddButton = document.querySelector('#intervalAddButton')
  this._intervalRemoveButton = document.querySelector('#intervalRemoveButton')
  this._startStopButton = document.querySelector('#start_stop')
  this._toggleSine = document.querySelector('#toggleSine')
  this._toggleTriangle = document.querySelector('#toggleTriangle')
  this._toggleSawtooth = document.querySelector('#toggleSawtooth')
  this._toggleSingles = document.querySelector('#toggleSingles')
  this._toggleModulos = document.querySelector('#toggleModulos')
  this._toggleTens = document.querySelector('#toggleTens')

  // SET HTML VALUES FROM STATE
  document.querySelector('#base_pitch').value = this._basePitch
  this.setTunings()
  document.querySelector('#speed').value = this._speed

  this.SynthSetup.init()

  this._toggleSine.checked = this._activeSynthOptions.Sine
  this._toggleTriangle.checked = this._activeSynthOptions.Triangle
  this._toggleSawtooth.checked = this._activeSynthOptions.Sawtooth
  this._toggleSingles.checked = this._activeSynthOptions.Singles
  this._toggleModulos.checked = this._activeSynthOptions.Modulos
  this._toggleTens.checked = this._activeSynthOptions.Tens

  // ADD EVENT LISTENERS
  this._startStopButton.addEventListener('click', (e) => {
    if (this._started === false) {
      this.start()
    } else {
      this.stop()
    }
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
    console.log('bpm', this._speed)
    this.setSpeed()
  })



  this._toggleSine.addEventListener('change', (e) => {
    this.changeActiveSynthOptions(e)
  })
  this._toggleTriangle.addEventListener('change', (e) => {
    this.changeActiveSynthOptions(e)
  })
  this._toggleSawtooth.addEventListener('change', (e) => {
    this.changeActiveSynthOptions(e)
  })
  this._toggleSingles.addEventListener('change', (e) => {
    this.changeActiveSynthOptions(e)
  })
  this._toggleModulos.addEventListener('change', (e) => {
    this.changeActiveSynthOptions(e)
  })
  this._toggleTens.addEventListener('change', (e) => {
    this.changeActiveSynthOptions(e)
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
