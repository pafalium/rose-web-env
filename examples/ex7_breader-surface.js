"use strict";

// Create a function for to use in the parametric_surface operator.
var breather_func = function ( a, u0, u1, v0, v1 ) {
  var r = 1 - Math.pow( a, 2 );
  var w = Math.sqrt( r );
  var surface_func = function (u_0_1, v_0_1) {
    var u = u0 + (u1 - u0) * u_0_1;
    var v = v0 + (v1 - v0) * v_0_1;
    var sinv = Math.sin( v );
    var cosv = Math.cos( v );
    var sinwv = Math.sin( w * v );
    var coswv = Math.cos( w * v );
    var sinhau = Math.sinh( a * u );
    var coshau = Math.cosh( a * u );
    var d = a * ( Math.pow( w * coshau, 2 ) + Math.pow( a * sinwv, 2 ));
    return xyz( 
      -u + ( 2 * r * coshau * sinhau ) / d,
      ( 2 * w * coshau * ( -( w * cosv * coswv ) - ( sinv * sinwv ) ) ) / d,
      ( 2 * w * coshau * ( -( w * sinv * coswv ) + ( cosv * sinwv ) ) ) / d);
  };
  return surface_func;
};

var example_breather = parametric_surface(breather_func(0.4, -13.2, 13.2, -37.4, 37.4), 200, 200);

