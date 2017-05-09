var watch = require('watch')
var proc = require('child_process');

var extensionTest = function(f){
    console.log('new file: ' + f);

    var idx = f.lastIndexOf('.scala');
    if(idx > 1){
        console.log('creating new tags file' + f);
        var spawn = proc.spawn('./runtags.sh');
        spawn.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });
        spawn.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });
        spawn.on('close', function (code) {
            console.log('child process exited with code ' + code);
        });

    }
};

watch.createMonitor('../webapiapp/src/main/scala', function (monitor) {
    monitor.on("created", function (f, stat) {
        extensionTest(f);
    })
    monitor.on("changed", function (f, curr, prev) {
        extensionTest(f);
    })
    monitor.on("removed", function (f, stat) {
        extensionTest(f);
    })
})
