
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
        "THREE": "lib/three",
        "ace": "lib/ace-builds/src",
        "OrbitControls": "lib/OrbitControls"
    }
});

require(["app/view", "ace/ace"], function(view, ace) {
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
    myDiv.appendChild(view.view.domElement);


    view.view.addBox(1,2,3);
    view.controls.addEventListener( 'change', function() { 
        requestAnimationFrame(function(){view.view.draw();});
    } );

    



    var editor = ace.edit("editor-div");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");

});
