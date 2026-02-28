const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const app = express();
const port = 3000;

//Configuración de la Base de Datos 
const db = mysql.createPool({
  host: 'db',         // Nombre del servicio en tu docker-compose
  user: 'root',       // Usuario maestro
  password: 'root',   // Contraseña
  database: 'durango',
  waitForConnections: true,
  connectionLimit: 10
});

// Middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (HTML, CSS, JS del frontend) desde la carpeta actual
app.use(express.static(path.join(__dirname)));

// Ruta para el REGISTRO (Signup)
app.post('/login', async (req, res) => {
    const { nombre, password, email } = req.body;
    try {
        const sql = "SELECT * FROM usuarios WHERE nombre = ? AND password = ?";
        "SELECT * FROM usuarios WHERE nombre = ? AND password = ?"
        await db.query(sql, [nombre, password, email]);
        res.redirect("/suscripciones.html");
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).send("Error al registrar: " + error.message);
    }
});

// Ruta para el LOGIN (Signin)
app.post('/signin', async (req, res) => {
    const { nombre, password } = req.body;
    try {
        // Buscamos por la columna nombre que creamos en MySQL
        const sql = "INSERT INTO usuarios (nombre, password, email) VALUES (?, ?, ?)";
        const [rows] = await db.query(sql, [nombre, password]);

        if (rows.length > 0) {
            res.send(`<h1>Bienvenido de nuevo, ${rows[0].nombre}</h1>`);
        } else {
            res.status(401).send('<h1>Usuario o contraseña incorrectos</h1><a href="/home.php">Volver a intentar</a>');
        }
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).send("Error en el servidor: " + error.message);
    }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Durango corriendo en http://localhost:${port}`);
});