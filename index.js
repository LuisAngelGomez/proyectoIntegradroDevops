const express = require('express');
const path = require('path');
const db = require('./db');
const app = express();

// Configuración para leer datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir tus archivos estáticos (CSS, Imágenes)
app.use(express.static(path.join(__dirname)));

// Ruta principal (Carga tu index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para el Login (Lógica que estaba en login.php)
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE nombre = ? AND password = ?', [username, password]);
    if (rows.length > 0) {
      res.send(`<h1>Bienvenido ${username}, acceso concedido.</h1>`);
    } else {
      res.status(401).send('Credenciales incorrectas');
    }
  } catch (error) {
    res.status(500).send('Error en el servidor: ' + error.message);
  }
});

// Ruta para el Registro (Equivalente a tu signup.php)
app.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.send("Por favor llena todos los campos.");
    }

    try {
        // 1. Verificamos si el usuario ya existe
        const [rows] = await db.query('SELECT COUNT(*) as total FROM usuarios WHERE nombre = ?', [username]);
        
        if (rows[0].total > 0) {
            return res.send("<script>alert('El usuario ya existe. Intenta con otro.'); window.location='/signup.html';</script>");
        }

        // 2. Insertamos el nuevo usuario
        await db.query('INSERT INTO usuarios (nombre, password) VALUES (?, ?)', [username, password]);
        
        // Mensaje de éxito y redirección
        res.send("<script>alert('Registro exitoso. Ya puedes iniciar sesión.'); window.location='/';</script>");

    } catch (error) {
        console.error(error);
        res.status(500).send("Error en la base de datos: " + error.message);
    }
});

app.listen(3000, () => {
  console.log('Servidor Durango corriendo en http://localhost:3000');
});