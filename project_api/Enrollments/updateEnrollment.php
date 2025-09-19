<?php
header("Content-Type: application/json");
require_once '../dbconnection.php';

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data["enroll_id"]) || empty($data["stud_id"]) || empty($data["subject_id"]) || empty($data["date_enrolled"])) {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
}

try {
    $sql = "UPDATE enrollment_tbl SET stud_id = ?, subject_id = ?, date_enrolled = ? WHERE enroll_id = ?";
    $stmt = $connection->prepare($sql);
    $stmt->execute([$data["stud_id"], $data["subject_id"], $data["date_enrolled"], $data["enroll_id"]]);

    echo json_encode(["success" => true, "message" => "Enrollment updated successfully"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
