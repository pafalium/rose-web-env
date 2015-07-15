
/*
You can share geometry along different Scenes.
You can't share meshes along different Scenes.
You can't share geometry/meshes/scenes along different Renderers (yet).
*/

var scene = null;
var camera = null;
var renderer = null;

function createView() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70.0/*degrees*/, 800.0/600.0/*width/height*/,0.1/*near*/, 1000.0/*far*/);
  renderer = new THREE.WebGLRenderer();
}

function draw() {
  renderer.render(scene, camera);
}

function setResult(result) {
  destroyScene();
  scene = processResult(result);
}

function destroyScene() {
  //TODO cleanup geometries if needed
}

function processResult(result) {
  //TODO process result tree
}



function cylinderMesh(radius, height) {
  var material = defaultSolidMaterial();
  var geometry = new THREE.CylinderGeometry(radius, radius, 16, 1);
  var mesh = new THREE.Mesh( geometry, material );
  return mesh;
}

function sphereMesh(radius) {
  var material = defaultSolidMaterial();
  var geometry = new THREE.SphereGeometry(radius, 32, 24);
  var mesh = new THREE.Mesh( geometry, material );
  return mesh;
}

function boxMesh(width, height, depth) {
  var material = defaultSolidMaterial();
  var geometry = new THREE.BoxGeometry(width, height, depth);
  var mesh = new THREE.Mesh( geometry, material );
  return mesh;
}

function solidSweepMesh(shape, path) {
  var material = defaultSolidMaterial();
  var geometry = new THREE.ExtrudeGeometry(shape, {extrudePath: path});
  var mesh = new THREE.Mesh( geometry, material );
  return mesh;
}



function defaultSolidMaterial() {
  return new THREE.MeshLambertMaterial();
}
