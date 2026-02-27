<?php
// suscripciones.php
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DURANGO - Suscripciones</title>
    <link rel="stylesheet" href="style.css">
</head>
<body class="dashboard-body">
<?php include 'sidebar.php'; ?>
   <main class="dashboard-content">
    <header class="content-header">
        <h1>Planes Disponibles</h1>
        <p>Selecciona el nivel de protección que necesitas contratar.</p>
    </header>

    <div class="plans-container">
        <div class="plan-card">
            <h3>Plan Básico</h3>
            <p class="plan-price">$299<span class="price-period">/mes</span></p>
            <ul class="plan-features">
                <li>2 Equipos Monitoreados</li>
                <li>Soporte Técnico 8/5</li>
            </ul>
            <button class="btn-minimal">Contratar Ahora</button>
        </div>

        <div class="plan-card active-plan-card">
            <h3>Plan Pro</h3>
            <p class="plan-price">$599<span class="price-period">/mes</span></p>
            <ul class="plan-features">
                <li>10 Equipos Monitoreados</li>
                <li>Soporte Técnico 24/7</li>
            </ul>
            <button class="btn-minimal">Contratar Ahora</button>
        </div>
    </div>
</main>

</body>
</html>