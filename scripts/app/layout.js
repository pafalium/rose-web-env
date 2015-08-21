//layout

define([], function() {
	
	/*
		The layout module will have things that help to layout the page.
	*/

	/*
	// To put inside the layout...
	//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
	//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
	// In the end it will generate DOM elements.

	function Columns(columns) {
		//Columns: layout elements to be displayed side-by-side
		return "place to add smart implementation";
	}

	return Columns([view, editor]);
	//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
	//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
	*/

	/*
		Responsability: Say where the editor and where the view are.
	*/

	/*
		2d Element theory
		- There are Elements and Spaces.
		- Elements are Rectangles.
		- Spaces are two dimensional spaces.
		- Rectangles are specified relative to a Space and have a Size.
		- Spaces are specified relative to other Spaces.
	*/

	function Rectangle() {
		this.space = 
		this.toUpperLeft = 
		this.toLowerRight = 
	}

	function Space() {
		this.parent
		this.fromParentToThis
		this.fromThisToParent
	}

	/*
		Layout
		- There are Components and Anchors.
		- Components represent a visual element of the page.
		- Anchors represent places where visual elements can be placed.
		- Components can provide a set of anchors to be used by others.
		- Components don't directly control their position and size.
		- Anchors define the position and size of a Component.
		- Components may change the size and position of their Anchors.
		- Components' position and size can change "as time passes".
		- Components may be notified when their position or size changes.
	*/

	function Component() {
		this.parent
		this.anchor
		this.content

		this.anchors 
		this.children
	}

	function Anchor() {
		this.position
		this.size

		this.domElement
	}

	//
	// Generic Components
	//
	function VerticalSplit(children) {
		this.children = 
	}

	//
	// layout.document
	//

	var theDocument = document;
	var documentAnchor = { 
		get size () {
			return { 
				width: unlimited, 
				height: unlimited
			};
		},
		get position () {
			return Space2D.Origin;
		},

		swapLayoutWith: function(component) {
			oldComponent.raise("detached");

		}
	};

	//
	// layout exports
	//

	return {
		document: documentAnchor

	};

/*
	var pageLayout = new layout.VerticalSplit([myview, myeditor]);

	//layout.document is a layout component that represents the document.
	//layout.document can't be used as a layout component.
	//layout.document appears to be just an anchor, a place where we can put components.
	//layout.document.swapLayoutWith(pageLayout);
	//pageLayout.attachTo(document);
	//This line would imply that 
	//	pageLayout gets to know its size and position
	//	pageLayout would compute the new anchors for its children
	//	pageLayout would let its children know their new anchors
	//  	myview would create a canvas that fits the anchor
	//		myeditor would call ace.edit on the dom element of the anchor
	//Since the document is unlimited, it is wiser to "use" the window instead.
	layout.window.swapLayoutWith(pageLayout);
*/
});
