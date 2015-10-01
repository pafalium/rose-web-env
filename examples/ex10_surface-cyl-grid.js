var map_in_interval = function(fn, a, b, n) {
	var spacing = (b - a) / (n - 1);
	var res = new Array(n);
	for (var i = 0; i < n; i++) {
		var fnRes = fn(a + i * spacing);
		res[i] = fnRes;
	}
	return res;
};
var enumerate_n = map_in_interval;

var enumerate_m_n = function(fn, u1, u2, m, v1, v2, n) {
	return enumerate_n(
		function(u) {
			return enumerate_n(function(v) {
				return fn(u, v);
			}, v1, v2, n);
		}, u1, u2, m);
};

var surfaceFn = function(u,v) {
	var y = (4/10)*Math.sin(u*v);
	return xyz(u,y+2,v);
};

enumerate_m_n(function(u,v){
	var top_pt = surfaceFn(u,v);
	return move(cylinder(0.1,top_pt.y), top_pt.x, top_pt.y/2, top_pt.z);
}, 
	-Math.PI, Math.PI, 30,
	-Math.PI, Math.PI, 30);