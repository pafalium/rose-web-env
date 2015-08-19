
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

require(["app/page","app/promise-worker"], function(page, PromiseWorker) {
    /*
        Somehow this function should initialize the prototype.
        Maybe it should require:
            the 3dView;
            the program editor;
            the program evaluation logic;
            the actual user interface assembly (or do it itself);
    */

    // Testing app/page module.

    
    page.editor.setTheme("ace/theme/monokai");
    page.editor.getSession().setMode("ace/mode/javascript");


    // Testing web worker
    var expression = "2 * 4";

    var mycuteworker = new PromiseWorker();
    var cutepromise = mycuteworker.evaluate(expression);
    cutepromise.then(function(val) {
        alert("worker result: "+val);
    });

});
