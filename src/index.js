import {Toasted, Extender} from './js/toasted';

Toasted.extend = Extender.hook;
Toasted.utils = Extender.utils;

(function (root, factory) {
	if(typeof define === "function" && define.amd) {
		define([], function(){
			return (root.Toasted = factory());
		});
	} else if(typeof module === "object" && module.exports) {
		module.exports = (root.Toasted = factory());
	} else {
		root.Toasted = factory();
	}
}(window, function() {
	return Toasted;
}));

export default Toasted