;(function(SharedWorker){
    var messageBox1 = document.getElementById('messageBox1'),
        messageBox2 = document.getElementById('messageBox2'),
        messageBox3 = document.getElementById('messageBox3'),
        messageWorker = new SharedWorker('worker2.js');

    function showMessage(box, e) {
        box.innerHTML+="<div class='message'>"+ e.toString()+"</div>"
    }

    function createWorker(worker, box){
        worker.port.onmessage = function(e){
            var data = e.data;
            if(data == 'worker:get'){
                worker.port.postMessage(messageWorker.port, [messageWorker.port])
            }else if(data == 'worker:success'){
                messageWorker.port.start();
            }else{
                showMessage(e,data);
            }

        };

        worker.port.start();
    }

    createWorker(new SharedWorker('worker.js'), messageBox1);
    createWorker(new SharedWorker('worker1.js'), messageBox2);
    /*messageWorker.port.onmessage = function(e){
        var data = e.data;
        showMessage(messageBox3, data);

    };*/

    //createWorker(messageWorker, messageBox3);

})(SharedWorker)