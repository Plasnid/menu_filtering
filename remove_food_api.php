<?php 
require_once("./connect_pdo.php");
// Read the raw JSON data from the request body
$jsonData = file_get_contents('php://input');

// Decode the JSON string into a PHP object or associative array
$data = json_decode($jsonData, true); // true for associative array

// Access the data
$item_id = $data['food_id'];


$query = "DELETE
FROM meals
WHERE food_id = $item_id";
$stmt = $dbo->query($query);

//echo json_encode(['status' => 'success', 'message' => " $stmt"]);
echo json_encode(['status' => 'success', 'message' => " $item_id item deleted"]);
?>