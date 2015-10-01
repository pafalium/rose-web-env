
require.config({
    shim: {
        "THREE": { 
            exports: "THREE"
        },
        "OrbitControls": {
            deps: ["THREE"],
            exports: "THREE.OrbitControls"
        }
    },
    paths: {
        "Promise": "lib/rsvp-latest",
        "THREE": "lib/three",
        "ace": "lib/ace-builds/src",
        "OrbitControls": "lib/OrbitControls"
    }
});

require(["app/page"], function(page) {
    "use strict";
    /*
        Somehow this function should initialize the prototype.
        Maybe it should require:
            the 3dView;
            the program editor;
            the program evaluation logic;
            the actual user interface assembly (or do it itself);
    */

    
});
