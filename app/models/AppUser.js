// On appelle ici le model Core qui défini les méthodes de base pour les modèles.
const Core = require('./Core')
// On crée ici la classe AppUser qui hérite de la classe Core. Cette classe permet de définir les propriétés de l'objet AppUser.
class AppUser extends Core {
    static tableName = 'app_user';
  
    constructor(obj) {
      super(obj);
  
      this.firstname = obj.firstname;
      this.lastname = obj.lastname;
      this.email = obj.email;
      this.password = obj.password;
    }
}
module.exports = AppUser