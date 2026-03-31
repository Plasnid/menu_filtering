<?php 
require_once("./connect_pdo.php");
$menu_output = array();
$breakfast = array();
$budget_breakfast = array();
$query = "SELECT *
FROM meals
WHERE meals.food_category = 'Breakfast'
AND meals.food_price >= '2.00'
ORDER BY food_name";
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
    array_push($breakfast, $row_info);    
};
$menu_output["fullPrice"] = $breakfast;
//array_push($menu_output, $breakfast);

$budget_query = "SELECT *
FROM meals
WHERE meals.food_category = 'Breakfast'
AND meals.food_price < '2.00'
ORDER BY food_name";
foreach ($dbo->query($budget_query) as $row) {
    $row_info = array(
        "food_id"=>stripslashes($row["food_id"]),
        "food_name"=>stripslashes($row["food_name"]),
        "food_category"=>stripslashes($row["food_category"]),
        "food_price"=>stripslashes($row["food_price"]),
        "food_calories"=>stripslashes($row["food_calories"])
    );
    //echo($row_info);
    //var_dump($row_info);
    array_push($budget_breakfast, $row_info);    
};
//array_push($menu_output, $budget_breakfast);
$menu_output["budgetMenu"] = $budget_breakfast;
header('Content-type: application/json');
$json = json_encode($menu_output);
echo($json);
?>