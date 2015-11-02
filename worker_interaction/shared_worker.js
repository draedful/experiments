var ports = [];
var meaningOfLife = 42;
setInterval(function(){
    if(ports){
        ports.forEach(function(port){
            port.postMessage(meaningOfLife);
        })
    }
}, 500);

self.onconnect = function(e){
    var port = e.ports[0];
    ports.push(port);

    port.onmessage = function(e){
        if(e.data && e.data.type == 'change:magic'){
            meaningOfLife = e.data.value;
        }
    }

};