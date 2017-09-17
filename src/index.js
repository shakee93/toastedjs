import {Toasted, Extender} from './js/toasted';

Toasted.extend = Extender;

// register plugin to window
if (typeof window !== 'undefined') {
	window.Toasted = Toasted;
}

export default Toasted