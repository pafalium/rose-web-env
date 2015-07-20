
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

require(["app/page"], function(page) {
    /*
        Somehow this function should initialize the prototype.
        Maybe it should require:
            the 3dView;
            the program editor;
            the program evaluation logic;
            the actual user interface assembly (or do it itself);
    */

    // Testing app/page module.
    
    page.view.controls.addEventListener( 'change', function() { 
        requestAnimationFrame(function(){page.view.draw();});
    } );

    
    page.editor.setTheme("ace/theme/monokai");
    page.editor.getSession().setMode("ace/mode/javascript");

});
