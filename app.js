/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , https = require('https')
  , fs = require('fs')
  , path = require('path');
  //, EmployeeProvider = require('./employeeprovider').EmployeeProvider;

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout: false});
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var hskey = fs.readFileSync('./ssh/hacksparrow-key.pem');
var hscert = fs.readFileSync('./ssh/hacksparrow-cert.pem');
var options = {
    key: hskey,
    cert: hscert
};

var staticRoot = path.join(__dirname, './');
app.get('/', function(req, res) {
      res.sendfile(staticRoot + 'index.html'); // load our public/index.html file
  });


//app.listen(process.env.PORT || 3000);

var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);

httpServer.listen(3000, function() {
  //  console.log('app running on port', app.get('prodPortHttp'));
});
