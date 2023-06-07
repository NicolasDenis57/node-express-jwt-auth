// On appelle ici le model Core qui défini les méthodes de base pour les modèles.
const Core = require("./Core");
const dbClient = require("../config/dbConn");
// On crée ici la classe AppUser qui hérite de la classe Core. Cette classe permet de définir les propriétés de l'objet AppUser.
class Recipe extends Core {
  static tableName = "recipe";

  constructor(obj) {
    super(obj);

    this.name = obj.name;
    this.ingredients = obj.ingredients;
    this.img = obj.img;
    this.userId = obj.userId
    
  }

}
module.exports = Recipe;