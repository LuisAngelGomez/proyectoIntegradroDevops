<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verificamos que los datos lleguen del HTML
    $usuario = $_POST['username'] ?? null;
    $password = $_POST['password'] ?? null;

    if ($usuario && $password) {
        try {
            // Ajusta "usuarios", "nombre" y "password" a los nombres de tu tabla
            $sql = "INSERT INTO usuarios (username, password) VALUES (:u, :p)";
            $stmt = $conexion->prepare($sql);
            $stmt->execute([':u' => $usuario, ':p' => $password]);
            
            echo "Registro exitoso. ¡Bienvenido $usuario!";
        } catch (PDOException $e) {
            // Esto atrapará errores de UNIQUE o NOT NULL
            echo "Error en la base de datos: " . $e->getMessage();
        }
    } else {
        echo "Por favor llena todos los campos.";
    }
}
?>