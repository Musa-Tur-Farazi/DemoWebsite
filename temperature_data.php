<?php

$mysqli = new mysqli("localhost", "root", "", "mydatabase");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$result = $mysqli->query("SELECT * FROM temperature_data ORDER BY timestamp DESC LIMIT 10");

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

header('Content-Type: application/json');
echo json_encode($data);

$mysqli->close();
?>
