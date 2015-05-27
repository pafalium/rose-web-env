/*
  Each backend must implement the following functions:
    *'view',
    *'*shape',
    *'augmentView',
    *'drawView'.
  The 'view' function returns a empty view that can already be draw by 'drawView'.
  The '*shape', where '*' is the name of the primitive shape, function returns a primitive shape.
  The 'augmentView' function augments the given view with the given shapes.
  The 'drawView' function draws the given view.
*/

/*
  __TODO__
    - Everything.
    - I would like to enforce that the view was a function of its current programResult and of the user input.
*/

/*
  __THREE.js backend__

  THREE.js backend's views have their shapes stored in a 'scene'. There is a default material.
  Its view also have a camera and are drawn on a canvas with a WebGLRenderer.


*/

/*
***************
  Backend use.
***************
*/

/*
_________________
__Alternative 1__
    - Each backend is responsible for building it's representation of the object hierarchy.
    - The backend user is responsible for issuing updates of the backend's views.
*/

// Create views
var view = backendTHREE.createView();

// Create and transform shapes.
var cylShape = backendTHREE.cylinderShape();
var sphereShape = backendTHREE.sphereShape();
sphereShape = backendTHREE.translate(1.0 ,5.0, 10.0);

// Add the shapes to the view.
view = backendTHREE.augmentView([cylShape, sphereShape]);

// Draw the view
backendTHREE.drawView(view);


/*
_________________
__Alternative 2__
  - Each backend is responsible for creating views/viewers.
  - Each backend is responsible for drawing an object hierarchy (program result) to one of their views.
*/

// Create program result
var programResult = intermediate.emptyResult();
var cylShape = intermediate.cylinderShape();
var shereShape = intermediate.translateShapeByXYZ(intermediate.sphereShape());
programResult = intermediate.combine([programResult, cylShape, sphereShape]);

// Create view
var view = backendTHREE.createView();

// Draw to the view
backendTHREE.drawResultOnView(programResult, view);
// Or, set the view's displayed result.
backendTHREE.setResultOfView(programResult, view);