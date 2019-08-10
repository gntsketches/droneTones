
DroneTones.SynthSetup = {

  createSelector(interval, addInterval) {
    if (DroneTones._intervalChooser.children.length >= 8)
    { return }
    const select = document.createElement('select')
    DroneTones.constants.selectOptions.forEach((opt) => {
      const option = document.createElement('option')
      option.text = opt
      select.appendChild(option)
    })
    select.value = interval
    select.addEventListener('change', (e) => {
      const intervalSelectors = [].slice.call(DroneTones._intervalChooser.children)
      const index = intervalSelectors.indexOf(e.target)
      DroneTones._intervals[index] = e.target.value
    })
    DroneTones._intervalChooser.appendChild(select)
    if (addInterval) {
      DroneTones._intervals.push(interval)
      // can add selectors while playing
      DroneTones.addSynth()
    }
    // console.log(DroneTones._intervals)
  },

  removeSelector() {
    if (DroneTones._intervalChooser.children.length > 1) {
      DroneTones._intervalChooser.removeChild(DroneTones._intervalChooser.lastChild)
      DroneTones._intervals.pop()
      // console.log(DroneTones._intervals)
      DroneTones.popSynth()
    }
  },

  setUpSynths() {
    DroneTones._synths = []
    for (let i=0; i < DroneTones._intervals.length; i++) {
      DroneTones.addSynth()
    }
  },

  init() {

    DroneTones._intervals.forEach((interval) => {
      this.createSelector(interval)
    })

    DroneTones._intervalAddButton.addEventListener('click', () => {
      this.createSelector('Rest', true)
    })

    DroneTones._intervalRemoveButton.addEventListener('click', () => {
      this.removeSelector()
    })

  }
}