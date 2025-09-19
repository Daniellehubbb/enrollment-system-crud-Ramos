<?php
header("Content-Type: application/json");
require_once '../dbconnection.php';

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data["sem_id"]))  {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
    
}

try {
    $check = $connection->prepare("SELECT COUNT(*) FROM subject_tbl WHERE sem_id = ?");
    $check->execute([$data["sem_id"]]);
    if ($check->fetchColumn() > 0) {
        echo json_encode(["success" => false, "message" => "Cannot delete: subjects exist under this semester"]);
        exit;
    }

    $sql = "DELETE FROM semester_tbl WHERE sem_id = ?";
    $stmt = $connection->prepare($sql);
    $stmt->execute([$data["sem_id"]]);

    echo json_encode(["success" => true, "message" => "Semester deleted successfully"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}

?>

 