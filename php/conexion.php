<?php
$dsn = 'mysql:host=localhost;dbname=virtualmarket;charset=utf8';
$user = 'root';
$pass = 'olakease10';

try {
    $connection = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // Activa errores en PDO
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC // Obtiene datos como array asociativo
    ]);
} catch (PDOException $e) {
    die(json_encode(["error" => "Fallo durante la conexión a la BD: " . $e->getMessage()]));
}
?>
