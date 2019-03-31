var express = require('express');
var multer = require('multer');
var ejs =require('ejs');
const path = require('path');
var bodyParser = require('body-parser');
var dbOperation = require('./dbOperation/user_operation.js');
const app = express();

app.use(function (req, res, next) {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
res.setHeader('Access-Control-Allow-Credentials', true);
next();
});

var filenameGlobal='';
const storage = multer.diskStorage({
	  destination:'./public/upload/',
	  filename: function(req,file,cb){
        filenameGlobal=file.fieldname+'-'+Date.now()+path.extname(file.originalname);
	  	   cb(null,filenameGlobal);
	  }
});

const upload = multer({
	 storage:storage
}).single('file');


app.set('view engine','ejs');


app.use(express.static('./public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


app.get('/',(req,res)=>{

	   res.render('index');
})


app.post('/upload',(req,res)=>{

	 upload(req,res,(err)=>{
              if(err){
              	   res.render('index',{
              	   	msg:err
              	   })
              }
              else{
// var resp = req.file.fieldname+'-'+Date.now()+path.extname(req.file.originalname);
              	 
              	  res.send({"name": filenameGlobal});
              }
	 });
})


app.post('/uploadDetails',(req,res)=>{
	      let name = req.body.name;
	      let email = req.body.email;
	      let profile_pic= req.body.image;
	      let resume = req.body.resume;
	      dbOperation.addUser(name,email,profile_pic,resume,(err,resp)=>{

	      	        if(!err){
	      	        	  console.log("Error in adding userjs");
	      	        }
	      	      res.send({"response":resp});

	      })
	   
})

app.get('/getProfile',(req,res)=>{

  
  dbOperation.getProfilepic('satyendra250896@gmail.com',(resp)=>{

		let pp =  '/public/upload/'+resp[0]['profile_pic'];
		res.sendFile(__dirname + pp );

	})
	     
})

app.get('/getDetails',(req,res)=>{

	

 dbOperation.getUserDetails('satyendra250896@gmail.com',(resp)=>{

		let name =  resp[0]['name'];
		let email = resp[0]['email'];

		res.send({"name":name,"email":email});

	})

})

const port = 3000;

app.listen(port,()=>{
	console.log(`server started on port ${port}`);
})