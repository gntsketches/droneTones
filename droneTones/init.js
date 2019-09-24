
DroneTones.init = function() { // arrow function not working here, why?

  // INITIALIZE THE SYNTHS
    // AUDIO

  // SET HTML VALUES FROM STATE
    // VIEW


  /*
  ADD EVENT LISTENERS
    CONTROLLER? I think so, since that's what they are "doing",
      even though they are on HTML elements, which are part of the "view",
      the 'listening' function is really an aspect of controller
      some are directly manipulating STATE,
      so that should be be calling controllers to change the model...
      most call controller-esq functions like setTunings
    Not so fast. Lately in reading, it's looking like the View "is" the UI
      so in Tania's MVC, listeners are defined in View, but pass their data to handlers from the Controller
      since you're querying the DOM here, would it really make sense to define them elsewhere?
    OR, maybe you're right after all.
      a) it's easy to attach to the View from the Controller,
      b) you're checking to model to change things conditionally
   */










  this._toggleVibrato.addEventListener('change', (e) => {
    this.changeEffectSetting(e)
  })
  this._toggleFilter.addEventListener('change', (e) => {
    this.changeEffectSetting(e)
  })



  this._vibratoRate.addEventListener('change', (e) => {
    this.changeEffectSetting(e)
  })
  this._filterRate.addEventListener('change', (e) => {
    this.changeEffectSetting(e)
  })
  this._vibratoDepth.addEventListener('change', (e) => {
    this.changeEffectSetting(e)
  })
  this._filterDepth.addEventListener('change', (e) => {
    this.changeEffectSetting(e)
  })





  this._riseMin.addEventListener('change', (e) => {
    this.changeTimingSettings(e)
  })
  this._riseMax.addEventListener('change', (e) => {
    this.changeTimingSettings(e)
  })
  this._fallMin.addEventListener('change', (e) => {
    this.changeTimingSettings(e)
  })
  this._fallMax.addEventListener('change', (e) => {
    this.changeTimingSettings(e)
  })
  this._restMin.addEventListener('change', (e) => {
    this.changeTimingSettings(e)
  })
  this._restMax.addEventListener('change', (e) => {
    this.changeTimingSettings(e)
  })



  // https://www.reddit.com/r/chrome/comments/ca8uxk/windowaddeventlistener_suddenly_not_working/
  window.addEventListener('keydown', function(e){
    // console.log('this', this, 'e', e)
    if (e.key===' ' && this._started) {
      e.preventDefault()
      this.stop()
    } else if (e.key===' ') {
      e.preventDefault()
      this.start()
    }
  }.bind(this)) // .bind and arrow functions both ok :)


} //*************************************************************************
