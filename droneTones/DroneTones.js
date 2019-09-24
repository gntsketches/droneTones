



// CONTROLLER

// CONTROLLER
	// change model


// CONTROLLER



// CONTROLLER
DroneTones.changeTimingSettings = function(e) {
	const timingEl = e.target.name
	console.log(timingEl);

	this._timing[timingEl] = parseFloat(e.target.value)
	console.log(this._timing)

	// EACH HAS A change model AND A change view
	if (timingEl==='riseMin' && this._timing['riseMin'] > this._timing['riseMax']) {
		this._timing['riseMax'] = this._timing['riseMin']
		this._riseMax.value = this._timing.riseMax
	}
	if (timingEl==='riseMax' && this._timing['riseMax'] < this._timing['riseMin']) {
		this._timing['riseMin'] = this._timing['riseMax']
		this._riseMin.value = this._timing.riseMin
	}
	if (timingEl==='fallMin' && this._timing['fallMin'] > this._timing['fallMax']) {
		this._timing['fallMax'] = this._timing['fallMin']
		this._fallMax.value = this._timing.fallMax
	}
	if (timingEl==='fallMax' && this._timing['fallMax'] < this._timing['fallMin']) {
		this._timing['fallMin'] = this._timing['fallMax']
		this._fallMin.value = this._timing.fallMin
	}
	if (timingEl==='restMin' && this._timing['restMin'] > this._timing['restMax']) {
		this._timing['restMax'] = this._timing['restMin']
		this._restMax.value = this._timing.restMax
	}
	if (timingEl==='restMax' && this._timing['restMax'] < this._timing['restMin']) {
		this._timing['restMin'] = this._timing['restMax']
		this._restMin.value = this._timing.restMin
	}

} // *****************************************************************************
