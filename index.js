const express = require('express');
const session = require('express-session');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));
app.use(session({
    secret: 'durango_key',
    resave: false,
    saveUninitialized: true
})); 
const db = mysql.createPool({
    host: 'durango_db', 
    user: 'root',
    password: 'root',
    database: 'durango',
    waitForConnections: true,
    connectionLimit: 10
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// LOGIN
app.post('/login', async (req, res) => {
    const { username, password } = req.body; // 'username' debe coincidir con el 'name' del HTML
    try {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE nombre = ? AND password = ?', [username, password]);
        
        if (rows.length > 0) {
            req.session.usuarioNombre = username; 
            res.redirect('/home.html');
        } else {
            res.send("<script>alert('Usuario o contraseña incorrectos'); window.location='/index.html';</script>");
        }
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).send("Error en el servidor: " + error.message);
    }
});

// SIGNIN 
app.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [exist] = await db.query('SELECT * FROM usuarios WHERE nombre = ?', [username]);
        if (exist.length > 0) return res.send("<script>alert('El usuario ya existe'); window.location='/signin.html';</script>");
        
        await db.query('INSERT INTO usuarios (nombre, password) VALUES (?, ?)', [username, password]);
        res.send("<script>alert('Registro exitoso'); window.location='/index.html';</script>");
    } catch (error) {
        res.status(500).send("Error al registrar: " + error.message);
    }
});

// API para obtener el plan en el Home
app.get('/api/plan-actual', async (req, res) => {
    if (!req.session.usuarioNombre) return res.json({ plan: 'Invitado' });
    try {
        const [rows] = await db.query('SELECT plan FROM usuarios WHERE nombre = ?', [req.session.usuarioNombre]);
        res.json({ plan: rows[0]?.plan || 'Ninguno' });
    } catch (error) {
        res.status(500).json({ error: 'Error de BD' });
    }
});
app.post('/contratar', async (req, res) => {
    const { plan } = req.body;
    const usuario = req.session.usuarioNombre; // El nombre que guardamos al hacer login

    if (!usuario) {
        return res.send("<script>alert('Debes iniciar sesión primero'); window.location='/index.html';</script>");
    }

    try {
        // Actualizamos el plan y el estatus a Activo
        await db.query(
            "UPDATE usuarios SET plan = ?, plan_estatus = 'Activo' WHERE nombre = ?", 
            [plan, usuario]
        );
        
        console.log(`✅ Plan ${plan} activado para: ${usuario}`);
        // Redirigimos al home para que vea el cambio
        res.redirect('/home.html'); 
    } catch (error) {
        console.error("Error al contratar:", error);
        res.status(500).send("Error en el servidor al procesar el plan");
    }
});
// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor Durango corriendo en http://localhost:${port}`);
});