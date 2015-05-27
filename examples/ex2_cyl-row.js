var arr = [];
for (var i=0; i<10; i++){
    var cx = cylinder (2, 10);
    move (cx, i*5, 0, 0);
    arr.push(cx);
}

var cylRow = group.apply(null, arr);
move( cylRow, -25, 0, -10 );