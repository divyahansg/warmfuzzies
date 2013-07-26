 var express = require('express')
  , http = require('http');

var app = express();
var server = http.createServer(app);

server.listen(process.env.PORT);
// routing

/*app.get("/", function(req, res) {
  res.redirect("index.html");
});*/
app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/'));
  app.use(express.errorHandler({
    dumpExceptions: true, 
    showStack: true
  }));
  app.use(app.router);
});
