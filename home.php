<?php
// home.php
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DURANGO - Dashboard</title>
    <link rel="stylesheet" href="style.css">
    <style>
        /* Estilos rápidos para el Home */
        .dashboard-container {
            color: white;
            text-align: center;
            padding: 50px;
        }
        .nav-menu {
            margin-top: 30px;
            display: flex;
            gap: 20px;
            justify-content: center;
        }
    </style>
</head>
<body>
    <div class="dashboard-container">
        <h1>Bienvenido al Panel de DURANGO</h1>
        <p>Sistema de Modelación y Gestión de Equipos</p>
        
        <div class="nav-menu">
            <button class="btn-login">Registrar Equipo</button>
            <button class="btn-login">Solicitar Soporte</button>
            <a href="index.html" style="color: white;">Cerrar Sesión</a>
        </div>
    </div>
</body>
</html>