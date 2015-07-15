//var canvas_dom = document.getElementById("canvas-div");
var canvas_dom = document;

var velocity = new THREE.Vector2();

var canvasHandleKeyboardDown = function (event) {
  var key = String.fromCharCode(event.keyCode);
  console.log("something"+key);
  if (key === "w" || key === "W") {
    velocity = velocity.add(new THREE.Vector2(-1, 0));
  }
  if (key === "s" || key === "S") {
    velocity = velocity.add(new THREE.Vector2(1, 0));
  }
  if (key === "a" || key === "A") {
    velocity = velocity.add(new THREE.Vector2(0, 1));
  }
  if (key === "d" || key === "D") {
    velocity = velocity.add(new THREE.Vector2(0, -1));
  }
  //velocity.normalize();
};

var canvasHandleKeyboardUp = function (event) {
  velocity = new THREE.Vector2();
};

canvas_dom.addEventListener("keydown", canvasHandleKeyboardDown);
canvas_dom.addEventListener("keyup", canvasHandleKeyboardUp);


var updateCamera = function(seconds) {
  var vel3 = new THREE.Vector4(velocity.x,0.0, velocity.y,0.0);
//   var cameraWorldInverse = view.camera.matrixWorldInverse;
//   var velWorld = vel3.clone().applyMatrix4(cameraWorldInverse);
//   var cameraPosDelta = velWorld.clone().multiplyScalar(seconds);
  var cameraPosDelta = vel3;
  view.camera.position.add(cameraPosDelta);
};

var myInterval = setInterval(function () { updateCamera(0.050); view.draw(); console.log(velocity); }, 50);