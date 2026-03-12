const mysql = require('mysql2/promise');

async function sembrar() {
    const db = await mysql.createConnection({
        host: 'localhost',
        port: 3307,
        user: 'root',
        password: 'root',
        database: 'durango'
    });

    console.log("Iniciando carga masiva...");
    for (let i = 0; i < 5000; i++) { 
        await db.execute(
            "INSERT INTO usuarios (nombre, password, email) VALUES (?, ?, ?)",
            [`Usuario${i}`, `pass${i}`, `test${i}@durango.com`]
        );
    }
    console.log("¡Carga completada!");
    await db.end();
}
sembrar();
