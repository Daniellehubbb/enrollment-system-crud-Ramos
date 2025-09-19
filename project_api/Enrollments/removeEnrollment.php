<?php
header("Content-Type: application/json");
require_once '../dbconnection.php';

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data["enroll_id"])) {
    echo json_encode(["success" => false, "message" => "Missing enroll id"]);
    exit;
}

try {
    $sql = "DELETE FROM enrollment_tbl WHERE enroll_id = ?";
    $stmt = $connection->prepare($sql);
    $stmt->execute([$data["enroll_id"]]);

    echo json_encode(["success" => true, "message" => "Enrollment removed successfully"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}

?>
