<?php
header("Content-Type: application/json");
require_once '../dbconnection.php';

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data["program_id"]) || empty($data["program_name"]) || empty($data["ins_id"])) {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
}

try {
    $sql = "UPDATE program_tbl SET program_name = ?, ins_id = ? WHERE program_id = ?";
    $stmt = $connection->prepare($sql);
    $stmt->execute([$data["program_name"], $data["ins_id"], $data["program_id"]]);

    echo json_encode(["success" => true, "message" => "Program updated successfully"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}

?>

 