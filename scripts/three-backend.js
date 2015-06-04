
/*
You can share geometry along different Scenes.
You can't share meshes along different Scenes.
You can't share geometry/meshes/scenes along different Renderers (yet).
*/


/*
***********
  TODO
***********
  Add a function that is called to cleanup memory when the view is no longer needed, i.e. call dispose of all geometries created/owned by the view.
  Change the clearScene function to actually cleanup the scene instead of replacing it.
*/

function THREEView ( width, height ) {

  /*
  ***********
    View initialization.
  ***********
  */
  this.scene = new THREE.Scene();

  this.helperScene = new THREE.Scene();
    var axisHelper = new THREE.AxisHelper( 5 );
    this.helperScene.add( axisHelper );
    var gridHelper = new THREE.GridHelper( 30, 1 );
    gridHelper.setColors( 0x888888, 0x444444 );
    this.helperScene.add( gridHelper );
    var sunLight = new THREE.DirectionalLight( 0xFFEEA3, 0.8 );
    sunLight.position.set( 1, 10, -3 );
    this.helperScene.add( sunLight );
    var hemiLight = new THREE.HemisphereLight( 0x67D5EB, 0xA9C0C4, 0.2 );
    this.helperScene.add( hemiLight );

  this.combinedScene = new THREE.Scene();
    this.combinedScene.add( this.scene, this.helperScene );

  this.camera = new THREE.PerspectiveCamera( 70.0/*degrees*/, width/height/*width/height*/,0.1/*near*/, 1000.0/*far*/ );
    this.camera.position.set( 20, 20, 20);
    this.camera.lookAt ( new THREE.Vector3( 0, 0, 0 ) );

  this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( width, height );

  /*
  ***********
    Drawing and DOM functions
  ***********
  */

  this.draw = function () {
    this.renderer.render( this.combinedScene, this.camera );
  };

  this.domElement = function () {
    return this.renderer.domElement;
  };


  /*
  ***********
    Adders
  ***********
    All adders return the created object in order to change it's parent, move, turn invisible, ...
    All objects returned by adders are put into the view's scene.
  */
  this.addCylinder = function () {
      var geometry = new THREE.CylinderGeometry( 1/*r*/, 1/*r*/, 1/*h*/, 16, 1 );
      return function ( radius, height ) {
      var material = this.defaultSolidMaterial();
      var mesh = new THREE.Mesh( geometry, material );
      this.scaleObjectByXYZ( mesh, radius, height, radius );
      this.addObjectToScene( mesh );
      return mesh;
    }
  }();

  this.addConeFrustum = function ( baseRadius, height, topRadius ) {
    var material = this.defaultSolidMaterial();
    var geometry = new THREE.CylinderGeometry( topRadius, baseRadius, height, 16, 1 );
    var mesh = new THREE.Mesh( geometry, material );
    this.addObjectToScene( mesh );
    return mesh;
  };

  this.addSphere = function() {
    var geometry = new THREE.SphereGeometry( 1, 32, 24 ); 
    return function ( radius ) {
      var material = this.defaultSolidMaterial();
      var mesh = new THREE.Mesh( geometry, material );
      this.scaleObjectByXYZ( mesh, radius, radius, radius );
      this.addObjectToScene( mesh );
      return mesh;
    };
  }();

  this.addBox = function() {
      var geometry = new THREE.BoxGeometry( 1, 1, 1 );
      return function ( width, height, depth ) {
        var material = this.defaultSolidMaterial();
        var mesh = new THREE.Mesh( geometry, material );
        this.scaleObjectByXYZ( mesh, width, height, depth );
        this.addObjectToScene( mesh );
        return mesh;
      };
  }();

  this.addSweep = function ( shape, path ) {//FIXME: not sure if this is a surface or solid.
    var material = this.defaultSolidMaterial();
    var geometry = new THREE.ExtrudeGeometry( shape, {extrudePath: path} );
    var mesh = new THREE.Mesh( geometry, material );
    this.addObjectToScene( mesh );
    return mesh;
  };

  this.paramGeoms = [];
  this.addParametricSurface = function ( func, uSlices, vSlices ) {
    var material = this.defaultSurfaceMaterial();
    var geometry = new THREE.ParametricGeometry( func, uSlices, vSlices );
    var mesh = new THREE.Mesh( geometry, material );
    this.addObjectToScene( mesh );
    this.paramGeoms.push(geometry);
    return mesh;
  };

  this.addEmpty = function () {
    var object = new THREE.Object3D();
    this.addObjectToScene( object );
    return object;
  };

  /*
  ***********
    Object transformations
  ***********
  */
  this.translateObjectByXYZ = function ( object, x, y, z ) {
    var matrix = new THREE.Matrix4();
    matrix.makeTranslation( x, y, z );
    object.applyMatrix( matrix );
    return object;
  };

  this.scaleObjectByXYZ = function ( object, x, y, z ) {
    var matrix = new THREE.Matrix4();
    matrix.makeScale( x, y, z );
    object.applyMatrix( matrix );
    return object;
  };

  this.rotateObjectByAxisAngle = function ( object, axis, angle ) {
    var matrix = new THREE.Matrix4();
    matrix.makeRotationAxis( axis, angle );
    object.applyMatrix( matrix );
    return object;
  };


  /*
  ***********
    Scene hierarchy management
  ***********
  */
  this.addObjectToScene = function ( object ) {
    this.scene.add( object );
  };

  this.setObjectParentToObject = function ( object, parent ) {
    parent.add( object );
  };

  this.clearScene = function () {
    this.combinedScene.remove( this.scene );
    this.scene = new THREE.Scene();
    for (var i = this.paramGeoms.length - 1; i >= 0; i--) {
      this.paramGeoms[i].dispose();
    };
    this.paramGeoms = [];
    this.combinedScene.add( this.scene );
  };

  /*
  ***********
    Material functions
  ***********
  */
  var solidMat = new THREE.MeshLambertMaterial();
  this.defaultSolidMaterial = function () {
    return solidMat;
  };

  var surfaceMat = new THREE.MeshLambertMaterial();
  surfaceMat.side = THREE.DoubleSide;
  this.defaultSurfaceMaterial = function () {
    return surfaceMat;
  };
}
