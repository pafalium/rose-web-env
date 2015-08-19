//page

define(["app/editor", "app/view"], function(editor, view) {
	
	var myeditor = editor.edit(document.getElementById("editor-div"));
	var myview = view.on(document.getElementById("results-div"));

	return {
		view: myview,
		editor: myeditor
	};
});