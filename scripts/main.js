
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

require(["app/page", "app/old-evaluator"], function(page, Evaluator) {
    "use strict";
    /*
        Somehow this function should initialize the prototype.
        Maybe it should require:
            the 3dView;
            the program editor;
            the program evaluation logic;
            the actual user interface assembly (or do it itself);
    */

    //var program = page.editor.getValue();
    //var resultScene = evaluator.executeProgram(program);
    //page.view.showScene(resultScene);

    //var cube_geom = new THREE.BoxGeometry(1,1,1);
    //var mat = new THREE.MeshBasicMaterial({color: 0x00ff00});
    //var cube = new THREE.Mesh(cube_geom, mat);
    //var scene = new THREE.Scene();
    //scene.add(cube);
    //page.view.setScene(scene);
    var evaluateProgram = function evaluateProgram() {
        var program = page.editor.getValue();
        var evaluator = new Evaluator();
        var scene = evaluator.evaluate(program);
        page.view.setScene(scene);
    };
    
    var setDelayedProgramEval = (function() {
        var evaluationScheduled = false;
        return function doDelayedProgramEval() {
            if(!evaluationScheduled) {
                evaluationScheduled = true;
                setTimeout(function(){
                    evaluationScheduled = false;
                    evaluateProgram();
                });
            }
        };
    })();

    page.editor.on("change", function(event){
        setDelayedProgramEval();
    });

    setDelayedProgramEval();

});
