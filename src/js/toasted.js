import Toast from './toast';
const uuid = require('shortid');
import animations from './animations';

// add Object.assign Polyfill
require('es6-object-assign').polyfill();

/**
 * Allows Toasted to be Extended
 *
 */
export const Extender = function () {

	return {
		hook: {
			options : [],
			actions : []
		},
		run : function(name, callback) {

			if(!Array.isArray(this.hook[name])) {
				console.warn("[toasted] : hook not found");
				return;
			}

			this.hook[name].forEach((hook) => {

				// check if it is a function
				if(!hook && typeof hook !== 'function') return;

				callback && callback(hook);
			})
		},
		utils : {
			warn : (message) => {
				console.warn(`[toasted] : ${message}`);
			}
		}
	}
}();

/**
 * Toast
 * core instance of toast
 *
 * @param _options
 * @returns {Toasted}
 * @constructor
 */
export const Toasted = function (_options) {

	if (!_options) _options = {};

	/**
	 * Unique id of the toast
	 */
	this.id = uuid.generate();

	/**
	 * Shared Options of the Toast
	 */
	this.options = _options;


	/**
	 * Shared Toasts list
	 */
	this.global = {};


	/**
	 * All Registered Groups
	 */
	this.groups = [];


	/**
	 * All Registered Toasts
	 */
	this.toasts = [];


	/**
	 * Create New Group of Toasts
	 *
	 * @param o
	 */
	this.group = (o) => {

		if (!o) o = {};

		if (!o.globalToasts) {
			o.globalToasts = {};
		}

		// share parents global toasts
		Object.assign(o.globalToasts, this.global);

		// tell parent about the group
		let group = new Toasted(o);
		this.groups.push(group);

		return group;
	}

	/**
	 * Base Toast Show Function
	 *
	 * @param message
	 * @param options
	 * @returns {*}
	 * @private
	 */
	let _show = (message, options) => {

		// clone the global options
		let _options = Object.assign({}, this.options);

		// merge the cached global options with options
		Object.assign(_options, options);

		let toast = new Toast(this);
		return toast.create(message, _options);
	}

	/**
	 *
	 */
	let initiateCustomToasts = () => {

		let customToasts = this.options.globalToasts;

		// this will initiate toast for the custom toast.
		let initiate = (message, options) => {

			// check if passed option is a available method if so call it.
			if (typeof(options) === 'string' && this[options]) {
				return this[options].apply(this, [message, {}]);
			}

			// or else create a new toast with passed options.
			return _show(message, options);
		};

		if (customToasts) {

			this.global = {};

			Object.keys(customToasts).forEach(key => {

				// register the custom toast events to the Toast.custom property
				this.global[key] = (payload = {}) => {

					// return the it in order to expose the Toast methods
					return customToasts[key].apply(null, [payload, initiate]);
				};
			});

		}
	};


	/**
	 * Register a Global Toast
	 *
	 * @param name
	 * @param message
	 * @param options
	 */
	this.register = (name, message, options) => {
		options = options || {};

		(!this.options.globalToasts) ? this.options.globalToasts = {} : null;

		this.options.globalToasts[name] = function (payload, initiate) {

			if (typeof message === 'function') {
				message = message(payload);
			}

			return initiate(message, options);
		};

		initiateCustomToasts();
	}


	/**
	 * Show a Simple Toast
	 *
	 * @param message
	 * @param options
	 * @returns {*}
	 */
	this.show = (message, options) => {
		return _show(message, options);
	}


	/**
	 * Show a Toast with Success Style
	 *
	 * @param message
	 * @param options
	 * @returns {*}
	 */
	this.success = (message, options) => {
		options = options || {};
		options.type = "success";
		return _show(message, options);
	}


	/**
	 * Show a Toast with Info Style
	 *
	 * @param message
	 * @param options
	 * @returns {*}
	 */
	this.info = (message, options) => {
		options = options || {};
		options.type = "info";
		return _show(message, options);
	}


	/**
	 * Show a Toast with Error Style
	 *
	 * @param message
	 * @param options
	 * @returns {*}
	 */
	this.error = (message, options) => {
		options = options || {};
		options.type = "error";
		return _show(message, options);
	}


	/**
	 * Clear All Toasts
	 *
	 * @returns {boolean}
	 */
	this.clear = () => {

		let toasts = this.toasts;
		let last = toasts.slice(-1)[0];

		// start vanishing from the bottom if toasts are on top
		if(last && last.options.position.includes('top')) {
			toasts = toasts.reverse();
		}

		animations.clearAnimation(toasts);
		this.toasts = [];
	}

	/**
	 * Initiate custom toasts
	 */
	initiateCustomToasts();

	return this;
};

export default {Toasted, Extender};