const express = require("express")
const router = express.Router();

const {check, validationResult} = require("express-validator")

var User = require("../../models/Users")  //User MOdel
const gravatar = require("gravatar")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config");



//@route POST api/users
//desc - Register User 
//@access Public

router.post("/", [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Enter a valid email address").isEmail(),
    check("password", "Enter a password with 6 or more").isLength({min:6})
],
async(req, res) => {
    const errors = validationResult(req);
  
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const{name, email, password} = req.body

    try{

        //Check if user already exist
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({errors:[ {msg:"User already exists"} ]})
        }

        //Get user gravatar
        const avatar = gravatar.url(email, {
            s:"200",
            r:"pg",
            d:"mm"
        })

        user = new User({
            name,
            email,
            avatar,
            password
        });

        //Encrypt pswrd
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

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