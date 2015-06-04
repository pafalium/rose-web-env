
var spherical = function ( r, fi, psi ) {
  return xyz( r*Math.sin(psi)*Math.cos(fi),
              r*Math.cos(psi),
              r*Math.sin(psi)*Math.sin(fi) );
};

var sinSphereFunc = function(r, a, omega) {
	
	return function(u,v) {
		var phi = 2*Math.PI * u;
		var psi = Math.PI *  v;
		return spherical( r+a*(Math.sin(omega*phi)+Math.cos(omega*psi)), phi, psi );
	};	
};


var sinSphere = parametric_surface(sinSphereFunc(1, 0.1, 1), 200, 200);