// ce module permet de connecter l'application à la base de données.

const {Client} = require('pg');
const client = new Client();

client.connect();

module.exports = client