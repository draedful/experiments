var swPort = void 0;
self.addEventListener('message', function(e){
    if(e.data && e.data.type == 'port'){
        startPort(e.data.port);
    }
});

function startPort(port) {
    port.onmessage = function(e){
        self.postMessage(e.data);
    };
    port.start();
}