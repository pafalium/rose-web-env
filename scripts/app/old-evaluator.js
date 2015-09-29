//old-evaluator

/*global define*/
define(["THREE"], function(THREE){
	"use strict";
	//imperative primitives
	//primitives add to scene and return the added object
	function Evaluator() {
		var _scene = new THREE.Scene();/*placeholder*/

		var addToScene = function addToScene(object3d) {
			_scene.add(object3d);
		};

		var solidMaterial = (function() {
			var theSolidMaterial = new THREE.MeshLambertMaterial();
			return function solidMaterial() {
				return theSolidMaterial;
			};
		})();

		var cylinder = (function(){
			var theCylinderGeometry = new THREE.CylinderGeometry( 1, 1, 1, 32 );
			var makeCylinderMesh = function() {
				var geom = theCylinderGeometry;
				var mat = solidMaterial();
				var mesh = new THREE.Mesh(geom, mat);
				return mesh;
			};
			return function cylinder(r, h) {
				var mesh = makeCylinderMesh();
				mesh.scale.set(r,h,r);
				addToScene(mesh);
				return mesh;
			};
		})();

		var sphere = (function(){
			var theSphereGeometry = new THREE.SphereGeometry( 1, 32, 24 ); 
			var makeSphereMesh = function() {
				var geom = theSphereGeometry;
				var mat = solidMaterial();
				var mesh = new THREE.Mesh(geom, mat);
				return mesh;
			};
			return function sphere(r) {
				var mesh = makeSphereMesh();
				mesh.scale.set(r,r,r);
				addToScene(mesh);
				return mesh;
			};
		})();

		var box = (function(){
			var theBoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
			var makeBoxMesh = function() {
				var geom = theBoxGeometry;
				var mat = solidMaterial();
				var mesh = new THREE.Mesh(geom, mat);
				return mesh;
			};
			return function box(w,h,d){
				var mesh = makeBoxMesh();
				mesh.scale.set(w,h,d);
				addToScene(mesh);
				return mesh;
			};
		})();

		var move = function move(obj, x, y, z) {
			var matrix = new THREE.Matrix4();
		    matrix.makeTranslation( x, y, z );
		    obj.applyMatrix( matrix );
		    return obj;
		};

		var group = function group() {
			var toGroup = (function(args){
				if(args.length === 1 && args[0].length) {
					return args[0];
				} else {
					return Array.prototype.slice.call(args);
				}
			})(arguments);
			var empty = new THREE.Object3D();
			empty.add.apply(empty,toGroup);
			addToScene(empty);
			return empty;
		};

		function evaluate(programText) {
			_scene = new THREE.Scene();

			//var cylinder = cylinder;
			//var sphere = sphere;
			//var box = box;


			eval(programText);

			return _scene;
		}
		this.evaluate = evaluate;
	}
	return Evaluator;
});