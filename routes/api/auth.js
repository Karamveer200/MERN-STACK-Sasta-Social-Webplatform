const express = require("express")
const router = express.Router();
const auth = require("../../middleware/auth")
const User = require("../../models/Users")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config");

const {check, validationResult} = require("express-validator")

//@route GET api/auth
//desc - Test Route
//@access Public

router.get("/", auth, async(req, res) => {

    try{
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error")
    }
});


//@route POST api/users
//desc - Login User 
//@access Public

router.post("/", [
    check("email", "Enter a valid email address").isEmail(),
    check("password", "Enter a password with 6 or more").isLength({min:6})
],
async(req, res) => {
    const errors = validationResult(req);
  
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const{email, password} = req.body

    try{

        //Check if emailexist
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({errors:[ {msg:"Invalid Credentials"} ]})
        }

        const pswrdMatch = await bcrypt.compare(password, user.password);

        if(!pswrdMatch)
            return res.status(400).json({errors:[ {msg:"Invalid Credentials"}]});
        

        //Return JsonWEBToken
        const payload ={
            user:{
                id:user.id
            }
        }
        
        jwt.sign(
            payload,
            config.get("jwtSecret"),
            {expiresIn:36000}, 
            (err, token)=>{
                if(err) throw err;
                res.json({token})

            });

    }catch(error){
        console.log(error.message);
        res.status(500).send("Server error");
    }

});


module.exports = router;