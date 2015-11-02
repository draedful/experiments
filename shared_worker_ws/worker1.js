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

function subscribe(port){
    port.onmessage = function(e) {
        ports.forEach(function(port) {
            send(e, port);
        })
    }
    port.start();
}

onconnect = function(e) {
    var port = e.ports[0];

    ports.push(port);
    var SharedWorker = SharedWorker || false;
    if(!SharedWorker){
        send('worker:get', port);
        port.onmessage = function(e) {
            var resp = e.data;
            if(resp.type == 'worker') {
                subscribe(resp.port);
            }
        }
    }else{
        var worker = new SharedWorker('worker2.js');
        subscribe(worker.port);
        worker.port.start();
    }
};