const User = require('../models/AppUser');

const authController = {
    signup_get(req, res){
       res.render('signup');
    },
    login_get(req, res){
        res.render('login');
     },
     async signup_post(req, res){
        const { email, password, firstname, lastname } = req.body;
        
        try {
         const user = await User.create({email, password, lastname, firstname});
         res.status(201).json(user);
        }
        catch (error) {
         console.log(error);
         res.status(400).send('error, user not created');
        }
     },
     async login_post(req, res){
        const { email, password } = req.body;
        console.log(email, password)
        res.send('user login');
     }
};

module.exports = authController;
