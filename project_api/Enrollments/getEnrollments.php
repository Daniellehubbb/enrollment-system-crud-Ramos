<?php
header('Content-Type:application/json');
require_once '../dbconnection.php';
    
try {
    $stmt = $connection->query("SELECT e.enroll_id, s.first_name, s.middle_name, s.last_name, p.program_name,
       subj.subject_name, sem.sem_name, y.year_from, y.year_to, e.date_enrolled
FROM enrollment_tbl e
JOIN student_tbl s ON e.stud_id = s.stud_id
JOIN program_tbl p ON s.program_id = p.program_id
JOIN subject_tbl subj ON e.subject_id = subj.subject_id
JOIN semester_tbl sem ON subj.sem_id = sem.sem_id
JOIN year_tbl y ON sem.year_id = y.year_id");
    $enrollment = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["success" => true, "data" => $enrollment]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>