# Взаимодействие между воркерами

Chrome не умеет создавать воркеров из контектса воркера, как это умеет делать Firefox, но есть возможность передать
порт SharedWorker-а через postMessage с указанием transferList

## Данный проект показывает как можно заставить работать два воркера

### main.js
#### Создание DedicatedWorker
```javascript
var worker = new Worker('worker.js');
```
#### Подписываемся на сообщения от DedicatedWorker
Каждое сообщение от воркера, сразу отсылаем в консоль. В качестве аргумента, функция принимает объект сообщения, 
сам объект является потомком от объекта Event, т.е нам доступно управление событиями через preventDefault,
stopPropagation, stopImmediatePropagation
```javascript
worker.onmessage = function(e) {
    console.debug('worker', e.data);
}
```

#### Передаем порт SharedWorker-а DedicatedWorker-у
В качестве второго аргумента функции postMessage указывается transferList, для передачи порта воркеры. 
Если не использовать transferList, то в процессе сериализации/десереализации объект потеряет свою функициональность.
```javascript

function createSharedWorker(){
    return new SharedWorker('shared_worker.js');
}

var sw = createSharedWorker();
worker.postMessage({type: 'port', port: sw.port}, [sw.port]);
```

После передачи порта, основной контекст потеряет связь с созданным SharedWorker-ом, поэтому ее нужно перезагрузить, 
для этого просто повторяем процесс создания SharedWorker-а

```javascript
sw = createSharedWorker();

sw.port.onmessage = function(e){
    console.debug('shared worker', e.data);
};

sw.port.start();
```
