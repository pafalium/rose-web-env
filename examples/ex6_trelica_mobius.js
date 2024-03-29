"use strict";
//************************************************************

var no_trelica = function ( pt, radius ) {
  return move( sphere( radius ), pt.x, pt.y, pt.z );
};

var barra_trelica = function ( p0, p1, radius ) {
  //fazer cilinder com raio da barra da trelica e comprimento igual à distancia entre os dois pontos
  var height = point_distance( p0, p1 );
  var barra = cylinder( radius, height );
  //rodar cilindro para o eixo ficar orientado com o vector p0->p1
  var axis = cross( xyz( 0, 1, 0 ), direction_from_to( p0, p1 ) ).normalize();
  var angle = Math.acos( dot( xyz( 0, 1, 0 ), direction_from_to( p0, p1 ) ) );
  //mover cilindro para o centro ficar no ponto médio dos pontos
  var mid_point = linear_interpolation( p0, p1, 0.5 );

  return move( rotate( barra, axis, angle ), mid_point.x, mid_point.y, mid_point.z );
};

var nos_trelica = function ( pts, radius ) {
  return group.apply(null, pts.map( function(pt) { return no_trelica( pt, radius );} ) );
};

var barras_trelica = function ( ps, qs, radius ) {
  var leastPts = ps.length <= qs.length ? ps : qs;
  var barras = ps.map(
    function (p, index, arr) {
      return barra_trelica( ps[index], qs[index], radius );
    });
  return group.apply(null, barras);
};

var trelica = function ( curves, knot_radius, bar_radius ) {
  var as = curves[0];
  var bs = curves[1];
  var cs = curves[2];

  var stuff = [
    nos_trelica( as, knot_radius ),
    nos_trelica( bs, knot_radius ),
    barras_trelica( as, cs, bar_radius ),
    barras_trelica( bs, as.slice(0, as.length-1), bar_radius ),
    barras_trelica( bs, cs.slice(0, cs.length-1), bar_radius ),
    barras_trelica( bs, as.slice(1), bar_radius ),
    barras_trelica( bs, cs.slice(1), bar_radius ),
    barras_trelica( as.slice(1), as.slice(0, as.length-1), bar_radius ),
    barras_trelica( bs.slice(1), bs.slice(0, bs.length-1), bar_radius ),
    curves.length - 3 === 0 ?
      group( 
        nos_trelica( cs, knot_radius ), 
        barras_trelica( cs.slice(1), cs.slice(0, cs.length-1), bar_radius ) )
     :group( 
        barras_trelica( bs, curves[3], bar_radius ),
        trelica( curves.slice(2), knot_radius, bar_radius ) )
    ];
  return group.apply(null, stuff);

};

var addCoord = function ( c1, c2 ) { return c1.clone().add(c2);};
var multCoord = function ( c, scalar ) { return c.clone().multiplyScalar(scalar);};
var normCoord = function ( c ) { return c.clone().normalize(); };

//var cross = cross;
var cross_products = function ( pts ) {//FIXME: points and coordinates are not the same and coalescense is not cool
  var accum = xyz( 0,0,0 );
  for(var i=0; i<pts.length-1; i++) {
    accum = addCoord( cross( pts[i], pts[i+1] ), accum );
  }
  return accum;
};


var polygon_normal = function ( pts ) {
  return multCoord(
    normCoord(
      cross_products(
        pts.concat( [pts[0]] ))),
    -1);
};
var midCoord = function ( c1, c2 ) {
  return multCoord( addCoord( c1, c2 ), 0.5 );
};
var quadCenter = function ( c1, c2, c3, c4 ) {
  return midCoord( midCoord( c1, c2 ), midCoord( c3, c4 ) );
};
var quadNormal = function ( c1, c2, c3, c4 ) {
  return polygon_normal( [c1, c2, c3, c4] );
};

var quadPyramidApex = function ( c1, c2, c3, c4 ) {
  var h = ( point_distance( c1, c2 )+
           point_distance( c2, c3 )+
           point_distance( c3, c4 )+
           point_distance( c4, c1 ) ) / ( 4 * Math.sqrt(2) );
  return addCoord( 
    quadCenter( c1, c2, c3, c4 ), 
    multCoord( quadNormal( c1, c2, c3, c4 ), h ) );
};

