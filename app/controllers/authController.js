const authController = {
    signup_get(req, res){
       res.render('signup');
    },
    login_get(req, res){
        res.render('login');
     },
     signup_post(req, res){
        const { email, password } = req.body;
        console.log(email, password)
        res.send('new signup');
     },
     login_post(req, res){
        const { email, password } = req.body;
        console.log(email, password)
        res.send('user login');
     }
};

module.exports = authController;
