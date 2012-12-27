ROOT = __dirname + '/public/';
APP = __dirname + '/app/';

// setup application
var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server)
  , redis = require('redis')
  , Sync = require('backbone-redis');

// rpc
var rpc = require('jsonrpc2');
var services = require(APP + 'services');

// session store
var RedisStore = require('connect-redis')(express);

// Configuration
app.configure(function () {

  app.use(express.logger());
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(express.session({
    secret: 'bladi',
    store: new RedisStore
  }));
  // and serve static files straight away
  app.use(express.static(ROOT, {
    maxAge: 31536000000 // one year
  }));
  // inject rpc handler
  var server = new rpc.Server(app, '/rpc');
  server.exposeModules(services, services);
  // put the main router last
  app.use(app.router);
});
// specific to development
app.configure('development', function () {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});
// specific to production
app.configure('production', function () {
  app.use(express.errorHandler());
});

// Configure Redis client
var redisOptions = {
  maxReconnectionAttempts: 10,
  parser: 'javascript',
  return_buffer: false
};
redisClient = redis.createClient(6379, '127.0.0.1', redisOptions);
var pub = redis.createClient(6379, '127.0.0.1', redisOptions);
var sub = redis.createClient(6379, '127.0.0.1', redisOptions);
Sync.config({
  io: io,
  database: redisClient,
  publish: pub,
  subscribe: sub
});

// start listening
if (!module.parent) {
  app.listen(8080);
  console.log("Express server listening on port 8080");
}