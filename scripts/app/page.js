//page

define(["app/layout", "app/editor", "app/view"], function(layout, editor, view) {

	//TODO Use layout module to layout the page.
		//TODO Tell the view how big it is.
		//TODO Tell the editor how big it is.
	//TODO Create the elements dynamically.
	var myview = new view();
	var myDiv = document.getElementById("canvas-div");
	myDiv.appendChild(myview.domElement);
	
	var myeditor = editor.edit("editor-div");

	return {
		view: myview,
		editor: myeditor
	};
});