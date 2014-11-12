
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  path = require('path'),
  http = require('http'),
  app = express(),
  server = require('http').createServer(app),
  io = require("socket.io")(server);





/**
 * Configuration
 */

// all environments

// app.engine('.html', require('html'));

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
};


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
app.get('/home', routes.index);
app.get('/game', routes.index);
app.get('/highscore', routes.index);

//io sockets
io.on('connection', function(socket) {
  console.log('A user has connected')
});
/**
 * Start Server
 */

server.listen(app.get('port'), function () {

  console.log('Express server listening on port ' + app.get('port'));
});
