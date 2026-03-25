<?php 
require_once("./connect_pdo.php");

$jsonData = file_get_contents('php://input');

// Check if data was received (optional but recommended)
if (empty($jsonData)) {
    http_response_code(400); // Bad Request
    die("No JSON data received.");
}
// Decode the JSON string into a PHP object or associative array
$data = json_decode($jsonData, true); // true for associative array

// Access the data
$food_id = $data['food_id'];
$food_name = $data['food_name'];
$food_category = $data['food_category'];
$food_calories = $data['food_calories'];
$food_price = $data['food_price'];

//$query = "INSERT INTO menu (food_id, food_name, food_calories, food_price) VALUES (NULL, '$food_name', '$food_calories', '$food_price')";
$query = "UPDATE meals 
SET food_name = '$food_name', 
food_category = '$food_category',
food_calories = '$food_calories', 
food_price = '$food_price' 
WHERE meals.food_id = '$food_id'";

//echo $query;

$stmt = $dbo->query($query);

echo json_encode(['status' => 'success', 'message' => "$query"]);
 
?>
