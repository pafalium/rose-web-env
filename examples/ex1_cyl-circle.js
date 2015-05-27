var cylindric = function (theta, radius, height) {
    return xyz(radius*Math.cos(theta),height,radius*Math.sin(theta));
};

var range = function (n) {
    var a = new Array(n);
    for (var i=0; i<n; i++) {
        a[i] = i;
    }
    return a;
};

var circularPoints = function (n, radius) {
    var twoPI = 2 * Math.PI;
    var divider = twoPI / n;
    return range(n).map(function(elem) {
        return cylindric (elem*divider, radius, 0);
    });
};


var circularCylinders = function (n, circleRadius, cylRadius, cylHeight) {
    var cylinders =
    circularPoints(n, circleRadius).map(function(elem) { // We could map the a partially applied cylinder here.
       var cyl = cylinder(cylRadius, cylHeight);
       move ( cyl, elem.x, elem.y, elem.z); // No concept of coordinate...
       return cyl;
    });
    return group.apply(null, cylinders); // Return cylinders as a group. Ugly implementation...
};

var temple1 = circularCylinders(8, 10, 0.5, 3);
