<?php
header("Content-Type: application/json");
require_once '../dbconnection.php';

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data["program_id"]) || empty($data["program_name"]) || empty($data["ins_id"])) {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
}

try {
    $sql = "INSERT INTO program_tbl (program_id, program_name, ins_id) 
            VALUES (?, ?, ?)";
    $stmt = $connection->prepare($sql);
    $stmt->execute([$data["program_id"], $data["program_name"], $data["ins_id"]]);

    echo json_encode(["success" => true, "message" => "Program added successfully"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
