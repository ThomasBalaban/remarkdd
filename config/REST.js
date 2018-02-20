var mysql = require('mysql');
var uuidv1 = require('uuid/v1');
var datetime = require('node-datetime')
var configDb = require('./database.js');

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
};



REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {


	// =====================================
    // LOGIN ===============================
    // =====================================
    router.post('/api/iamjustarobot/login', function(req, res){
    	var query = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
    	var table = ["users_tb", "users_email", req.body.email, "users_password", md5(req.body.password)];
    	query = mysql.format(query, table);
    	connection.query(query, function(err, rows){
    		if(err){
    			res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                //console.log(rows[0].users_email);
                res.json({"Error" : false, "Message" : "login would be successful: ", "Users": rows});
            }
    	});
    });



    // =====================================
    // NEW USER ===============================
    // =====================================
    router.post("/api/iamjustarobot/users", function(req, res){
    	var query = "INSERT INTO ??(??,??,??,??,??,??,??,??,??, ??) VALUES (?,?,?,?,?,?,?,?,?,?)";
        var dt = datetime.create();
        var dtForm = dt.format('Y-m-d H:M:S');
    	var table = ["users_tb", "users_guid", "users_email", "users_password", "users_datecreated", "users_username", "users_fname", "users_lname",
            "users_verifycation", "users_activated", "users_phoneNum", uuidv1(), req.body.email, md5(req.body.password), dtForm, req.body.username, req.body.fname, req.body.lname, uuidv1(), 'nonactive', req.body.pnum];
    	query = mysql.format(query, table);

    	connection.query(query, function(err, rows){
    		if(err){
    			res.json({"Error" : true, "Message" : "Error executing MySQL query" + err});
            } else {
                res.json({"Error" : false, "Message" : "User Added !"});
            }
    	});
    });



    // =====================================
    // SEE ALL USER ===============================
    // =====================================
    router.get("/api/iamjustarobot/users", function(req, res){
    	var query = "SELECT * FROM ??";
    	var table = ["users_tb"];
    	query = mysql.format(query, table);

    	connection.query(query, function(err, rows, fields){
    		if(err) {
                throw err;
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
    	});
    });


    // =====================================
    // Find user by screenname ===============================
    // =====================================
    router.get("/api/iamjustarobot/users/:users_email",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["users_tb","users_email",req.params.users_email];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });



    // =====================================
    // update users password ===============================
    // =====================================
    router.put("/api/iamjustarobot/users", function(req, res){
    	var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    	var table = ["users_tb", "users_password", md5(req.body.password), "users_email", req.body.email];
    	query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the password for email "+req.body.email});
            }
        });
    });



    // =====================================
    // delete user ===============================
    // ====================================
    router.delete("/api/iamjustarobot/users/:email", function(req, res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["users_tb","users_email",req.params.email];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Deleted the user with email "+req.params.email});
            }
        });
    });


    // ===============================================================================================================
    // ===============================================================================================================
    // POSTS   =======================================================================================================
    // ===============================================================================================================
    // ===============================================================================================================
    router.get("/api/iamjustarobot/posts",function(req,res){
        var query = "SELECT posts_tb.posts_name, posts_tb.posts_paragraph, posts_tb.posts_img, posts_tb.posts_section, posts_tb.posts_love, posts_tb.posts_date, posts_tb.posts_x, posts_tb.posts_y, posts_tb.posts_ad, users_username FROM ?? INNER JOIN ?? ON posts_tb.posts_user = users_tb.users_guid ORDER BY posts_tb.posts_love DESC ";
        var table = ["posts_tb", "users_tb"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Posts" : rows});
            }
        });
    });
}

module.exports = REST_ROUTER;