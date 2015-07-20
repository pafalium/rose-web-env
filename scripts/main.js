
require.config({
    shim: {
        "THREE": { 
            exports: "THREE"
        }
    },
    paths: {
        "THREE": "lib/three",
        "ace": "lib/ace-builds/src"
    }
});

require(["THREEView", "ace/ace"], function(THREEView, ace) {
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
    myDiv.appendChild(view.domElement);


    view.addBox(1,2,3);
    requestAnimationFrame(function(){view.draw();});



    var editor = ace.edit("editor-div");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");

});
