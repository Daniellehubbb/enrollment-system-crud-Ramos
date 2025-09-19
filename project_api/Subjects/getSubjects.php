<?php
header('Content-Type:application/json');
require_once '../dbconnection.php';
    
try {
    $stmt = $connection->query("SELECT subject_id, subject_name, sem_id
    FROM subject_tbl");
    $subjects = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["success" => true, "data" => $subjects]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>

