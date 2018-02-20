var mysql = require('mysql');
var uuidv1 = require('uuid/v1');
var configDb = require('./database.js');
var md5 = require('MD5');


// app/routes.js
module.exports = function(app) {

    var connection = mysql.createConnection(configDb);

    // unlock global vars
    app.get('*', function(req, res, next) {
        var sess = req.session;
        sessEmail = sess.email || null;
        sessGuid = sess.guid || null;
        sessPass = sess.pass || null;
        next();
    });

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================

    app.get('/', function(req, res) {
        res.render('index', {}); 
    });

    // =====================================
    // END HOME PAGE (with login links) ========
    // =====================================
    

    // =====================================
    // LOGIN ===============================
    // =====================================

    app.get('/login', function(req, res) {
        var logInError = req.logInError;

        /*if(sess.email != "" && sess.email) {
            res.write('<p>username: ' + sess.email + '</p>')
            res.end();
        } else {
            res.render('login');
        }*/

        res.render('login', {});

    });

    app.post('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        sess = req.session;
        var useremail = '';
        var userguid = '';
        var userspass = '';
        var query = "select * from ?? WHERE ?? = ? AND ?? = ?";
        var table = ["users_tb", "users_email", req.body.email, "users_password", md5(req.body.password)];
        query = mysql.format(query, table);

        connection.query(query, function(err, rows, fields){
            if(err) {
                throw err;
                console.log('connection failed');
            } else {
                if ( rows[0] ) {
                    console.log(rows[0]);
                    useremail = rows[0].users_email;
                    sess.email = useremail;
                    userguid = rows[0].users_guid;
                    sess.guid = userguid;
                    userspass = rows[0].users_password;
                    sess.pass = userspass;
                    res.redirect('/');
                } else {
                    logInError = "Failed to login";
                    req.session.destroy();
                    console.log(logInError);
                    res.render('login');
                }
            }
        });
    });

    // =====================================
    // END LOGIN PAGE ===============================
    // =====================================


    // =====================================
    // PROFILE SECTION =====================
    // =====================================

    app.get('/profile', function(req, res) {
        res.render('profile', {} );
    });

    app.get('/messagecenter', function(req, res){
        res.render('messagecenter', {});
    });

    // =====================================
    // END PROFILE SECTION =====================
    // =====================================

    // =====================================
    // PROFILE SETTING SECTION =====================
    // =====================================

    app.get('/settings', function(req, res){
        res.render('settings', {});
    });
    app.get('/preferences', function(req, res){
        res.render('preferences', {});
    });
    app.get('/account-settings', function(req, res){
        res.render('account-settings', {});
    });
    app.get('/privacy', function(req, res){
        res.render('privacy', {});
    });
    app.get('/subscriptions', function(req, res){
        res.render('subscriptions', {});
    });
    app.get('/partner-settings', function(req, res){
        res.render('partner-settings', {});
    });

    // =====================================
    // END PROFILE SECTION =====================
    // =====================================
   
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.session.destroy();
        res.redirect('/');
    });

    // =====================================
    // END LOGOUT =====================
    // =====================================



    // =====================================
    // get user by name ==============================
    // =====================================

    app.get('/:name', function(req, res){
        res.render('users', {});
    });

    // =====================================
    // END get user by name ==============================
    // =====================================
};