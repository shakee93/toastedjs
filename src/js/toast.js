import Hammer from 'hammerjs';
import {Extender} from './toasted';
import animations from './animations'

export const Toast = function (instance) {

	this.options = {};
	this.toast = null;

	this.create = (message, options) => {

		if(!message) {
			return;
		}

		options = this.setOptions(options);
		let container = this.getContainer();

		this.toast = document.createElement('div');
		this.toast.classList.add('toasted');

		// add classes
		if (options.className) {
			options.className.forEach((className) => {
				this.toast.classList.add(className);
			});
		}

		// add material icon if available
		if (options.icon) {

			let iel = document.createElement('i');
			iel.classList.add('material-icons');

			if (options.icon.after && options.icon.name) {
				iel.textContent = options.icon.name;
				iel.classList.add('after');
				message += iel.outerHTML
			}
			else if (options.icon.name) {
				iel.textContent = options.icon.name;
				message = iel.outerHTML + message
			}
			else {
				iel.textContent = options.icon;
				message = iel.outerHTML + message
			}

		}

		// Append the Message
		this.appendMessage(message);

		// add the touch events of the toast
		this.addTouchEvents();

		// create and append actions
		if (Array.isArray(options.action)) {
			options.action.forEach((action) => {
				let el = this.createAction(action);
				if (el) this.toast.appendChild(el)
			})
		}
		else if (typeof options.action === 'object') {
			let action = this.createAction(options.action);
			if (action) this.toast.appendChild(action)
		}

		// append the toasts
		container.appendChild(this.toast);

		// animate toast
		animations.animateIn(this.toast);

		// set its duration
		this.setDuration();

		return this;
	};

	this.appendMessage = (message) => {

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

	this.getContainer = () => {

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

	this.setOptions = (options) => {

		// class name to be added on the toast
		options.className = options.className || null;

		// complete call back of the toast
		options.onComplete = options.onComplete || null;

		// toast position
		options.position = options.position || "top-right";

		// toast duration
		options.duration = options.duration || null;

		// normal type will allow the basic color
		options.theme = options.theme || "primary";

		// normal type will allow the basic color
		options.type = options.type || "default";

		// class name to be added on the toast container
		options.containerClass = options.containerClass || null;

		// check if the fullWidth is enabled
		options.fullWidth = options.fullWidth || false;

		// get icon name
		options.icon = options.icon || null;

		// get action name
		options.action = options.action || null;

		// check if the toast needs to be fitted in the screen (no margin gap between screen)
		options.fitToScreen = options.fitToScreen || null;


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

		// add toasted container class
		options.containerClass.unshift('toasted-container');

		// HOOK : options
		if (Extender.verifyHook(Extender.hook.options)) {
			options = Extender.hook.options(options, this.options);
		}

		this.options = options;
	    return options;
	}

	this.addTouchEvents = () => {

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

		hammerHandler.on('panend', function (e) {
			let deltaX = e.deltaX;
			let activationDistance = 80;

			// If toast dragged past activation point
			if (Math.abs(deltaX) > activationDistance) {

				animations.animatePanEnd(toast, function () {
					if (typeof(options.onComplete) === "function") {
						options.onComplete();
					}

					if (toast.parentNode) {
						toast.parentNode.removeChild(toast);
					}
				})

			} else {
				toast.classList.remove('panning');
				// Put toast back into original position
				animations.animateReset(toast)

			}
		});

	}

	this.createAction  = (action) => {

		if (!action) {
			return null;
		}

		let el = document.createElement('a');
		el.classList.add('action');
		el.classList.add('ripple');

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
					action.onClick(e, toastObject)
				}

			})
		}

		// HOOK : action
		if (Extender.verifyHook(Extender.hook.action)) {
			Extender.hook.action(el, action, this, instance);
		}

		return el;

	}

	this.setDuration = () => {

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
						if (typeof(options.onComplete) === "function")
							options.onComplete();
						// Remove toast after it times out
						if (this.toast.parentNode) {
							this.toast.parentNode.removeChild(this.toast);
						}

					})

					window.clearInterval(counterInterval);
				}
			}, 20);
		}

	}

	this.text = (message) => {
		this.appendMessage(message);
		return this;
	}

	this.delete = (delay = 300) => {

		setTimeout(() => {
			animations.animateOut(this.toast, () => {
				if (this.toast.parentNode) this.toast.parentNode.removeChild(this.toast)
			})
		}, delay);

		return true;
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
	 * @param message
	 */
	this.changeText = (message) => {
	    return this.text(message)
	}

	/**
	 * @deprecated since 0.0.11
	 * @type {*}
	 */
	this.el = this.toast;

	return this;
};

export default Toast;