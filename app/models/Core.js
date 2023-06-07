// La classe Core permet de définir les méthodes de base pour les modèles. Elle est appelée dans les autres modèles pour définir les méthodes de base. Elle est donc une classe abstraite.
const dbClient = require("../config/dbConn");
// la classe Core est une classe abstraite, elle ne peut pas être instanciée.
class Core {
  constructor(obj) {
    if (obj.id) {
      this.obj = obj.id;
    }
  }

// La méthode create permet de créer un nouvel élément dans la base de données. Elle prend en paramètre un objet qui correspond aux données à insérer dans la base de données.
// cette méthode est dynamique, elle peut être utilisée pour créer un nouvel utilisateur, un nouvel article, etc.

  static async create(body) {

     //pour un body tel que celui-ci : 


    //{
    //  "email": "nicolas.denis.72@gmail.com",
    //  "firstname": "Nicolas",
    //  "lastname": "Denis",
    //  "password": "password"
    //}

    //la variable columns va avoir cette forme : [ 'email', 'password', 'lastname', 'firstname' ]
    //la variable parameters va avoir cette forme : [ 'nicolas.denis.72@gmail.com', 'password', 'Denis', 'Nicolas' ]
    //la variable placeholder aura cette forme : $1, $2, $3, $4

    const columns = Object.keys(body);
    const parameters = Object.values(body);
    const placeholders = [...Array(parameters.length).keys()].map(i => `$${i+1}`).join(', ');
    
    const sqlQuery = `INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (${placeholders}) RETURNING id, ${columns.join(', ')}`;

    const response = await dbClient.query(sqlQuery, parameters);
    return response.rows[0];
  }

  static async findAll() {
    const sqlQuery = `SELECT * FROM ${this.tableName}`;
    const response = await dbClient.query(sqlQuery);
    return response.rows;
  }

  static async findOneByField(fieldName, value) {
    const sqlQuery = `SELECT * FROM ${this.tableName} WHERE ${fieldName} = $1`;
    const response = await dbClient.query(sqlQuery, [value]);
    return response.rows[0];
  }

  static async update(body,id) {
    const columns = Object.keys(body);
    const parameters = Object.values(body);

    const setClause = columns.map((col, i) => `"${col}"=$${i+1}`).join(', ');

    const sqlQuery = `UPDATE ${this.tableName} SET ${setClause} WHERE id=$${parameters.length + 1} RETURNING id, ${columns.join(', ')}`;

    const response = await dbClient.query(sqlQuery, [...parameters, id]);
    return response.rows[0];
  }

  static async delete(id) {
    const sqlQuery = `DELETE FROM ${this.tableName} WHERE id=$1`;
    await dbClient.query(sqlQuery, [id]);
  }
}

module.exports = Core;
