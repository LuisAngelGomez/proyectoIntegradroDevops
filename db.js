const mysql = require('mysql2');

// En Docker, usamos el nombre del servicio 'db' como host
const connection = mysql.createPool({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'durango',
  waitForConnections: true,
  connectionLimit: 10
});

console.log('Pool de conexiones a MySQL creado exitosamente.');

module.exports = connection.promise();