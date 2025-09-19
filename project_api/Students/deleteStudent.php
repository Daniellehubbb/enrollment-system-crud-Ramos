<?php
header("Content-Type: application/json");
require_once '../dbconnection.php';

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data["stud_id"]))  {
    echo json_encode(["success" => false, "message" => "Missing student id"]);
    exit;
    
}

try {
    $sql = "DELETE FROM student_tbl WHERE stud_id = ?";
    $stmt = $connection->prepare($sql);
    $stmt->execute([$data["stud_id"]]);

    echo json_encode(["success" => true, "message" => "Student deleted successfully"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>

 