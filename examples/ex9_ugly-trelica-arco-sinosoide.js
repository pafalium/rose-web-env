var spherical = function ( r, fi, psi ) {
  return xyz( r*Math.sin(psi)*Math.cos(fi),
              r*Math.cos(psi),
              r*Math.sin(psi)*Math.sin(fi) );
};

var polar = function ( r, fi ) {
  return xyz( r*Math.cos(fi), 0, r*Math.sin(fi) );
};

var range = function (n) {
    var a = new Array(n);
    for (var i=0; i<n; i++) {
        a[i] = i;
    }
    return a;
};


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
  var minLength = Math.min(ps.length, qs.length);
  var barras = range(minLength).map(
    function (p, index, arr) {
      return barra_trelica( ps[index], qs[index], radius );
    });
  return group.apply(null, barras);
};

var trelica_espacial = function ( curves, knot_radius, bar_radius ) {
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
        trelica_espacial( curves.slice(2), knot_radius, bar_radius ) )
    ];
  return group.apply(null, stuff);

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



var coordenadas_trelica_ondulada = function ( p, rac, rb, l, fi, psi0, psi1, dpsi, alfa0, alfa1, d_alfa, d_r ) {
  //caso final - ultimo pontos_arco
  if( alfa0 >= alfa1 ) {
    var ultimos_pontos_arco = [pontos_arco( add( p, polar( l/2.0, fi - Math.PI/2 ) ), 
                                            rac + d_r * Math.sin(alfa0),
                                            fi,
                                            psi0,
                                            psi1,
                                            dpsi )];
    return ultimos_pontos_arco;
  } else {
    return [
      pontos_arco( add( p, polar( l/2.0, fi - Math.PI/2 ) ),
                   rac + d_r * Math.sin(alfa0),
                   fi,
                   psi0,
                   psi1,
                   dpsi ),
      pontos_arco( p,
                   rb + d_r * Math.sin(alfa0),
                   fi,
                   psi0 + dpsi/2.0,
                   psi1 - dpsi/2.0,
                   dpsi )
    ].concat( 
      coordenadas_trelica_ondulada( add( p, polar( l, fi + Math.PI/2 )),
                                    rac,
                                    rb,
                                    l,
                                    fi,
                                    psi0,
                                    psi1,
                                    dpsi,
                                    alfa0 + d_alfa,
                                    alfa1,
                                    d_alfa,
                                    d_r ) );
  }
};


var trelica_ondulada = function ( p, rac, rb, l, n, fi, psi0, psi1, alfa0, alfa1, d_alfa, d_r ) {
  return trelica_espacial(
    coordenadas_trelica_ondulada(
      p, rac, rb, l, fi, psi0, psi1, (psi1-psi0)/n, alfa0, alfa1, d_alfa, d_r ),
    0.05,
    0.01);
};


var exemplo_trelica = trelica_ondulada( 
  xyz(0,0,0),
  10, 9, 1.0, 20,
  0, -Math.PI/3, Math.PI/3, 0, 4*Math.PI,
  Math.PI/8, 1);