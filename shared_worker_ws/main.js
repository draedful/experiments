;(function(SharedWorker){
    var worker = new SharedWorker('worker.js'),
        messageBox = document.getElementById('messageBox'),
        send = function (message) {
            worker.port.postMessage(message);
        };

    function showSystemMessage(e) {
        systemMessageBox.innerHTML+="<li class='system_message'>"+ e.toString()+"</li>"
    }

    function showMessage(e) {
        messageBox.innerHTML+="<li class='message'>"+ e.toString()+"</li>"
    }

    function renderMessage(data){
        var showFunction = showSystemMessage;

        if(data.type == 'message') {
            showFunction = showMessage;
        }

        showFunction(data.message);
    }

    worker.port.onmessage = function(e){
        var data = e.data;
        if(typeof data == 'object'){

            if(data.code){
                switch(data.code){
                    case 1:
                        showMessage('success connection');
                        return;
                }
            }

            renderMessage(data);
        }

    };

    worker.port.start();


})(SharedWorker)