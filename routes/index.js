var express = require('express');
var router = express.Router();
var jwt=require('jsonwebtoken');

const authenticateToken=(req,res,next)=>{
  const authHeader=req.headers['authorization'];
  //console.log(authHeader);jwt  
  const token=authHeader; //&.....&authHeader //. split('')[1];
  console.log(token);
  if(!token)return res.sendStatus(401);
  jwt.verify(token,process.env.ACCESS_TOKEN,(err,users)=>{
    if(err){
      let newToken = new tokenModel({
        tokens: token        
      });
      newToken.save(newToken);       
        return res.sendStatus(403);
    }
    console.log(users);
    req.users=users;
    console.log(req.users);
    next();
  })
}

router.post('/login',  (req, res, next)=> {
    //var userData=req.body.userData;
    var userName=req.body;
    var user={name:userName.userData,age:userName.age,city:userName.city};
   var token= jwt.sign(user,process.env.ACCESS_TOKEN,{
    
    expiresIn: '1m'    

   });
  
   res.send(token);
});
router.get("/signup",authenticateToken, (req, res)=> {
 console.log(req.users.name);
  res.send("its not expired.."+" "+req.users.name);
});


module.exports = router;
