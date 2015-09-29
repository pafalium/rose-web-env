"use strict";

var workerSideEvalProgram = function(program) {
	var cylinder = function(radius, height) {
		return ["cylinder", radius, height];
	};
	var sphere = function(radius) {
		return ["sphere", radius];
	};
	var empty = function() {
		return ["empty"];
	};
	var group = function() {
		return ["group"].concat([].slice.call(arguments));
	};
	var move = function(obj, x, y, z) {
		return ["move", obj, x, y, z];
	};

	return eval(program);
};


// Worker-side message handler
onmessage = function(e) {
	var time = performance.now();
	var programResult = workerSideEvalProgram(e.data);
	console.log("received program from main thread. "+ "time: "+(performance.now()-time)/1000);
	postMessage(programResult);
};