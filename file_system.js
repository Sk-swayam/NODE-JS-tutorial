/*
var fs = require("fs");
// asynchronous read
fs.readFile('input.txt',function(err,data){
    if(err){
            return console.error(err);
    }
    console.log("asynchronous read "+data.toString());

});
//synchronous read
var data=fs.readFileSync('input.txt');
console.log("synchronous read "+data.toString());
console.log("program ended");
*/

//opening a file for reading and writing

var fs = require("fs");  
// Asynchronous - Opening File  
console.log("Going to open file!");  
fs.open('input.txt', 'r+', function(err, data) {  
   if (err) {  
       return console.error(err);  
   }  
  console.log("File opened successfully!");       
});  