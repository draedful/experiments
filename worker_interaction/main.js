;(function(){
    var worker = new Worker('worker.js');
        worker.onmessage = function(e) {
            console.debug('worker', e.data);
        };



    var sw = createSharedWorker();
    worker.postMessage({type: 'port', port: sw.port}, [sw.port]);

    sw = createSharedWorker();

    sw.port.onmessage = function(e){
        console.debug('shared worker', e.data);
    };

    sw.port.start();

    document.getElementById('magicNumber').onchange = function(e){
        sw.port.postMessage({type: 'change:magic', value: e.target.value});
    };


    function createSharedWorker(){
        return new SharedWorker('shared_worker.js');
    }
})();