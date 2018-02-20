// Set up
var express = require('express');
var router = express.Router();

// Middleware
var bodyParser = require('body-parser');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mysql = require('mysql');
var md5 = require('MD5');
var uuidv1 = require('uuid/v1');
var passport = require('passport');
var morgan = require('morgan');
var favicon = require('serve-favicon')
var path = require('path')

var routes = require('./config/index.js');
var rest = require("./config/REST.js");
var configDb = require('./config/database.js');

var knex = require('knex')(configDb);
var Bookshelf = require('bookshelf')(knex);

var app = express();

// Confirguration 
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
//app.use(morgan('dev'));
app.set('view engine','jade'); 
app.use(favicon(path.join(__dirname,'public','img','favicon.ico')));

function REST(){
	var self = this;
	self.connectMysql();
};

REST.prototype.connectMysql = function() {
	var self = this;
	var pool = mysql.createPool(configDb);

	pool.getConnection(function(err, connection){
		if (err) {
		    console.error('error connecting: ' + err.stack);
		    self.stop(err);
		    return;
		} else {
			self.configureExpress(connection);
		}
		console.log('connected as id ' + connection.threadId);
	});
};


REST.prototype.configureExpress = function(connection) {
	var self = this;
	app.set('view engine', 'jade');
	app.use('/api', router);
	var rest_router = new rest(router, connection, md5);
	self.startServer();
};

var port = process.env.PORT || 8000;


//Folders that users get access to
app.use(express.static('./public/css/'));
app.use(express.static('./public/img/'));
app.use(express.static('./public/img/page-elems/'));
app.use(express.static('./public/img/img-posts/'));
app.use(express.static('./public/img/img-user/'));
app.use(express.static('./public/img/intro-image/'));
app.use(express.static('./public/data/'));
app.use(express.static('./public/fonts/bebas/'));
app.use(express.static('./public/fonts/nunito/'));
app.use(express.static('./public/fonts/chunk/'));
app.use(express.static('./public/js/'));
app.use(express.static('./public/js/libs/'));
app.use(express.static('./public/data/'));
app.use(express.static('./node_modules/angular/'));
app.use(express.static('./node_modules/angular-animate/'));
app.use(express.static('./node_modules/angular-route/'));


// Gets routes as needed

// Prerenders for angular
app.use('/', router);
app.get('/pages/:name', routes.partials);

// sets up server
REST.prototype.startServer = function() {
	app.listen(port, function(){
		console.log("server on: " + port);
	});
}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL n" + err);
    process.exit(1);
}

new REST();


// session 
app.set('trust proxy', 1) // trust first proxy
app.use(session({
	genid: function(req) {
	    return uuidv1() // use UUIDs for session IDs
	},
	secret: 'not another one plx',
	cookie: {}
}));

app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});

// Actual Routes
require('./config/routes.js')(app); 
