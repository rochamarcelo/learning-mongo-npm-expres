//console.log(process.argv);
// var numbers =process.argv.slice(2);
// var sum = numbers.reduce(function(combine, init) {
//   return +combine + +init;
// });
// console.log(sum);
 var fs = require('fs');
 var path = require('path');
 var http = require("http");
 var mymodule = require("./mymodule.js");

 //Syncronous
function readFileSyncronous(file) {
    var buffer = fs.readFileSync(file);
    var text = buffer.toString();
    var lines = text.split('\n').length;
    if (lines > 0) {
        lines--;
    }
    console.log(lines);
}

//Asyncronous
function readFileAsyncronous(file) {
    fs.readFile(file, (err, data) => {
        if (err) {
            console.error(err);
        }
        var text = data.toString();
        var lines = text.split('\n').length - 1;
        console.log(lines);
    });
}


// mymodule.readFileAsyncronous(process.argv[2]);
// mymodule(process.argv[2], process.argv[3], function(err, files) {
//     if (err) {
//       console.error(err);
//     }
//     files.forEach(file => {console.log(file)});
// });
// http.get(process.argv[2], function(response) {
//     response.setEncoding("utf8")
//     response.on("data", (d) => console.log(d))
//             .on("error", console.error);
// }).on("error", console.error);

function getUrlData(id, url, callback) {
    var info = {
        id: id,
        fullData: ""
    };
    http.get(url, function(response) {
        response.setEncoding("utf8")
        response.on("data", (d) => info.fullData += d)
                .on("error", (error) => callback(error, info))
                .on("end", () => callback(null, info));
    }).on("error", (error) => callback(error, info));
}


// var urls = process.argv.slice(2);
// var dataList = [];

// function callbackGetUrlData(error, data) {
//     dataList[data.id] = {error: error, data: data};
    
//     if (dataList.length == urls.length) {
//         dataList
//             .sort((a, b) => {
//                 return a.data.id - b.data.id;
//             })
//             .forEach(item => !item.error && console.log(item.data.fullData));
//     }
// }

// for (var key in urls) {
//     getUrlData(key, urls[key], callbackGetUrlData);
// }

// var net = require('net')  
// var server = net.createServer(function (socket) {  
//     function twoDigits(val) {
//         return (val > 9 ? "" : "0") + val;
//     }
// // socket handling logic  
//     var date = new Date();
//     var month = twoDigits(date.getMonth() + 1); 
//     var day = twoDigits(date.getDate());   
//     var strDate = date.getFullYear() + '-' + month + '-' + day + ' ';
//     strDate += twoDigits(date.getHours()) + ':' + twoDigits(date.getMinutes())
//     socket.write(strDate + '\n');
//     socket.end(); 
// });

// server.listen()
// var http = require('http')  
// var server = http.createServer(function (req, res) {  
//     res.writeHead(200, { 'content-type': 'text/plain' });
//     fs.createReadStream(process.argv[3]).pipe(res);
    
//     var map = require('through2-map')  
//      inStream.pipe(map(function (chunk) {  
//       return chunk.toString().split('').reverse().join('')  
//      })).pipe(outStream)  
// });
// server.listen(process.argv[2])

var http = require('http');
var url = require('url');

var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' }); 
    function apiParseTime(date) {
        return {  
           "hour": date.getHours(),  
           "minute": date.getMinutes(),  
           "second": date.getSeconds()  
        }; 
    }
    function apiUnixTime(date) {
        return {  
           "unixtime": date.getTime(),
        }; 
    }
    function sendResult(data) {
        res.end(JSON.stringify(data));
    }
    function sendError() {
        res.writeHead(404, "Page not found.");
        res.end();
    }
    
    var parsedUrl = url.parse(req.url, true);
    var date = new Date(parsedUrl.query.iso);
    
    if (/^\/api\/parsetime/.test(req.url)) {
        sendResult(apiParseTime(date));
    } else if (/^\/api\/unixtime/.test(req.url)) {
        sendResult(apiUnixTime(date));
    } else {
        sendError();
    }
});
server.listen(process.argv[2]);
