<?php
header('Content-Type:application/json');
require_once '../dbconnection.php';
    
try {
    $stmt = $connection->query("SELECT stud_id, first_name, middle_name, last_name, program_id, ALLOWANCE
    FROM student_tbl");
    $students = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["success" => true, "data" => $students]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>