//view

define(["THREEView", "OrbitControls"], function(THREEView, OrbitControls) {
	
	var view = new THREEView(512,512);
	var controls = new OrbitControls(view.camera, view.domElement);

	return {
		"view": view,
		"controls": controls
	};
});