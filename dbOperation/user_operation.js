const mysql = require('mysql');
var connection = require('./connect');

connection.connect(function(err){
	  if(err){
	  	  console.err("Error in connecting "+err);
	  	  return ;
	  }

	  console.log('Connected as id ' + connection.threadId);
})


var addUser = function(name,email,profile_pic,resume,callback){
connection.query(`insert into USERS(name,email,profile_pic,resume) values('${name}','${email}','${profile_pic}','${resume}')`,(err,res)=>{


                   if(err){
                   	   console.log("Error in add user query ");
                   }
                   else{
                   	    callback("Success");
                   }
	          })
}


var getUserDetails = function(email,callback){
	   connection.query(`select name,email from USERS where email='${email}'`,(err,res)=>{
	   	       if(err){
	   	       	  console.log("error in get userdetails");
	   	       }
	   	       else{
	   	       	callback(res);
	   	       }
	   })
}

var getProfilepic = function(email,callback){
	connection.query(`select profile_pic from USERS where email='${email}'`,(err,res)=>{

             if(err){
             	console.log("error in get profile pic ");
             }else{
             	callback(res);
             }
	})
}


module.exports = {

	
	addUser,
	
	getUserDetails,
	getProfilepic
	
}
