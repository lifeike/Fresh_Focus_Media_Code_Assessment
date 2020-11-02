<?php
//declare page header
header("content-type:text/html;charset=utf-8");
//import database connection file
require_once ("common.php");



//check if network reqeust is true
if(isset($_GET["category"]) && isset($_GET["part"]) && isset($_GET["product"]) && isset($_GET['quantity'])){
	//get "get" value
	$category = $_GET["category"];
	$part = $_GET["part"];
	$product = $_GET['product'];
	$quantity = $_GET['quantity'];
	//create sql for location
	$sql = "select location from inventory where category='{$category}' and part='{$part}' and name='{$product}' and quantity>={$quantity}";
	//execute sql clause
	$data = $pdo->query($sql)->fetchAll();
	//convert to json object back to front-end
	echo json_encode($data);

}else if(isset($_GET["category"]) && isset($_GET["part"]) && isset($_GET["product"])){
	$category = $_GET["category"];
	$part = $_GET["part"];
	$product = $_GET['product'];
	$please = $_GET['please'];
	//create sql for please
	$sql = "select {$please} from inventory where category='{$category}' and part='{$part}' and name='{$product}' group by {$please}";
	$data = $pdo->query($sql)->fetchAll();
	echo json_encode($data);

}else if(isset($_GET["category"])&& isset($_GET["part"])){
	$category = $_GET["category"];
	$part = $_GET["part"];
	//create sql for product
	$sql = "select name from inventory where category='{$category}' and part='{$part}' group by name";
	$data = $pdo->query($sql)->fetchAll();
	echo json_encode($data);

}else if(isset($_GET["category"])){

	$category = $_GET["category"];
	//create sql for part#
	$sql = "select part from inventory where category='{$category}' group by part";
	$data = $pdo->query($sql)->fetchAll();
	echo json_encode($data);

}else{
	//create sql for category
	$sql = "select category from inventory group by category";
	$data = $pdo->query($sql)->fetchAll();
	echo json_encode($data);
}

//close pdo
$pdo = null;




