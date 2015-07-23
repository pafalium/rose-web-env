//evaluation logic

define(["promise"], function(Promise) {
	
	/*
		This module will be responsible for the evaluation logic of the user's program.

		The current idea is to execute the program inside a Web Worker, ie in another thread, to avoid blocking the UI if the program takes too long to finish.
		For now it'll run the entire program until it finishes and then show the its results in a 3d view.

		A nice improvement would be to show the results as they are being generated. This will probably require that program to be modified in order to allow it.
		To control the execution of the program.
			- Use side-effectful operations to represent the results.
			- Convert the program to continuation-passing-style.

		- Define what the initial environment where the user's program is executed.
			- It will have at least 3d solids and 3d affine transformations.
		- 
	*/

	/*
		Types of evaluation
		From code editor to 3d view
			synchronous eval
			assynchronous eval using web worker
			synchronous incremental eval
			assynchronous incremental eval (does it make sense?)

		It should return a Promise as I am not sure if it will return the result immediatly or not.
		It must return a Promise.
		Synchronous versions return an already resolved Promise.
		Assynchronous versions return a Promise that will be resolved when the Web Worker finishes.
		
	*/

	function syncEval(program, environment) {
		
	}

});