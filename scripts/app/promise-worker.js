//worker

define(["Promise"], function(Promise){

	/*
	// Testing web worker
    var expression = "2 * 4";

    var mycuteworker = new PromiseWorker();
    var cutepromise = mycuteworker.evaluate(expression);
    cutepromise.then(function(val) {
        alert("worker result: "+val);
    });
	*/

	function PromiseWorker() {

		//FIXME This will soon become unwieldy. Find a better way to do it.
		var workerCode = "onmessage = function(e) { "+
			"var result = eval(e.data);"+
			"postMessage(result);"+
		"};";

		var blob = new Blob([workerCode], {type: "application/javascript"});

		var mywebworker = new Worker(URL.createObjectURL(blob));

		return {
			evaluate: function(code) {
				return new Promise.Promise(function(resolve, reject) {
					var onSuccess = function(e) {
						resolve(e.data);
					};
					var onFailure = function(e) {
						reject(new Error("Something wrong with the worker."));
					}

					mywebworker.onmessage = onSuccess;
					mywebworker.onerror = onFailure;

					mywebworker.postMessage(code);
					//FIXME This only works for one promise per worker at a time.
						//Maybe I could include an identifier.
				});
			}
		};
	}

	return PromiseWorker;
});