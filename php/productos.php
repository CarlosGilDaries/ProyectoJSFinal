<?php
require 'conexion.php';

try {
    $stmt = $connection->query("SELECT idProducto AS id, nombre, precio, foto FROM productos");
    $datos = $stmt->fetchAll();
} catch (PDOException $e) {
    die(json_encode(["error" => "Error en la consulta: " . $e->getMessage()]));
}

// Enviar datos como JSON
header('Content-Type: application/json');
echo json_encode($datos);
?>

