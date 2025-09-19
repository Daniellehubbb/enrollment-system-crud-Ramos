<?php
header("Content-Type: application/json");
require_once '../dbconnection.php';

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data["stud_id"]) || empty($data["first_name"]) || !isset($data["middle_name"]) || empty($data["last_name"]) || empty($data["program_id"]) || !isset($data["allowance"])) {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
    
}

try {
    $sql = "UPDATE student_tbl 
            SET first_name = ?, middle_name = ?, last_name = ?, program_id = ?, ALLOWANCE = ? 
            WHERE stud_id = ?";
    $stmt = $connection->prepare($sql);
    $stmt->execute([$data["first_name"], $data["middle_name"], $data["last_name"], $data["program_id"], $data["allowance"], $data["stud_id"]]);

    echo json_encode(["success" => true, "message" => "Student updated successfully"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}

?>

 