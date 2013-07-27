 var express = require('express')
  , http = require('http'),
  ejs = require('ejs');

var app = express();
var server = http.createServer(app);

server.listen(process.env.PORT);
// routing

/*app.get("/", function(req, res) {
  res.redirect("index.html");
});*/
app.get('/:id', function(req, res) {
    res.render('index', {id:req.params.id});
});
app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/'));
  app.use(express.errorHandler({
    dumpExceptions: true, 
    showStack: true
  }));
  app.set('view engine', 'ejs');
  app.set('view options', {
    layout: false
  });
  app.use(app.router);
});
