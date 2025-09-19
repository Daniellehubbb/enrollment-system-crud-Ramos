<?php
header("Content-Type: application/json");
require_once '../dbconnection.php';

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data["year_id"]) || empty($data["year_from"]) || empty($data["year_to"])) {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
}

try {
    $sql = "INSERT INTO year_tbl (year_id, year_from, year_to) 
            VALUES (?, ?, ?)";
    $stmt = $connection->prepare($sql);
    $stmt->execute([$data["year_id"], $data["year_from"], $data["year_to"]]);

    echo json_encode(["success" => true, "message" => "Year added successfully"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>