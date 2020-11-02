<?php
// page header
header("content-type:text/html;charset=utf-8");
//load database config file generating global varible
$GLOBALS['config'] = require_once("../config.php");
//database config info
$dsn = $GLOBALS['config']['db_type'].":host:".$GLOBALS['config']['db_host'].";port=".$GLOBALS['config']['db_port'].";dbname=".$GLOBALS['config']['db_name'].";charset=".$GLOBALS['config']['charset'];
//create pdo object
$pdo = new PDO($dsn,$GLOBALS['config']['db_user'],$GLOBALS['config']['db_pass']);
// clear global varible config
$GLOBALS['config'] = "";
