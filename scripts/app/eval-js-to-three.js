//javascript-threejs-evaluator
"use strict";

define(["THREE"], function(THREE) {

	// Initial bindings.
	var initialEnvironment = {
		solid: {
			cylinder: { 
				byRadiusHeight: function (radius, height) {

				},
				byCenterRadiusHeight: function (center, radius, height) {

				},
				byBaseCentersAndRadius: function (pt1, pt2, radius) {

				}
			},
			sphere: {
				byRadius: function (radius) {

				},
				byCenterRadius: function (center, radius) {

				},
				byDiameter: function (diameter) {

				},
				byCenterDiameter: function (center, diameter) {

				}
			},
			box: {
				byWidthHeightDepth: function (width, height, depth) {

				},
				byCenterWidthHeightDepth: function (center, width, height, depth) {

				},
				byOppositeCorners: function (c1, c2) {

				}
			},
			cube: {
				bySide: function (side) {

				},
				byCenterSide: function (center, side) {

				}
			},
			cone: {
				byRadiusHeight: function (radius, height) {

				},
				byBaseCenterRadiusHeight: function (base_center, radius, height) {

				},
				byBaseCenterApexRadius: function (base_center, apex, radius) {

				},
				frustum: {
					byBottomRadiusHeightTopRadius: function (bot_radius, height, top_radius) {

					},
					byBottomCenterRadiusTopCenterRadius: function (bot_center, bot_radius, top_center, top_radius) {

					}
				}
			},
			torus: {
				byMajorRadiusMinorRadius: function (major_radius, minor_radius) {
					
				}
			},
			pyramid: {
				byCircleSidesHeight: function (circle, sides, height) {

				}
			}
		},
		surface: {
			polygon: {
				regular: {
					byCircleSides: function (circle, sides) {

					}
				},
				byPoints: function (points) {

				},
				rectangle: {
					byOppositeCorners: function (pt1, pt2) {

					},
					byCenterCorner: function (center, corner) {

					}
				}
			},
			parametric: {
				byFunctionAndDomain: function (fn, domain) {

				}
			}
		},
		path: {
			line: { //pt-pt: recta
				byTwoPoints: function (pt1, pt2) {

				},
				byPointDirection: function (point, direction) {

				}
			},
			polyline: { // line segment
				byPoints: function (points) {

				}
			},
			spline: {
				byPoints: function (points) {

				}
			},
			circle: {
				byCenterRadius: function (center, radius) {

				},
				byCenterPoint: function (center, point) {

				},
				byThreePoints: function (pt1, pt2, pt3) {

				}
			},
			parametric: {
				byFunctionAndDomain: function (fn, domain) {

				}
			}
		},
		plane: {
			byPointNormal: function (point, normal) {

			},
			byThreePoints: function (pt1, pt2, pt3) {

			}
		},
		csg: {
			union: {//solid.byUnion
				byList: function (solid_list) {

				}
			},
			intersection: {//solid.byIntersection
				byList: function (solid_list) {

				}
			},
			subtraction: {//solid.bySubtraction
				binary: function (a, b) { // a - b

				}
			},
			invert: function (solid) {//solid.byInverting/fromInverting

			},
			empty: function () {//solid.empty

			},
			universal: function () {//solid.universal

			}
		},
		loft: {
			fromPaths: function (paths) { // surface.byLoft

			},
			fromSurfaces: function (surfaces) { // solid.byLoft

			}
		},
		sweep: {
			surface: function (path, profile) { // surface.bySweep

			},
			solid: function (path, surface) { // surface.bySweep

			}
		},
		extrude: {
			surface: function (surface, vector) { // solid.byExtruding

			},
			path: function (path, vector) { // surface.byExtruding

			}
		},
		revolve: {
			path: function (path, axis, start_angle, end_angle) {

			},
			surface: function (surface, axis, start_angle, end_angle) {

			}
		},
		point: {
			byXYZ: function (x, y, z) { // cartesian coordinates

			},
			byPolar: function (theta, radius) {

			},
			byCylindric: function (theta, radius, height) {

			},
			bySpherical: function (radius, phi, psi) {

			},
			origin: function () {

			}
		},
		vector: {
			byXYZ: function (x, y, z) {

			},
			byPolar: function (theta, radius) {

			},
			byCylindric: function (theta, radius, height) {

			},
			bySpherical: function (radius, phi, psi) {

			},
			byDirectionLength: function (direction, length) {

			},
			byBeginEndPoints: function (begin, end) {

			},
			math: {//could be members of vector
				add: function (v1, v2) {

				},
				sub: function (v1, v2) {// v1 + -v2 

				},
				scale: function (vector, factor) {

				},
				dot: function (v1, v2) {

				},
				cross: function (v1, v2) {

				},
				project: function (destination_v, projectee_v) {

				}
			}
		},
		direction: {
			fromVector: function (vector) {

			},
			byPolar: function (theta) {

			},
			byCylindric: function (theta, height) {

			},
			bySpherical: function (phi, psi) {

			}
		},
		angle: {
			byDegrees: function (degrees) {

			},
			byRadians: function (radians) {

			}
		},
		coordinate_system: {
			identity: function () {// base ortonormal

			},
			byPointRightUpDirections: function (origin_p, right_d, up_d) {

			},
			byPointVectors: function (origin_p, v1, v2, v3) {

			}
		},
		transform: { // defining it like this is awkward, should be 'method'
			rotate: {
				byAngleAxis: function (thing, angle, axis) { //axis? point+dir?

				}
			},
			translate: {
				byVector: function (thing, vector) {

				}
			},
			scale: {
				byUniform: function (thing, scaleFactor) {

				}
			},
			byChangingFromToCoordinateSystem: function (thing, from_cs, to_cs) {
				//from global to from_cs to to_cs?
			}
		},
		MOAR: {
			intersectionBetweenEveryTwoTypesOfGeometry: function (g1, g2) {

			},
			sliceGeomWithSurface: function (g1, knife) {

			},
			thickenSurface: function (surface, thickness) {
				
			}
		}
	};

	var strange_environment = (function() {
		var currentSolidMaterial = new THREE.MeshLambertMaterial();
		return {
			cylinder: (function() {
				var cylinderGeometry = new THREE.CylinderGeometry(1.0, 1.0, 1.0, 32);
				return function cylinder(radius, height) {
					var mesh = new THREE.Mesh(cylinderGeometry, currentSolidMaterial);
					mesh.scale.set(radius, height, radius);
					return mesh;
				};
			})(),
			sphere: (function() {
				var sphereGeometry = new THREE.SphereGeometry(1.0, 32, 32);
				return function sphere(radius) {
					var mesh = new THREE.Mesh(sphereGeometry, currentSolidMaterial);
					mesh.scale.set(radius, radius, radius);
					return mesh;
				};
			})(),
			box: (function() {
				var boxGeometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
				return function box(width, height, depth) {
					var mesh = new THREE.Mesh(boxGeometry, currentSolidMaterial);
					mesh.scale.set(width, height, depth);
					return mesh;
				};
			})(),
			cone_frustum: function cone_frustum(bottomRadius, topRadius, height) {
				var frustumGeometry = new THREE.CylinderGeometry(topRadius, bottomRadius, height, 32);
				var mesh = new THREE.Mesh(frustumGeometry, currentSolidMaterial);
				return mesh;
			},
			translatedBy: function(solid, delta) {
				var solidCopy = solid.clone();
				var translated = new THREE.Object3D();
				translated.add(solidCopy);
				translated.position.set(delta.x, delta.y, delta.z);
				return translated;
			},
			xyzDelta: function(x, y, z) {
				return {
					x: x,
					y: y,
					z: z
				};
			}
		};
	})();

	function envInitCode () {
		//generate primitive declarations
		// example
		return "var solid = { "+
		"	cylinder: { "+
		"		byBaseCentersAndRadius: initialEnvironment.solid.cylinder.byBaseCentersAndRadius "+
		"	}"+
		"};";

	}

	function evaluationEnclosure() {
			
		var envCode = envInitCode();
		var evaluatorCode = "(function (program) { "+envInitCode+" return eval(program); });";
		return eval(evaluatorCode);

	}

	function threeSceneFromExecutingProgram(program) {

		var scene = null;



		return scene;
	}

	return {
		threeSceneFromExecutingProgram: threeSceneFromExecutingProgram
	};

});