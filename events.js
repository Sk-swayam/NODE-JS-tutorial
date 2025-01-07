/*Events and Callbacks look similar but the differences lies in the fact that callback functions are called when an asynchronous function returns its result where as event handling works on the observer pattern. Whenever an event 
 gets fired, its listener function starts executing
 */

 var events=require('events');
 var eventemitter= new events.EventEmitter();
 //create event handler
 var connecthandler=function connected(){
    console.log('connection successful');
 //fire the data_received event
 eventemitter.emit('data_received');
}
//bind connection event with handler
eventemitter.on('connection',connecthandler)
//bind the data_received event with anonymous function
eventemitter.on('data_received',function(){
    console.log('data received successfullly');
});
//fire connection event
eventemitter.emit('connection');
console.log("program ended");