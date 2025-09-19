<?php
header('Content-Type:application/json');
require_once '../dbconnection.php';
    
try {
    $stmt = $connection->query("SELECT program_id, program_name, ins_id 
    FROM program_tbl");
    $programs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["success" => true, "data" => $programs]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>