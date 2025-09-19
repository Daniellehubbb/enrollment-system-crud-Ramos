<?php
header("Content-Type: application/json");
require_once '../dbconnection.php';

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data["sem_id"]) || empty($data["sem_name"]) || empty($data["year_id"])) {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
}

try {
    $sql = "INSERT INTO semester_tbl (sem_id, sem_name, year_id) 
            VALUES (?, ?, ?)";
    $stmt = $connection->prepare($sql);
    $stmt->execute([$data["sem_id"], $data["sem_name"], $data["year_id"]]);

    echo json_encode(["success" => true, "message" => "Semester added successfully"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
