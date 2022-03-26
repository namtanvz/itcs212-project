
const express=require('express');
const app=express();
const route=express.Router();
const mysql=require('mysql2');
const dotenv=require("dotenv");
//const bp = require("body-parser");
dotenv.config();
app.use("/", route)
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

let dbCon = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

//connect
dbCon.connect(function(error){
    if(error) throw error;
    console.log("Connected to DB:"+process.env.MYSQL_DATABASE);
});

//insert
route.post('/register', function(req, res){
    let users = req.body.users;
    
    if (!users){
        return res.status(400).send({error: true, message: 'Please provide users information'});
    }
    dbCon.query("INSERT INTO personal_info SET ?" ,users, function(error, result){
        if(error) throw error;
        return res.send({error: false, data: result.affectedRows, message: 'New user has been created successfully.'});
    });
});

//UPDATE
route.put('/student', function (req, res){
    let user_id = req.body.user.uid;
    console.log(user_id);
    let user = req.body.user;

    if(!user_id||!user){
        return res.status(400).send({error:true,message:'Please provide user information'});
    }
    dbCon.query("UPDATE personal_info SET ? WHERE uid = ?", [user,user_id], function (error, results){
        if (error) throw error;
        return res.send({error: false, data: results.affectedRows,message:'User has been updated successfully.'});
    });
});

//DELETE
route.delete('/student/:id', function (req, res){
    let user_id = req.body.user.uid;

    if(!user_id){
        return res.status(400).send({error:true,message:'Please provide studentID'});
    }
    dbCon.query("DELETE FROM personal_info WHERE uid = ?", [user_id], function (error, results){
        if (error) throw error;
        return res.send({error: false, data: results.affectedRows,message:'Student has been deleted successfully.'});
    });
});

//SELECT 
route.get('/user/:id', function (req, res){
    let user_id = req.params.id;

    if(!user_id){
        return res.status(400).send({error:true,message:'Please provide userID'});
    }
    dbCon.query("SELECT * FROM personal_info WHERE uid = ?", [user_id], function (error, results){
        if (error) throw error;
        return res.send({error: false, data: results[0],message:'User retrieved.'});
    });
});

//SELECT ALL 
route.get('/users', function (req, res){
    dbCon.query("SELECT * FROM personal_info",function (error, results){
        if (error) throw error;
        return res.send({error: false, data: results,message:'Users list.'});
    });
});

app.listen(3000, function(){
    console.log("Server listening at Port 3000");
});