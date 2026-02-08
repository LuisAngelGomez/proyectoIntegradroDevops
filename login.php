<?php
require_once 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = $_POST['username'] ?? null;
    $password = $_POST['password'] ?? null;

    if ($usuario && $password) {
        try {
            // Buscamos al usuario
            $sql = "SELECT * FROM usuarios WHERE username = :u AND password = :p";
            $stmt = $conexion->prepare($sql);
            $stmt->execute([':u' => $usuario, ':p' => $password]);
            
            $user = $stmt->fetch();

            if ($user) {
                header("Location: home.php");
                exit(); 
            } else {
                echo "Usuario o contraseña incorrectos.";
            }
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }
}
?>