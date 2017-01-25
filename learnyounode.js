//Learn you node solutions
function challenge1() {
    var express = require("express")
    var app = express()
    app.get("/home", (req, res) => {
        res.end("Hello World!");
    });
    app.listen(process.argv[2]);
}

function challenge2() {
    var express = require("express")
    var path = require("path")
    var app = express()
    
    app.get("/home", (req, res) => {
        res.end("Hello World!");
    });
    app.use(express.static(process.argv[3]||path.join(__dirname, 'public')));
    app.listen(process.argv[2]);
}
// challenge2();

function challenge3() {
    var express = require("express")
    var path = require("path")
    var app = express()
    app.set('view engine', 'jade');
    app.set('views', process.argv[3])
    app.get('/home', function(req, res) {
      res.render('index', {date: new Date().toDateString()})
    })
    app.listen(process.argv[2]);
}
// challenge3();

function challenge4() {
    var bodyparser = require("body-parser");
    var express = require("express")
    var path = require("path")
    var app = express()
    
    app.use(bodyparser.urlencoded({extended: false}))
    
    app.post('/form', function(req, res) {
      res.end(req.body.str.split('').reverse().join(''));
    })
    
    app.listen(process.argv[2]);
}
// challenge4();

function challenge5() {
    var express = require("express")
    var path = require("path")
    var app = express()
 
    app.use(require('stylus').middleware(process.argv[3]||path.join(__dirname, 'public')));
    app.use(express.static(process.argv[3]||path.join(__dirname, 'public')));
    
    app.listen(process.argv[2]);
}
// challenge5();

function challenge6() {
    var crypto =  require('crypto')
    var express = require("express")
    var path = require("path")
    var app = express()
    
    app.put('/message/:id', function(req, res) {
        var hash = crypto.createHash('sha1')
            .update(new Date().toDateString() + req.params.id)
            .digest('hex')
        res.end(hash);
    })
    
    app.listen(process.argv[2]);
}
// challenge6();

function challenge7() {
    var url =  require('url')
    var express = require("express")
    var app = express()
    
    app.get('/search', function(req, res) {
        // var query = url.parse(req.url, true).query;
        // var data = JSON.stringify(query);
        var data = JSON.stringify(req.query);
        res.end(data);
    })
    
    app.listen(process.argv[2]);
}
// challenge7();

function challenge8() {
    var fs = require('fs')
    var express = require("express")
    var app = express()
    
    app.all('/books', function(req, res) {
       fs.readFile(process.argv[3], (error, data) => {
            var data = JSON.parse(data);
            res.json(data);
       });
    })
    
    app.listen(process.argv[2]);
}
challenge8();
