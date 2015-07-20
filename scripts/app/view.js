//view

define(["THREEView", "OrbitControls"], function(THREEView, OrbitControls) {

	function View() {
		var view = new THREEView(512,512);
		var controls = new OrbitControls(view.camera, view.domElement);

		return {
			get domElement () {
				return view.domElement;
			},
			get controls () {
				// Added to make it possible to update the view from the outside.
				return controls;
			},
			draw: function () {
				view.draw();
			}
		};
	}

	return View;
});