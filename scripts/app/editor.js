//editor

define(["ace/ace"], function(ace) {
	"use strict";
	
	/*
		This module is supposed to encapsulate the code editor.
		For now I'll use the Ace editor as it is.
		When I need more specific functionality I'll add it.
	*/

	//FIXME: Ace needs a DOMElement to create a new editor but I don't know which yet...
	//TODO Make a constructor function for editor instead of returning ace.
	return function editor() {
		return {
			on: function(domElement) {
				return ace.edit(domElement);
			}
		};
	};

});