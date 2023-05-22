const appController = {
    home(req, res){
       res.render('home');
    },
    smoothies(req, res){
        res.render('smoothies');
    }
};

module.exports = appController;