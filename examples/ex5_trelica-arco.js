var spherical = function ( r, fi, psi ) {
  return xyz( r*Math.sin(psi)*Math.cos(fi),
              r*Math.cos(psi),
              r*Math.sin(psi)*Math.sin(fi) );
};

var polar = function ( r, fi ) {
  return xyz( r*Math.cos(fi), 0, r*Math.sin(fi) );
};




var pontos_arco = function ( p, r, fi, psi0, psi1, dpsi ) {
  var pts = [];
  var psi_i = psi0;
  while ( psi_i <= psi1 ) {
    pts.push( add( p, spherical( r, fi, psi_i ) ) );
    psi_i += dpsi;
  }
  return pts;
};

var trelica_arco = function ( rac, rb, fi, psi0, psi1, e, n ) {
  var dpsi = (psi1 - psi0) / n;
  return trelica(
            pontos_arco( polar( e/2, fi + Math.PI/2 ),
                         rac,
                         fi,
                         psi0,
                         psi1,
                         dpsi ),
            pontos_arco( xyz(0,0,0),
                         rb,
                         fi,
                         (psi0 + (dpsi / 2)),
                         (psi1 - (dpsi / 2)),
                         dpsi ),
            pontos_arco( polar( e/2, fi - Math.PI/2 ),
                         rac,
                         fi,
                         psi0,
                         psi1,
                         dpsi ) );
};

//(trelica-arco (xyz 0 0 0) 10 9 0 -pi/2 pi/2 1.0 20)
move( trelica_arco( 10, 9, 0, -Math.PI/2, Math.PI/2, 1.0, 20 ),
      0,
      0,
      0 );
//(trelica-arco (xyz 0 5 0)  8 9 0 -pi/3 pi/3 2.0 20)
move( trelica_arco( 8, 9, 0, -Math.PI/3, Math.PI/3, 2.0, 20 ),
      0,
      0,
      5 );

//***************************************************************
//Testing
//***************************************************************
var rac = 10;
var rb = 9;
var fi = 0;
var psi0 = -Math.PI/2;
var psi1 = Math.PI/2;
var e = 1.0;
var n = 20;

var dpsi = (psi1-psi0) / n;
nos_trelica(pontos_arco( polar( e/2, fi + Math.PI/2 ),
                         rac,
                         fi,
                         psi0,
                         psi1,
                         dpsi ) );
nos_trelica(pontos_arco( xyz(0,0,0),
                         rb,
                         fi,
                         (psi0 + (dpsi / 2)),
                         (psi1 - (dpsi / 2)),
                         dpsi ) );
nos_trelica(pontos_arco( polar( e/2, fi - Math.PI/2 ),
                         rac,
                         fi,
                         psi0,
                         psi1,
                         dpsi ) );
