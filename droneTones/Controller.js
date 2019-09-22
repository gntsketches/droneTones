
class Controller {
  constructor(model, view, audio) {
    this.model = model
    this.view = view
    this.audio = audio

    this.view._startStopButton.addEventListener('click', (e) => {
      if (this.model._started === false) {
        this.start()
      } else {
        this.stop()
      }
    })
  }

  init() {
    console.log('it inits')
  }

  start() {
    this.model.setStarted(true)
    this.view.start()
    this.audio.start()
  }

  stop() {
    this.model.setStarted(false)
    this.view.stop()
    this.audio.stop()

    // ???._synthNests.forEach((nest, nestNumber) => {
    //   // change audio
    //   clearTimeout(nest.timeout)
    //   nest.synthObject.triggerRelease()
    //   // (...same code as in 'fall' timeout... abstract to a function to make more DRY?)
    //   // change view
    //   DroneTones._intervalSelectors[nestNumber].style.transitionDuration = nest.fall + 's'
    //   DroneTones._intervalSelectors[nestNumber].classList.remove('glow')
    // })
  }

}