<?php
header("Content-Type: application/json");
require_once '../dbconnection.php';

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data["enroll_id"]) || empty($data["stud_id"]) || empty($data["subject_id"])) {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
}

try {
    $sql = "INSERT INTO enrollment_tbl (enroll_id, stud_id, subject_id) 
            VALUES (?, ?, ?)";
    $stmt = $connection->prepare($sql);
    $stmt->execute([$data["enroll_id"], $data["stud_id"], $data["subject_id"]]);

    echo json_encode(["success" => true, "message" => "Student enrolled successfully"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
