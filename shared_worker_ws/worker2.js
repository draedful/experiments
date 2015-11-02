/**
* воркер который будет генерировать контент
* */

var ports = [];

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

    ports.push(port);

    setInterval(function(){
        ports.forEach(function(port){
           send('ping', port);
        });
    }, 500)
};
