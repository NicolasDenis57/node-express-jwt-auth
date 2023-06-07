// On appelle ici le model Core qui défini les méthodes de base pour les modèles.
const Core = require("./Core");
const dbClient = require("../config/dbConn");
const bcrypt = require("bcrypt");
// On crée ici la classe AppUser qui hérite de la classe Core. Cette classe permet de définir les propriétés de l'objet AppUser.
class AppUser extends Core {
  static tableName = "app_user";

  constructor(obj) {
    super(obj);

    this.firstname = obj.firstname;
    this.lastname = obj.lastname;
    this.email = obj.email;
    this.password = obj.password;
  }

  static async login(email, password) {
    const sqlQuery = `SELECT * FROM app_user WHERE "email"='${email}'`;

    const result = await dbClient.query(sqlQuery);

    if (result.rows[0]) {
      const auth = await bcrypt.compare(password, result.rows[0].password);
      if (auth) {
        delete result.rows[0].password;
        return result.rows[0];
      }
      throw Error("Identification failed");
    }
    throw Error("Identification failed");
  }
}
module.exports = AppUser;
