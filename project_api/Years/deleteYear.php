<?php
header("Content-Type: application/json");
require_once '../dbconnection.php';

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data["year_id"]))  {
    echo json_encode(["success" => false, "message" => "Missing year id"]);
    exit;
    
}

try {
    $check = $connection->prepare("SELECT COUNT(*) FROM semester_tbl WHERE year_id = ?");
    $check->execute([$data["year_id"]]);
    if ($check->fetchColumn() > 0) {
        echo json_encode(["success" => false, "message" => "Cannot delete: semesters exist under this year"]);
        exit;
    }

    $sql = "DELETE FROM year_tbl WHERE year_id = ?";
    $stmt = $connection->prepare($sql);
    $stmt->execute([$data["year_id"]]);

    echo json_encode(["success" => true, "message" => "Year deleted successfully"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}

?>

 