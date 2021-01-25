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
	//1.给 app写接口时，要用 echo json_encode() 来返回数据，但是PHP自身调用却用 return json_encode();
	//rerurn是语言中函数或者方法所代表的值，跟变量一样，储存在内存中。return是给其他代码块一个指针或者引用。
	//而服务器与app（客户端）交互时，他们无法读取同一个内存系统，只能通过文本这样的方式来交换信息。
	//所以要echo一段文本（json）给客户端。
	//php惯用的输出流方式就是echo,如果你钟情于return输出，可以自创一门语言来实现。

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




