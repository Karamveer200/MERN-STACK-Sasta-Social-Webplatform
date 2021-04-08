const express = require("express");
const {check, validationResult, body } = require("express-validator");
const router = express.Router();
const auth = require("../../middleware//auth")
const Profile = require("../../models/Profile");
const Users = require("../../models/Users");
const Posts = require("../../models/Post")

const request = require("request");
const config = require("config")
const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './uploads/')
    },
    filename:function(req,file,cb){
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(null, true)
    }
    else{
        cb(null, false)
    }
};

const upload = multer({
    storage:storage,
    limits:{
        fileSize:1024 * 1024 * 5
    },
    fileFilter:fileFilter
});




//@route GET api/profile/me
//desc - Gett current User Prof
//@access Private

router.get("/me", auth, async(req, res) => {

    try{
        const profile = await Profile.findOne({user: req.user.id}).populate("user", ["name", "avatar"]);

        if(!profile)
            return res.status(400).json({msg:"There's no profile for this user"});
        
        res.json(profile);

    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
    });


    
router.post('/upload', upload.single('profilePic'), auth,async(req, res) => {
    console.log(req.file);
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.pic="uploads\\user.png"
    if (req.file)profileFields.pic = req.file.path;
    res.redirect('back')

})
// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
    '/',
    upload.single('profilePic'),
    [
        auth,
        [
            check("status","status is required").not().isEmpty(),
            check("skills", "skills is required").not().isEmpty()
        ]
    ],
    async(req, res) => {
      const errors = validationResult(req);
  
      // Check Validation
      if (!errors.isEmpty()) {
        // Return any errors with 400 status
        return res.status(400).json({errors:errors.array()});
      }
      

      // Get fields
      const profileFields = {};
      profileFields.user = req.user.id;
      
     
      if (req.file)profileFields.pic = req.file.path
      else if(profileFields.pic!=""){}
      else{
        profileFields.pic="uploads/user.png"
      }
      if(profileFields.pic){}
      else{profileFields.pic="uploads/user.png"}
      if (req.body.handle) profileFields.handle = req.body.handle;
      if (req.body.company) profileFields.company = req.body.company;
      if (req.body.website) profileFields.website = req.body.website;
      if (req.body.location) profileFields.location = req.body.location;
      if (req.body.bio) profileFields.bio = req.body.bio;
      if (req.body.status) profileFields.status = req.body.status;
      if (req.body.githubusername)
        profileFields.githubusername = req.body.githubusername;

      // Skills - Spilt into array
      if (req.body.skills) {
        profileFields.skills = req.body.skills.split(',').map(skills=> skills.trim());
        console.log(profileFields.skills);
      }
  
      // Social
      profileFields.social = {};
      if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
      if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
      if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
      if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
      if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
      
      try{
        var profile = await Profile.findOne({user: req.user.id})
        
        if(profile){
            profile = await Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profileFields},
                {new: true}
            )
            return res.json(profile);
        }
        
        profile = new Profile(profileFields);
        
        await profile.save();
        res.json(profile);

      }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error")
      }
    }
  );

    // @route   GET api/profile/all
    // @desc    Get all profiles
    // @access  Public
    router.get("/", async(req, res)=>{

        try {
            const profile = await Profile.find().populate("user", ["name", "avatar"])

            res.json(profile);
        } catch (error) {
          console.log(error.message);
          res.status(500).send("Server error")  
        }
        
    })

    // @route   GET api/profile/user/:user_id
    // @desc    Get userID profile
    // @access  Public
    router.get("/user/:user_id", async(req,res)=>{
       
        try {
            const profile = await Profile.findOne({user:req.params.user_id}).populate("user", ["name", "avatar"]);
            if(!profile)
                return res.status(400).json({msg: "Profile Not Found"})
            
            res.json(profile);


        } catch (error) {
            console.log(error.message);

            if(error.kind == "ObjectId")
                return res.status(400).json({msg: "Profile Not Found"});
            
            return res.status(500).send("Server Error")
        }
    })


    // @route   DELETE api/profile
    // @desc    DELETE profile, post, user
    // @access  Public
    router.delete("/", auth, async(req,res)=>{
        try {
            //Delete Posts
            await Posts.deleteMany({user:req.user.id})

            //Delete Profile
            await Profile.findOneAndRemove({user:req.user.id})

            //Delete User
            await Users.findByIdAndRemove({_id: req.user.id})

            res.json({msg:"User Removed"})
            
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error")
        }
    })

    // @route   PUT api/profile/experience
    // @desc    Add profile experience
    // @access  Public
    router.put("/experience", [auth, 
        [
        check("title","Title is required").not().isEmpty(),
        check("company","Company is required").not().isEmpty(),
        check("from", "From date is required").not().isEmpty()
    
        ] 
      ], async(req, res) =>{
            const errors = validationResult(req);
            
            if(!errors.isEmpty())
                 return res.status("400").json({errors:errors.array()});

            const {
                title,
                company,
                location,
                from,
                to,
                current,
                description
            } = req.body;

            const newExp = {
                title,
                company,
                location,
                from,
                to,
                current,
                description
            }

            try {
               
                const profile = await Profile.findOne({user:req.user.id});
                profile.experience.unshift(newExp);

                await profile.save();

                res.json(profile);
            } catch (error) 
            { 
                console.log(error.message);
                res.status("500").send("Server Error")    
            }
      }
        )

    // @route   PUT api/profile/education
    // @desc    Add profile education
    // @access  Private
      router.put("/education", [auth,[
          check("school","School is required").not().isEmpty(),
          check("degree","degree is required").not().isEmpty(),
          check("fieldofstudy","Field of Study is required").not().isEmpty(),
          check("from","From date is required").not().isEmpty()
        ]
      ] , async (req, res)=>{
            const errors = validationResult(req);
            if(!errors.isEmpty())
                return res.status("400").json({errors: errors.array()})

            const {
                school,
                degree,
                fieldofstudy,
                from,
                to,
                current,
                description
            } = req.body;

            const newEducation = {
                school,
                degree,
                fieldofstudy,
                from,
                to,
                current,
                description
            }

            try {
                
                const profile = await Profile.findOne({user: req.user.id})
                profile.education.unshift(newEducation);

                await profile.save();

                res.json(profile);

            } catch (error) 
            {
                console.log(error.message);
                return res.status("500").send("Server Error")   
            }
      })


    // @route   DELETE api/profile/experience/:exp_id
    // @desc    DELETE profile experience
    // @access  Private
    router.delete("/experience/:exp_id", auth, async (req,res)=>{

        try {
            const profile = await Profile.findOne({user: req.user.id});

            removeIndex = profile.experience.map(item=> item.id).indexOf(req.params.exp_id);

            profile.experience.splice(removeIndex, 1);

            await profile.save();

            res.json(profile);
        } catch (error) {
            console.log(error.message);
            return res.status("500").send("Server Error") 
            
        }
    })


    // @route   DELETE api/profile/education/:edu_id
    // @desc    DELETE profile education
    // @access  Private
    router.delete("/education/:edu_id", auth, async (req,res)=>{

        try {
            
            const profile = await Profile.findOne({user: req.user.id});

            removeIndex = profile.education.map(item=> item.id).indexOf(req.params.edu_id);

            profile.education.splice(removeIndex, 1);

            await profile.save();

            res.json(profile);
        } catch (error) {
            console.log(error.message);
            return res.status("500").send("Server Error") 
        }
    })

    // @route   GET api/github/username
    // @desc    Fetch last 5 repos
    // @access  Public
    router.get("/github/:username", async (req,res)=>{

        try {
            const options = {
                uri:"https://api.github.com/users/"+req.params.username+"/repos?per_page=5&sort=created:asc&client_id="+ config.get('githubClientID') +"&client_secret="+ config.get('githubSecret'),
                method:"GET",
                headers:{"user-agent":"node.js"}
                
            }
           
            request(options,(error, responce, body)=>{
            
                if(error)
                    console.error(error);
                
                if(responce.statusCode != 200)
                    return res.status("404").json({msg:"No Github Profile found"})
                
                return res.json(JSON.parse(body));
            });
           
        } catch (error) {
            console.log(error.message);
            res.send("500").send("Server Error");
        }
    })
module.exports = router;