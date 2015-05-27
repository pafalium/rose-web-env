var quotient = function ( n, m ) {
  return Math.floor(n/m);
};




var fuste = function ( a_fuste, r_base, r_topo ) {
  return move(
          cone_frustum( r_base, a_fuste, r_topo ),
          0, a_fuste / 2.0, 0 );
};

var coxim = function ( a_coxim, r_base, r_topo ) {
  return move(
          cone_frustum( r_base, a_coxim, r_topo ),
          0, a_coxim / 2.0, 0 );
};

var abaco = function ( a_abaco, l_abaco ) {
  return move(
          box( l_abaco, a_abaco, l_abaco ),
          0, a_abaco / 2.0, 0 );
};

var coluna = function ( a_fuste, r_base_fuste,
                        a_coxim, r_base_coxim,
                        a_abaco, l_abaco ) {
  return group (
          fuste( a_fuste, r_base_fuste, r_base_coxim ),
          move(
            coxim( a_coxim, r_base_coxim, l_abaco / 2.0 ),
            0, a_fuste, 0 ),
          move(
            abaco( a_abaco, l_abaco ),
            0, a_fuste + a_coxim, 0));
};

//coluna( 9, 0.5, 0.4, 0.3, 0.3, 1.0 );

//coluna( 6, 0.8, 0.3, 0.2, 0.4, 1.4 );

var raio_topo_fuste = function ( raio_base, altura ) {
  if ( altura < 15 ) {
    return (5/6) * raio_base;
  } else {
    var divisoes = quotient( altura, 10 );
    return (((10+divisoes) / (12+divisoes)) * raio_base);
  }
};

var coluna_dorica = function ( altura ) {
  var r_base_fuste = altura / 14;
  var r_base_coxim = raio_topo_fuste( r_base_fuste, altura );
  var a_fuste = 13 * r_base_fuste;
  var a_coxim = (2/3) * r_base_fuste;
  var a_abaco = (1/3) * r_base_fuste;
  var l_abaco = (13/6) * r_base_fuste;
  return coluna( a_fuste, r_base_fuste,
                 a_coxim, r_base_coxim,
                 a_abaco, l_abaco );
};

// coluna_dorica( 10 );
// coluna_dorica( 15 );
// coluna_dorica( 20 );
// coluna_dorica( 25 );
// coluna_dorica( 30 );
// coluna_dorica( 35 );

var colunas_tholos = function ( n_colunas, raio, fi, d_fi, altura ) {
  if ( n_colunas === 0 ) {
    return empty();
  } else {
    return group( rotate(
                    move( coluna_dorica( altura ), raio, 0, 0 ),
                    xyz( 0, 1, 0 ),
                    fi),
                  colunas_tholos( n_colunas-1, raio, fi+d_fi, d_fi, altura ));
  }
};

//colunas_tholos( 20, 7, 0, Math.PI * 2 / 20, 4 );

var torre_tholos = function ( n_colunas, raio, d_raio, altura_coluna ) {
  if (raio < (altura_coluna / 28)) {
    return empty();
  } else {
    return group(
      cylinder( raio, altura_coluna / 10 ),
      colunas_tholos( n_colunas, raio, 0, 2*Math.PI / n_colunas, altura_coluna ),
      move(
        torre_tholos( n_colunas, raio - d_raio, d_raio, altura_coluna ),
        0,
        altura_coluna,
        0));
  }
};

//torre_tholos( 20, 15, 2, 4 );
