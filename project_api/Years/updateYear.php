<?php
header("Content-Type: application/json");
require_once '../dbconnection.php';

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data["year_id"]) || empty($data["year_from"]) || empty($data["year_to"])) {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
}

try {
    $sql = "UPDATE year_tbl SET year_from = ?, year_to = ? WHERE year_id = ?";
    $stmt = $connection->prepare($sql);
     $stmt->execute([$data["year_from"], $data["year_to"], $data["year_id"]]);

    echo json_encode(["success" => true, "message" => "Year updated successfully"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>