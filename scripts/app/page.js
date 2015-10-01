//page

define(["app/editor", "app/view", "app/eval-manager"], function(editor, view, evalManager) {
	"use strict";

	var myeditor = editor().on(document.getElementById("editor-div"));
	var myview = view().on(document.getElementById("results-div"));
	var myevalmanager = evalManager(myeditor, myview).on(document.getElementById("manager-div"));

	myeditor.setTheme("ace/theme/monokai");
	myeditor.getSession().setMode("ace/mode/javascript");

	return {
		view: myview,
		editor: myeditor,
		manager: myevalmanager
	};
});