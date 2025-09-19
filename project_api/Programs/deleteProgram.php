<?php
header("Content-Type: application/json");
require_once '../dbconnection.php';

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data["program_id"]))  {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
    
}

try {
    $check = $connection->prepare("SELECT COUNT(*) FROM student_tbl WHERE program_id = ?");
    $check->execute([$data["program_id"]]);
    if ($check->fetchColumn() > 0) {
        echo json_encode(["success" => false, "message" => "Cannot delete: students are enrolled in this program"]);
        exit;
    }

    $sql = "DELETE FROM program_tbl WHERE program_id = ?";
    $stmt = $connection->prepare($sql);
    $stmt->execute([$data["program_id"]]);

    echo json_encode(["success" => true, "message" => "Program deleted successfully"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}

?>

 