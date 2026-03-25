<?php 
require_once("./connect_pdo.php");
// Read the raw JSON data from the request body
$jsonData = file_get_contents('php://input');

// Decode the JSON string into a PHP object or associative array
$data = json_decode($jsonData, true); // true for associative array

// Access the data
$item_id = $data['food_id'];
//$item_id = 5;
//echo($item_id);

$menu_output = array();
$query = "SELECT *
FROM meals
WHERE food_id = $item_id";
//$stmt = $dbo->query($query);
//var_dump($stmt);

foreach ($dbo->query($query) as $row) {
    $row_info = array(
        "food_id"=>stripslashes($row["food_id"]),
        "food_name"=>stripslashes($row["food_name"]),
        "food_category"=>stripslashes($row["food_category"]),
        "food_price"=>stripslashes($row["food_price"]),
        "food_calories"=>stripslashes($row["food_calories"])
    );
    //echo($row_info);
    //var_dump($row_info);
    array_push($menu_output, $row_info);    
};
$json = json_encode($menu_output);
echo($json);



?>