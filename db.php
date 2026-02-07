<?php
// db.php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "durango"; // Asegúrate de que este nombre sea igual al de phpMyAdmin

try {
    $conexion = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}
?>