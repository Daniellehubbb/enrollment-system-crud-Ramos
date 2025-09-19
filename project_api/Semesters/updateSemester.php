<?php
header("Content-Type: application/json");
require_once '../dbconnection.php';

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data["sem_id"]) || empty($data["sem_name"]) || empty($data["year_id"])) {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
}

try {
    $sql = "UPDATE semester_tbl SET sem_name = ?, year_id = ? WHERE sem_id = ?";
    $stmt = $connection->prepare($sql);
    $stmt->execute([$data["sem_name"], $data["year_id"], $data["sem_id"]]);

    echo json_encode(["success" => true, "message" => "Semester updated successfully"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
