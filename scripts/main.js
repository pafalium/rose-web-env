
require.config({
    shim: {
        "THREE": { exports: "THREE"}
    },
    paths: {
        "THREE": "lib/three"
    }
});

require(["THREE", "THREEView"], function(THREE, THREEView) {
    /*
        Somehow this function should initialize the prototype.
        Maybe it should require:
            the 3dView;
            the program editor;
            the program evaluation logic;
            the actual user interface assembly (or do it itself);
    */

    // Testing Require.js with THREE.js

    var myDiv = document.getElementById("canvas-div");
    var view = new THREEView(512,512);
    myDiv.appendChild(view.domElement());


    view.addBox(1,2,3);
    requestAnimationFrame(function(){view.draw();});
});
