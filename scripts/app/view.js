//view

define(["THREEView", "OrbitControls"], function(THREEView, OrbitControls) {

	function View(domElement) {
		//
		// Rendering and control setup
		//
		var view = new THREEView(domElement.clientWidth, domElement.clientHeight);
		domElement.appendChild(view.domElement);

		var controls = new OrbitControls(view.camera, view.domElement);


		//
		// Redraw setup
		//
		var redraw = (function () {
			var waitingForDraw = false;
			return function redraw() {
				if(!waitingForDraw) {
					var waitingForDraw = true;
					requestAnimationFrame(function(){
						view.draw();
						waitingForDraw = false;
					});
				}
			};
		})();

		controls.addEventListener('change', redraw);

		window.addEventListener('resize', function() {
			view.resize(domElement.clientWidth, domElement.clientHeight);
			redraw();
		});

		redraw();

		//
		// Scene displaying
		//
		var showScene = function showScene(scene) {

		};
		var helperScene = (function () {

		});

		return {
			//get domElement () {
			//	return view.domElement;
			//},
			//get controls () {
			//	// Added to make it possible to update the view from the outside.
			//	return controls;
			//},
			//draw: function () {
			//	view.draw();
			//}
		};
	}

	return {
		on: function(domElement) {
			return new View(domElement);
		}
	};
});