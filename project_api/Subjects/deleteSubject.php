<?php
header("Content-Type: application/json");
require_once '../dbconnection.php';

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data["subject_id"]))  {
    echo json_encode(["success" => false, "message" => "Missing subject id"]);
    exit;
    
}

try {
    $check = $connection->prepare("SELECT COUNT(*) FROM enrollment_tbl WHERE subject_id = ?");
    $check->execute([$data["subject_id"]]);
    if ($check->fetchColumn() > 0) {
        echo json_encode(["success" => false, "message" => "Cannot delete: students are enrolled in this subject"]);
        exit;
    }

    $sql = "DELETE FROM subject_tbl WHERE subject_id = ?";
    $stmt = $connection->prepare($sql);
    $stmt->execute([$data["subject_id"]]);

    echo json_encode(["success" => true, "message" => "Subject deleted successfully"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}

?>

 