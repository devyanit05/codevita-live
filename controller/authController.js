var User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config')

//* Create a user
exports.create = async (req, res) => {
    try{
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            obj.error = "Sorry user with this email already exists"
            return res.status(400).json(obj)
        }

        const {username, email, password} = req.body;

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        user = new User({
            name: username,
            email,
            password: secPass
        })

        //* for auth status
        let obj = {
            success: false,
            authtoken: null,
            error: null
        }

        user.save()
        .then(()=>{
            //* creating token 
            const data = {
                user:{
                    id: user.id
                }
            }
            obj.authtoken = jwt.sign(data, JWT_SECRET);
            obj.success = true;
        })
        .then(()=>{
            console.log("User Created");
            res.json(obj);
        }).catch((err) => {
            obj.error = err.message;
            console.log(err.message)
            res.status(500).json(obj);
        })
    }
    catch(err){
        console.log(err.message)
        res.status(500).send("Internal Server Error");
    }
}

//* Sign in a User
exports.login = async (req,res) => {
    const {password, username} = req.body;
     //* for auth status
     let obj = {
        success: false,
        authtoken: null,
        error: null
    }
    
    try{
        // finding the use rfrom the Data
        let user = await User.findOne({name: username})
        if(!user){
            obj.error = "Enter valid Credentials"
            res.status(400).json(obj)
        }

        let passwordCompared = await bcrypt.compare(password,user.password)
        if(!passwordCompared){
            obj.error = "Enter valid Credentials"
            res.status(400).json(obj)
        }

        const data = {
        user:{
            id: user.id
            }
        }
        
        // aurhenticate 
        obj.authtoken = jwt.sign(data, JWT_SECRET);
        obj.success = true
        // res.json(user)
        console.log("User Verified")
        res.json(obj)
  }catch(error){
        console.log(error.message)
        res.status(500).send("Internal Server Error")
  }
}

