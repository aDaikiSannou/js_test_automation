//Sample modified from PhantomJS 1.8.2 examples
var system = require('system');

if (system.args.length !== 2) {
    console.log('Usage: stop-qunit.js URL');
    phantom.exit(1);
}

var page = require('webpage').create();

// Route "console.log()" calls from within the Page context to the main Phantom context (i.e. current "this")
page.onConsoleMessage = function(msg) {
    console.log(msg);
};

page.open(system.args[1], function(status) {
    if (status !== "success") {
        console.log("Unable to access network");
        phantom.exit(1);
    } else {
        phantom.exit(0);
    }
});
