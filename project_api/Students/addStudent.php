<?php
header("Content-Type: application/json");
require_once '../dbconnection.php';

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data["stud_id"]) || empty($data["first_name"]) || !isset($data["middle_name"]) || empty($data["last_name"]) || empty($data["program_id"]) || !isset($data["allowance"])) {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
    
}

try {
    $sql = "INSERT INTO student_tbl (stud_id, first_name, middle_name, last_name, program_id, allowance) 
            VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $connection->prepare($sql);

    $stmt->execute([$data["stud_id"], $data["first_name"], $data["middle_name"], $data["last_name"], $data["program_id"], $data["allowance"]]);

    echo json_encode(["success" => true, "message" => "Student added successfully"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>

 