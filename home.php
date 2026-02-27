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
</head>
<body class="dashboard-body">
    <?php include 'sidebar.php'; ?>

    <main class="dashboard-content">
        <header class="content-header">
            <h1>Panel de Control</h1>
            <p>Bienvenida de nuevo a DURANGO.</p><br>
        </header>

        <section class="status-summary">
           <div class="sub-status-card">
    <div class="status-text">
        <h3>Tu suscripción actual</h3>
        <p>Plan Profesional: <span class="active-status">ACTIVO</span></p>
    </div>
    <a href="suscripciones.php" class="btn-minimal small-btn">Mejorar Plan</a>
</div>
        </section>
    </main>
</body>
</html>