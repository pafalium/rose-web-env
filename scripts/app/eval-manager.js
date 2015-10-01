//eval-manager
/*global define, document*/
define(["app/old-evaluator"], function(Evaluator) {
	"use strict";

	function EvalManager(editor, view) {
		var _editor = editor;
		var _view = view;
		var _userInterface;/*Is inited in last line*/

		var evaluateProgram = function evaluateProgram() {
			var program = _editor.getValue();
			var evaluator = new Evaluator();
			var scene = evaluator.evaluate(program);
			_view.setScene(scene);
		};

		var setDelayedProgramEval = (function() {
			var evaluationScheduled = false;
			return function setDelayedProgramEval() {
				if (!evaluationScheduled) {
					evaluationScheduled = true;
					setTimeout(function() {
						evaluationScheduled = false;
						evaluateProgram();
					});
				}
			};
		})();

		var scheduleEvaluation = (function() {
			var programChanged = true;

			_editor.on("change", function() {
				programChanged = true;
			});

			return function() {
				if (programChanged) {
					programChanged = false;
					setDelayedProgramEval();
				}
			};
		})();

		var setupUserInterface = function setupUserInterface() {
			var runButton = button();
			var autoRunSwitch = switchOnOff();
			var managerControlsBar = (function() {
				var bar = horizontalBar([runButton, autoRunSwitch]);
				bar.domElement.classList.add("manager-controls");
				return bar;
			})();

			var automaticEvaluation;

			autoRunSwitch.on("on", function() {
				runButton.disable();
				automaticEvaluation.enable();
			});
			autoRunSwitch.on("off", function() {
				runButton.enable();
				automaticEvaluation.disable();
			});


			runButton.on("pressed", function() {
				scheduleEvaluation();
			});

			automaticEvaluation = (function() {

				var autoEnabled = true;

				_editor.on("change", function() {
					if (autoEnabled) {
						scheduleEvaluation();
					}
				});

				var enable = function() {
					autoEnabled = true;
				};

				var disable = function() {
					autoEnabled = false;
				};

				return {
					enable: enable,
					disable: disable
				};
			})();

			return {
				runButton: runButton,
				autoRunSwitch: autoRunSwitch,
				managerControlsBar: managerControlsBar
			};
		};

		_userInterface = setupUserInterface();
		this.userInterface = _userInterface;
	}

	function button() {

		var eventListeners = {
			"pressed": []
		};
		var on = function(eventType, callback) {
			eventListeners[eventType].push(callback);
		};
		var trigger = function(eventType) {
			eventListeners[eventType].forEach(function(callback) {
				callback();
			});
		};

		var enabled = true;
		var enable = function() {
			enabled = true;
			domElement.classList.add("enabled");
		};
		var disable = function() {
			enabled = false;
			domElement.classList.remove("disabled");
		};

		var onDomClick = function() {
			if (enabled) {
				trigger("pressed");
			}
		};

		var domElement = (function() {
			var button = document.createElement("button");
			var text = document.createTextNode("Button");
			button.appendChild(text);
			button.classList.add("enabled");
			button.addEventListener("click", onDomClick);
			return button;
		})();

		return {
			on: on,
			enable: enable,
			disable: disable,
			domElement: domElement
		};
	}


	function switchOnOff() {

		var eventListeners = {
			"on": [],
			"off": []
		};
		var on = function(eventType, callback) {
			eventListeners[eventType].push(callback);
		};
		var trigger = function(eventType) {
			eventListeners[eventType].forEach(function(callback) {
				callback();
			});
		};

		var isOn = true;
		var onDomClick = function() {
			isOn = !isOn;
			if (isOn) {
				trigger("on");
			} else {
				trigger("off");
			}
			domElement.classList.toggle("on");
		};

		var domElement = (function() {
			var box = document.createElement("div");
			var text = document.createTextNode("Switch");
			box.appendChild(text);
			box.classList.add("switch");
			box.addEventListener("click", onDomClick);
			return box;
		})();


		return {
			on: on,
			domElement: domElement
		};
	}

	function horizontalBar(uiList) {
		var box = document.createElement("div");
		box.classList.add("horizontal-bar");
		uiList.forEach(function(ui) {
			box.appendChild(ui.domElement);
		});
		return {
			domElement: box
		};
	}

	return function evalManager(editor, view) {
		return {
			on: function(domElement) {
				var manager = new EvalManager(editor, view);
				domElement.appendChild(manager.userInterface.managerControlsBar.domElement);
				return manager;
			}
		};
	};
});