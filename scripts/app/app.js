
//
// Evaluation
//

function callMethodOnView (method, view) {//aka bind function to object
    return (function () {
        return method.apply(view, arguments);
    });
}
function evalProgramOnView( program, view ) {
    var cylinder = callMethodOnView(view.addCylinder, view);
    var cone_frustum = callMethodOnView(view.addConeFrustum, view);
    var sphere = callMethodOnView(view.addSphere, view);
    var box = callMethodOnView(view.addBox, view);
    var parametric_surface = callMethodOnView(view.addParametricSurface, view);
    var empty = callMethodOnView(view.addEmpty, view);
    var group = (function () {
        var empty = view.addEmpty();
        for (var i=0; i<arguments.length; i++) {
            view.setObjectParentToObject(arguments[i], empty);
        }
        return empty;
    });
    var xyz = (function ( x, y, z ) { return new THREE.Vector3( x, y, z );});
    var move = callMethodOnView(view.translateObjectByXYZ, view);
    var scale = callMethodOnView(view.scaleObjectByXYZ, view);
    var rotate = callMethodOnView(view.rotateObjectByAxisAngle, view);
    var direction_from_to = function ( p0, p1 ) {
        return p1.clone().sub( p0 ).normalize();
    };
    var point_distance = function ( p0, p1 ) {
        return p1.clone().sub( p0 ).length();
    };
    var add = function ( v0, v1 ) {
        return v0.clone().add( v1 );
    };
    var cross = function ( v0, v1 ) {
        return v0.clone().cross( v1 );
    };
    var dot = function ( v0, v1 ) {
        return v0.dot( v1 );
    };
    var linear_interpolation = function ( p0, p1, t ) {
        return p0.clone().lerp( p1, t );
    };
    eval(program);
}

function isProgramSafe( program ) {
    var cylinder = function () { return "cylinder"; };
    var cone_frustum = function () { return "cone_frustum"; };
    var sphere = function () { return "sphere"; };
    var box = function () { return "box"; };
    var parametric_surface = function () { return "parametric_surface"; };
    var empty = function () { return "empty"; };
    var group = (function () {
        var array = [];
        for (var i=0; i<arguments.length; i++) {
            array.push(arguments[i]);
        }
        return array;
    });
    var xyz = function () { return "xyz"; };
    var move = function (obj) { return "move <- "+obj; };
    var scale = function (obj) { return "scale <- "+obj; };
    var rotate = function (obj) { return "rotate <- "+obj; };
    var direction_from_to = function ( p0, p1 ) {
        return "v_from_to";
    };
    var point_distance = function ( p0, p1 ) {
        return "d_from_to";
    };
    var add = function ( v0, v1 ) {
        return "add";
    };
    var cross = function ( v0, v1 ) {
        return "cross";
    };
    var dot = function ( v0, v1 ) {
        return "dot";
    };
    var linear_interpolation = function ( p0, p1, t ) {
        return "lerp";
    };
    var programIsSafe = true;
    try {
        eval(program);
    } catch (err) {
        programIsSafe = false;
        console.log("Somehow the program is not safe.");
        console.log("Printing error.");
        console.log(err);
    }
    return programIsSafe;
}


//
// Setup
//

// Get the page's dimensions.
var pagDims = {width: window.innerWidth, height: window.innerHeight};
// Create and show view.
var view = new THREEView(pagDims.width/2, pagDims.height);
document.getElementById("canvas-div").appendChild( view.domElement() );

// Setup view refreshing.
var sceneChanged = true;
var animationHandler = function animationHandler() {
    if(sceneChanged) {
        sceneChanged = false;
        view.draw();
    }
    window.requestAnimationFrame(animationHandler);
};
animationHandler();

// Setup editor.
var editor = ace.edit("editor-div");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");

// Setup evaluation.
var reEvaluateProgram = function () {
    var program = editor.getValue();
    //var shouldEvalProgram = isProgramSafe(program);
    var shouldEvalProgram = true;
    if (shouldEvalProgram) {
        view.clearScene();
        evalProgramOnView(program, view);
        sceneChanged = true;
    }
};
reEvaluateProgram();

// Setup eval button.
var evalButton = document.getElementById("eval-button");
evalButton.addEventListener("click", reEvaluateProgram);

// Setup auto-eval on editor change.
editor.on("change", reEvaluateProgram);

// Setup camera manipulation.
var cameraControl = new THREE.OrbitControls( view.camera, view.domElement );
cameraControl.damping = 0.2;
cameraControl.addEventListener( 'change', function() { 
    sceneChanged = true; 
} );

