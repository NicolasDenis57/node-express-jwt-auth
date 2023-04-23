const Core = require('./Core')

class AppUser extends Core {
    static tableName = "app_user";
    constructor(obj){
        super(obj)
        this.firstname = obj.firstname;
        this.lastname= obj.lastname;
        this.email = obj.email;
        this.password= obj.password;
    }
}
module.exports = AppUser