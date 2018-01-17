import Hammer from 'hammerjs';
import {Extender} from './toasted';
import animations from './animations'
const uuid = require('shortid');

export const Toast = function (instance) {

	/**
	 * Compiled options of the toast
	 */
	this.options = {};


	/**
	 * Unique id for the toast
	 */
	this.id = uuid.generate();


	/**
	 * Toast Html Element
	 *
	 * @type {null|Element}
	 */
	this.toast = null;


	/**
	 * Check if Initialized the toast
	 *
	 * @type {boolean}
	 */
	let initialized = false;


	let constructor = () => {
		instance.toasts.push(this);
	};
	constructor();


	/**
	 * Create Toast
	 *
	 * @param message
	 * @param options
	 * @returns {Toast}
	 */
	this.create = (message, options) => {

		if(!message || initialized) {
			return;
		}

		options = setOptions(options);
		let container = getContainer();

		this.toast = document.createElement('div');
		this.toast.classList.add('toasted');

		// add classes
		if (options.className) {
			options.className.forEach((className) => {
				this.toast.classList.add(className);
			});
		}



		// Append the Message
		appendMessage(message);

		// add the touch events of the toast
		addTouchEvents();


		// add material icon if available
		createIcon();

		// append the actions
		appendActions();

		// append the toasts
		container.appendChild(this.toast);

		// animate toast
		animations.animateIn(this.toast);

		// set its duration
		setDuration();

		// TODO : remove this later, this is here to backward compatibility
		this.el = this.toast;

		// Let Instance know the toast is initialized
		initialized = true;

		return this;
	};

	/**
	 * Append Message to the Toast
	 *
	 * @param message
	 */
	let appendMessage = (message) => {

		if(!message) {
			return;
		}

		// If type of parameter is HTML Element
		if (typeof HTMLElement === "object" ? message instanceof HTMLElement : message && typeof message === "object" && message !== null && message.nodeType === 1 && typeof message.nodeName === "string") {
			this.toast.appendChild(message);
		}
		else {
			// Insert as text;
			this.toast.innerHTML = message;
		}

	}


	/**
	 * Get the Toast Container
	 *
	 * @returns {Element}
	 */
	let getContainer = () => {

		let container = document.getElementById(instance.id);

		if(container === null) {
			container = document.createElement('div');
			container.id = instance.id;
			document.body.appendChild(container);
		}

		// check if the container classes has changed if so update it
		if (container.className !== this.options.containerClass.join(' ')) {
			container.className = "";
			this.options.containerClass.forEach((className) => {
				container.classList.add(className);
			});
		}

		return container;
	}


	/**
	 * Parse and Set Toast Options
	 *
	 * @param options
	 * @returns {*}
	 */
	let setOptions = (options) => {

		// toast position
		options.position = options.position || "top-right";

		// toast duration
		options.duration = options.duration || null;

		// get action name
		options.action = options.action || null;

		// check if the fullWidth is enabled
		options.fullWidth = options.fullWidth || false;

		// check if the toast needs to be fitted in the screen (no margin gap between screen)
		options.fitToScreen = options.fitToScreen || null;

		// class name to be added on the toast
		options.className = options.className || null;

		// class name to be added on the toast container
		options.containerClass = options.containerClass || null;

		// get icon name
		options.icon = options.icon || null;

		// normal type will allow the basic color
		options.type = options.type || "default";

		// normal type will allow the basic color
		options.theme = options.theme || "material";

		// normal type will allow the basic color
		options.color = options.color || null;

		// get icon color
		options.iconColor = options.iconColor || null;

		// complete call back of the toast
		options.onComplete = options.onComplete || null;

		// TODO : closeOnSwipe, singleton, iconPack

		/* transform options */

		// toast class
		if (options.className && typeof(options.className) === "string") {
			options.className = options.className.split(' ');
		}

		if (!options.className) {
			options.className = [];
		}

		(options.theme) && options.className.push(options.theme.trim());
		(options.type) && options.className.push(options.type);


		// toast container class
		if (options.containerClass && typeof(options.containerClass) === "string") {
			options.containerClass = options.containerClass.split(' ');
		}

		if (!options.containerClass) {
			options.containerClass = [];
		}

		(options.position) && options.containerClass.push(options.position.trim());
		(options.fullWidth) && options.containerClass.push('full-width');
		(options.fitToScreen) && options.containerClass.push('fit-to-screen');

		// add toasted container class to top
		options.containerClass.unshift('toasted-container');

		// HOOK : options
		Extender.run("options", hook => hook(options, this.options))

		this.options = options;
	    return options;
	}


	/**
	 * Add Hammer Touch events to the Toast
	 */
	let addTouchEvents = () => {

		let toast = this.toast;

		// Bind hammer
		let hammerHandler = new Hammer(toast, {prevent_default: false});
		hammerHandler.on('pan', function (e) {
			let deltaX = e.deltaX;
			let activationDistance = 80;

			// Change toast state
			if (!toast.classList.contains('panning')) {
				toast.classList.add('panning');
			}

			let opacityPercent = 1 - Math.abs(deltaX / activationDistance);
			if (opacityPercent < 0)
				opacityPercent = 0;

			animations.animatePanning(toast, deltaX, opacityPercent)

		});

		hammerHandler.on('panend', (e)  =>{
			let deltaX = e.deltaX;
			let activationDistance = 80;

			// If toast dragged past activation point
			if (Math.abs(deltaX) > activationDistance) {

				animations.animatePanEnd(toast, () => {
					if (typeof(this.options.onComplete) === "function") {
						this.options.onComplete();
					}

					this.destroy();
				})

			} else {
				toast.classList.remove('panning');
				// Put toast back into original position
				animations.animateReset(toast)

			}
		});

	}


	let createIcon = () => {

		let options = this.options;

		// add material icon if available
		if (options.icon) {

			let iel = document.createElement('i');
			iel.classList.add('material-icons');

			// add color to the icon. priority : icon.color > option.color > theme
			iel.style.color = (options.icon.color) ? options.icon.color : options.color;

			if (options.icon.after && options.icon.name) {
				iel.textContent = options.icon.name;
				iel.classList.add('after');
				this.toast.appendChild(iel);
			}
			else if (options.icon.name) {
				iel.textContent = options.icon.name;
				this.toast.insertBefore(iel, this.toast.firstChild);
			}
			else {
				iel.textContent = options.icon;
				this.toast.insertBefore(iel, this.toast.firstChild);
			}

		}

	}

	/**
	 * Create Actions to the toast
	 *
	 * @param action
	 * @returns {*}
	 */
	let createAction  = (action) => {

		if (!action) {
			return null;
		}

		let el = document.createElement('a');

		// add color to icon
		el.style.color = (action.color) ? action.color : this.options.color;

		el.classList.add('action');

		if (action.text) {
			el.text = action.text
		}

		if (action.href) {
			el.href = action.href
		}

		if (action.icon) {

			// add icon class to style it
			el.classList.add('icon');

			// create icon element
			let iel = document.createElement('i');
			iel.classList.add('material-icons');
			iel.textContent = action.icon

			// append it to the button
			el.appendChild(iel);
		}

		if (action.class) {

			switch (typeof action.class) {
				case 'string' :
					action.class.split(' ').forEach((className) => {
						el.classList.add(className)
					})
					break;
				case 'array' :
					action.class.forEach((className) => {
						el.classList.add(className)
					})
			}
		}

		if (action.onClick && typeof action.onClick === 'function') {
			el.addEventListener('click', (e) => {

				if (action.onClick) {
					e.preventDefault()
					action.onClick(e, this)
				}

			})
		}

		// HOOK : actions
		Extender.run("actions", hook => hook(el, action, this, instance))

		return el;

	}


	/**
	 * Append actions to the toast
	 */
	let appendActions = () => {

		let options = this.options;
		let hasActions = false;

		let actionWrapper = document.createElement('span');
		actionWrapper.classList.add('actions-wrapper');

		// create and append actions
		if (Array.isArray(options.action)) {
			options.action.forEach((action) => {
				let el = createAction(action);
				if (el) {
					actionWrapper.appendChild(el);
					hasActions = true;
				}
			})
		}
		else if (typeof options.action === 'object') {
			let action = createAction(options.action);
			if (action) {
				actionWrapper.appendChild(action);
				hasActions = true
			}
		}

		if(hasActions) this.toast.appendChild(actionWrapper);
	}

	/**
	 * Set Toast duration to fade away
	 */
	let setDuration = () => {

		// Allows timer to be pause while being panned
		let timeLeft = this.options.duration;
		let counterInterval;
		if (timeLeft !== null) {
			counterInterval = setInterval(() => {
				if (this.toast.parentNode === null)
					window.clearInterval(counterInterval);

				// If toast is not being dragged, decrease its time remaining
				if (!this.toast.classList.contains('panning')) {
					timeLeft -= 20;
				}

				if (timeLeft <= 0) {
					// Animate toast out

					animations.animateOut(this.toast, () => {
						// Call the optional callback
						if (typeof(this.options.onComplete) === "function")
							this.options.onComplete();

						// Remove toast after it times out
						this.destroy();

					})

					window.clearInterval(counterInterval);
				}
			}, 20);
		}

	}

	/**
	 * Change Text of the Toast
	 *
	 * @param message
	 * @returns {Toast}
	 */
	this.text = (message) => {
		appendMessage(message);
		return this;
	}

	/**
	 * Delete the Toast with Animation and Delay
	 *
	 * @param delay
	 * @returns {boolean}
	 */
	this.delete = (delay = 300) => {

		setTimeout(() => {
			animations.animateOut(this.toast, () => {
				this.destroy();
			})
		}, delay);

		return true;
	}

	/**
	 * Destroy the Toast and Unregister from Instance
	 */
	this.destroy = () => {

		instance.toasts = instance.toasts.filter((t) => {
			return t.id !== this.id;
		})

		if (this.toast.parentNode) this.toast.parentNode.removeChild(this.toast)
	}

	/**
	 * @deprecated since 0.0.11
	 * @param delay
	 */
	this.goAway = (delay) => {
		return this.delete(delay);
	}


	/**
	 * @deprecated since 0.0.11
	 * @type {*}
	 */
	this.el = this.toast;


	return this;
};

export default Toast;