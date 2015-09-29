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

		var surfaceMaterial = (function() {
			var theSurfaceMaterial = new THREE.MeshLambertMaterial();
			theSurfaceMaterial.side = THREE.DoubleSide;
			return function surfaceMaterial() {
				return theSurfaceMaterial;
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
				scale(mesh, r,h,r);
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
				scale(mesh, r,r,r);
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
				scale(mesh, w,h,d);
				addToScene(mesh);
				return mesh;
			};
		})();

		var cone_frustum = function cone_frustum(baseRadius, height, topRadius) {
			function makeConeFrustumGeometry(baseRadius, height, topRadius) {
				return new THREE.CylinderGeometry(topRadius, baseRadius, height, 32);
			}
			function makeConeFrustumMesh(baseRadius, height, topRadius) {
				var geom = makeConeFrustumGeometry(baseRadius, height, topRadius);
				var mat = solidMaterial();
				var mesh = new THREE.Mesh(geom, mat);
				return mesh;	
			}
			var mesh = makeConeFrustumMesh(baseRadius, height, topRadius);
			addToScene(mesh);
			return mesh;
		};

		var xyz = function xyz(x, y, z) {
			return new THREE.Vector3(x, y, z);
		};
		var direction_from_to = function direction_from_to( p0, p1 ) {
        return p1.clone().sub( p0 ).normalize();
    	};
    	var point_distance = function point_distance( p0, p1 ) {
        return p1.clone().sub( p0 ).length();
	    };
	    var add = function add( v0, v1 ) {
	        return v0.clone().add( v1 );
	    };
	    var cross = function cross( v0, v1 ) {
	        return v0.clone().cross( v1 );
	    };
	    var dot = function dot( v0, v1 ) {
	        return v0.dot( v1 );
	    };
	    var linear_interpolation = function linear_interpolation( p0, p1, t ) {
	        return p0.clone().lerp( p1, t );
	    };

		var move = function move(obj, x, y, z) {
			var matrix = new THREE.Matrix4();
		    matrix.makeTranslation( x, y, z );
		    obj.applyMatrix( matrix );
		    return obj;
		};

		var rotate = function rotate(obj, axis, angle) {
			var matrix = new THREE.Matrix4();
		    matrix.makeRotationAxis( axis, angle );
		    obj.applyMatrix( matrix );
		    return obj;
		};

		var scale = function scale(obj, x, y, z) {
			var matrix = new THREE.Matrix4();
		    matrix.makeScale( x, y, z );
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

		var parametric_surface = function parametric_surface(func, uSlices, vSlices) {
		    var material = surfaceMaterial();
		    var geometry = new THREE.ParametricGeometry( func, uSlices, vSlices );
		    var mesh = new THREE.Mesh( geometry, material );
		    addToScene(mesh);
		    return mesh;
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