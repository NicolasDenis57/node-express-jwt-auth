const dbClient = require("../services/dataBase");

class Core {
  constructor(obj) {
    if (obj.id) {
      this.obj = obj.id;
    }
  }


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

  static async create(body) {
    const columns = Object.keys(body);
    const parameters = Object.values(body);
    const placeholders = [...Array(parameters.length).keys()].map(i => `$${i+1}`).join(', ');
    
    const sqlQuery = `INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (${placeholders}) RETURNING id, ${columns.join(', ')}`;

    const response = await dbClient.query(sqlQuery, parameters);
    return response.rows[0];
  }
}

module.exports = Core;
