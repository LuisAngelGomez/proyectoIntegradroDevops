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


app.use(express.static(path.join(__dirname)));

// Ruta para el login
app.post('/login', async (req, res) => {
    const { nombre, password } = req.body;
    
    try {
     
        const sql = "SELECT * FROM usuarios WHERE nombre = ? AND password = ?";
        const [rows] = await db.query(sql, [nombre, password]);

        if (rows.length > 0) {
            res.redirect("/home.html");
        } else {
            res.status(401).send("<script>alert('Usuario o contraseña incorrectos'); window.location='/';</script>");
        }
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).send("Error en el servidor");
    }
});

// Ruta para el signup
app.post('/signin', async (req, res) => {
    const { nombre, password, email } = req.body;
    
    try {
   
        const sql = "INSERT INTO usuarios (nombre, password, email) VALUES (?, ?, ?)";
        await db.query(sql, [nombre, password, email]);
        
     
        res.send("<script>alert('¡Cuenta creada exitosamente!'); window.location='/';</script>");
    } catch (error) {
        console.error("Error en registro:", error);
        res.status(500).send("Error al registrar: " + error.message);
    }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Durango corriendo en http://localhost:${port}`);
});
app.post('/contratar', async (req, res) => {
    const { plan } = req.body;

    const usuario = "estela"; 

    try {

        await db.query("UPDATE usuarios SET plan = ?, plan_estatus = 'Activo' WHERE nombre = ?", [plan, usuario]);
        
        // se redirige al home pasando los datos para que el script los lea
        res.redirect(`/home.html?plan=${plan}&status=Activo`);
    } catch (error) {
        res.status(500).send("Error al actualizar suscripción: " + error.message);
    }
});

// index.js
app.get('/api/plan-actual', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT plan FROM usuarios ORDER BY id DESC LIMIT 1");
        res.json({ plan: rows[0]?.plan || 'Ninguno' });
    } catch (err) {
        res.status(500).json({ error: "Error de BD" });
    }
});