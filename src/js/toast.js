
export const Toast = function (instance) {

	this.create = (message, options) => {

		let container = this.getContainer();

	};

	this.getContainer = () => {

		let container = document.getElementById(instance.id);

		if(container === null) {
			container = document.createElement('div');
			container.id = instance.id;
		}

		return container;
	}

	this.sanitizeOptions = (options) => {

	    return options;
	}

	this.addTouchEvents = () => {

	}

	this.createAction  = () => {

	}

	return this;
};