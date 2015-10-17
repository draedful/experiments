var ports = [];
var countConnection = 0;
var magicNumber = 42;

function send(e, port) {
    if(!port){
        ports.forEach(function(port){
            port.postMessage(e);
        });
    } else {
        port.postMessage(e);
    }

}

onconnect = function(e) {
    var port = e.ports[0];

    port.onmessage = function(e) {
        port.postMessage('ping, '+e);
    };
    send({type: 'message',  message: 'Hello!!!'}, port);
    send({type: 'system', code:1}, port);

    send({type: 'system', message: 'Added connection'});

    ports.push(port);
};