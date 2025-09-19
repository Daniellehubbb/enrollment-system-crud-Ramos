<?php
header("Content-Type: application/json");
require_once '../dbconnection.php';

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data["subject_id"]) || empty($data["subject_name"]) || empty($data["sem_id"])) {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
}

try {
    $sql = "INSERT INTO subject_tbl (subject_id, subject_name, sem_id) 
            VALUES (?, ?, ?)";
    $stmt = $connection->prepare($sql);
    $stmt->execute([$data["subject_id"], $data["subject_name"], $data["sem_id"]]);

    echo json_encode(["success" => true, "message" => "Subject added successfully"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
