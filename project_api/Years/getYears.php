<?php
header('Content-Type:application/json');
require_once '../dbconnection.php';
    
try {
    $stmt = $connection->query("SELECT * FROM year_tbl ORDER BY year_from ASC");
    $years = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["success" => true, "data" => $years]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>