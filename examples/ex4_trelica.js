
//************************************************************


var raio_no_trelica = 0.1;

var no_trelica = function ( pt ) {
  return move( sphere(raio_no_trelica), pt.x, pt.y, pt.z );
};

var raio_barra_trelica = 0.03;

var barra_trelica = function ( p0, p1 ) {
  //fazer cilinder com raio da barra da trelica e comprimento igual à distancia entre os dois pontos
  var height = point_distance( p0, p1 );
  var barra = cylinder( raio_barra_trelica, height );
  //rodar cilindro para o eixo ficar orientado com o vector p0->p1
  var axis = cross( xyz( 0, 1, 0 ), direction_from_to( p0, p1 ) ).normalize();
  var angle = Math.acos( dot( xyz( 0, 1, 0 ), direction_from_to( p0, p1 ) ) );
  //mover cilindro para o centro ficar no ponto médio dos pontos
  var mid_point = linear_interpolation( p0, p1, 0.5 );

  return move( rotate( barra, axis, angle ), mid_point.x, mid_point.y, mid_point.z );
};

var nos_trelica = function ( pts ) {
  return group.apply(null, pts.map(no_trelica));
};

var barras_trelica = function ( ps, qs ) {
  var leastPts = ps.length <= qs.length ? ps : qs;
  var barras = ps.map(
    function (p, index, arr) {
      return barra_trelica(ps[index], qs[index]);
    });
  return group.apply(null, barras);
};

var trelica = function ( as, bs, cs ) {
  return group(
    nos_trelica( as ),
    nos_trelica( bs ),
    nos_trelica( cs ),
    barras_trelica( as, cs ),
    barras_trelica( bs, as ),
    barras_trelica( bs, cs ),
    barras_trelica( bs, as.slice(1) ),
    barras_trelica( bs, cs.slice(1) ),
    barras_trelica( as.slice(1), as ),
    barras_trelica( cs.slice(1), cs ),
    barras_trelica( bs.slice(1), bs ));
};

var scaleFactor = 5;
move(
    rotate(
        scale(
          trelica( [ xyz( 0, -1, 0), xyz( 1, -1.1, 0), xyz( 2, -1.4, 0),
                 xyz( 3, -1.6, 0), xyz( 4, -1.5, 0), xyz( 5, -1.3, 0),
                 xyz( 6, -1.1, 0), xyz( 7, -1, 0)],
               [ xyz( 0.5, 0, 0.5), xyz( 1.5, 0, 1), xyz( 2.5, 0, 1.5),
                 xyz( 3.5, 0, 2), xyz( 4.5, 0, 1.5), xyz( 5.5, 0, 1.1),
                 xyz( 6.5, 0, 0.8)],
               [ xyz( 0, +1, 0), xyz( 1, +1.1, 0), xyz( 2, +1.4, 0),
                 xyz( 3, +1.6, 0), xyz( 4, +1.5, 0), xyz( 5, +1.3, 0),
                 xyz( 6, +1.1, 0), xyz( 7, +1, 0)] ),
          scaleFactor,
          scaleFactor,
          scaleFactor),
        xyz( 1, 0, 0), Math.PI * 0.5),
    -20, 0, 0);
