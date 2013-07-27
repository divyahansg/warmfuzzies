 var express = require('express')
  , http = require('http'),
  jade = require('jade');

var app = express();
var server = http.createServer(app);

server.listen(process.env.PORT || 3000);
// routing

app.get("/", function(req, res) {
  res.render("index");
});
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
  app.set('view engine', 'jade');
  app.set('view options', {
    layout: false
  });
  app.use(app.router);
});
