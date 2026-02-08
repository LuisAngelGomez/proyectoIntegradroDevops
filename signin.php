<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = $_POST['username'] ?? null;
    $password = $_POST['password'] ?? null;

    if ($usuario && $password) {
        try {
            // Verificamos si el usuario ya existe para evitar duplicados
            $check = $conexion->prepare("SELECT COUNT(*) FROM usuarios WHERE username = :u");
            $check->execute([':u' => $usuario]);
            
            if ($check->fetchColumn() > 0) {
                echo "<script>alert('El usuario ya existe. Intenta con otro.'); window.location='signup.html';</script>";
            } else {
                // se inserta el nuevo usuario
                $sql = "INSERT INTO usuarios (username, password) VALUES (:u, :p)";
                $stmt = $conexion->prepare($sql);
                $stmt->execute([':u' => $usuario, ':p' => $password]);
                
                // Mensaje de éxito y redirección al login
                echo "<script>alert('Registro exitoso. Ya puedes iniciar sesión.'); window.location='index.html';</script>";
            }
        } catch (PDOException $e) {
            echo "Error en la base de datos: " . $e->getMessage();
        }
    } else {
        echo "Por favor llena todos los campos.";
    }
}
?>