var insertPyramicApex2Curves = function ( cs1, cs2 ) {
  var res = [];
  for(var baseIndex=0; baseIndex < cs1.length - 1; baseIndex += 1) {
    res.push( 
      quadPyramidApex( cs1[baseIndex], cs2[baseIndex], cs2[baseIndex+1], cs1[baseIndex+1] ) );
  }
  return res;
};
var insertPyramicApexCurves = function ( curves ) {
  var res = [];
  for(var i=0; i < curves.length-1; i += 1) {
    res.push( curves[i] ); 
    res.push( insertPyramicApex2Curves( curves[i], curves[i+1] ) );
  }
  res.push( curves[curves.length-1] );
  return res;
};
var spatialTrussInsertApex = function ( cs ) {
  var c1 = (cs[0])[0];
  var c2 = (cs[1])[0];
  var c4 = (cs[0])[1];

  var d = Math.min( point_distance( c1, c2 ), point_distance( c1, c4 ) );

  var knot_radius = d / 5;
  var bar_radius = d / 15;

  return trelica( insertPyramicApexCurves( cs ), knot_radius, bar_radius );
};

var map_in_interval = function ( fn, a, b, n ) {
  var spacing = (b-a)/(n-1);
  var res = new Array(n);
  for(var i=0; i<n; i++) {
    var fnRes = fn( a+i*spacing );
    res[i] = fnRes;
  }
  return res;
};
var enumerate_n = map_in_interval;

var enumerate_m_n = function ( fn, u1, u2, m, v1, v2, n ) {
  return enumerate_n( 
    function( u ) {
      return enumerate_n( function( v ) { return fn( u, v ); }, v1, v2, n);
    }, u1, u2, m );
};


var cylindric = function ( theta, radius, height ) {
    return xyz( radius*Math.cos(theta),height,radius*Math.sin(theta) );
};
var moebius_cs = function ( r, u1, u2, m, v1, v2, n ) {
  return enumerate_m_n( function( u, v ) {
    return cylindric( 
      u,//angle
      r * ( 1 + ( v*Math.cos(u/2) ) ),//radius
      r * ( v*Math.sin(u/2) ) );//z
  }, u1, u2, m, v1, v2, n );
};

var moebius_truss = function ( r, u1, u2, m, v1, v2, n ) {
  return spatialTrussInsertApex( moebius_cs( r, u1, u2, m, v1, v2, n ) );
};

var moebius_truss_example = moebius_truss( 100, 0, Math.PI*4, 160, 0, 0.3, 10 );

/*
//
//Testing quadPyramidApex...
//
var basePoints = [xyz(1,0,0), xyz(0,1,0), xyz(-1,0,0),xyz(0,-1,0)];
var apexPoint = quadPyramidApex.apply(null, basePoints);
var sphereOnCoord = function ( radius, c ) {
  return move( sphere( radius ), c.x, c.y, c.z );
};
var baseSpheres = basePoints.map(function(pt){return sphereOnCoord(0.25,pt);});
var apexSphere = sphereOnCoord(0.25, apexPoint);
*/
/*
//
//Testing insertPyramicApexCurves
//
var curves = enumerate_m_n(function(x,z){return xyz(x,0,z);}, 0, 4, 5, 0, 10, 11);
var curvesKnots = curves.map(function(coordSet){return nos_trelica(coordSet, 0.05);});
var curvesPlusApexes = insertPyramicApexCurves(curves);
var curvesPApexesKnots = curvesPlusApexes.map(function(coordSet){return nos_trelica(coordSet, 0.05);});
var pyramidsTruss = trelica( curvesPlusApexes, 0.05, 0.01 );

var apexesFromFirstTwoCurves = insertPyramicApex2Curves(curves[0],curves[1]);
var firstUsKnots = [curves[0],apexesFromFirstTwoCurves,curves[1]].map(function(coordSet){return nos_trelica(coordSet, 0.05);});
*/