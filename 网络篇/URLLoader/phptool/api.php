<?php

    header("Access-Control-Allow-Origin: *");
	header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	
	//1.url 编码方式接收数据
 	//$name = isset($_POST['name']) ? $_POST['name'] : '' ; 
  	//$pwd =  isset($_POST['pwd']) ? $_POST['pwd'] : '' ; 
	
	//2.字符串json接收方式
	$jsonStr = file_get_contents("php://input");
	$postData = json_decode($jsonStr,true);
    $name = $postData['name']; 
	$pwd = $postData['pwd'];  
  
	if(empty($name) || empty($pwd))
	{
		$data = array("code"=>0,"msg"=>"var error");
		echo json_encode($data);
		return;
	}   
    
	if($name == "egret" && $pwd == "123456")
	{
		$data = array("code"=>1,"msg"=>"success");
		echo json_encode($data);
		return;
	}
	
	$data = array("code"=>0,"msg"=>"error");
    echo json_encode($data);
	   

?>