//page

define(["app/editor", "app/view"], function(editor, view) {
	
	var myeditor = editor.edit(document.getElementById("editor-div"));
	var myview = view.on(document.getElementById("results-div"));

	myeditor.setTheme("ace/theme/monokai");
    myeditor.getSession().setMode("ace/mode/javascript");

	return {
		view: myview,
		editor: myeditor
	};
});