var range = function (n) {
    var a = new Array(n);
    for (var i=0; i<n; i++) {
        a[i] = i;
    }
    return a;
};


var abobada_trelicas = function ( rac, rb, rf, n, n_fi ) {
  var e = 2*rf*Math.sin(Math.PI/n_fi);
  var psi0 = Math.asin( (rf*Math.cos( Math.PI/n_fi )) / rac );
  var fis = range(n_fi).map(function(index) {
                              return index * (2*Math.PI / n_fi);
  });
  var trelicas = fis.map(function(fi) {
    return trelica_arco( rac, rb, fi, psi0, Math.PI/2, e, n );
  });
  return group.apply(null, trelicas);
};


//(abobada-trelicas (xyz  0 0 0) 10 9 2.0 10 3)
move( abobada_trelicas( 10, 9, 2.0, 10, 3 ),
      0,
      0,
      0 );
//(abobada-trelicas (xyz 25 0 0) 10 9 2.0 10 6)
move( abobada_trelicas( 10, 9, 2.0, 10, 6 ),
      25,
      0,
      0 );
//(abobada-trelicas (xyz 50 0 0) 10 9 2.0 10 9)
move( abobada_trelicas( 10, 9, 2.0, 10, 9 ),
      50,
      0,
      0 );