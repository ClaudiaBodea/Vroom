<?php
	include 'conn.php'; 

	function corectez($sir) {
		$sir = trim($sir);
		$sir = stripslashes($sir);
		$sir = htmlspecialchars($sir);
		return $sir;
	}

	print_r($_POST);

$name=corectez($_POST["name"]);
$email=corectez($_POST["email"]);
$comments=corectez($_POST["comments"]);


// $cda = "INSERT INTO contact (name, email, comments) VALUES (?, ?, ?)"; 
$stmt = mysqli_prepare($cnx, "INSERT INTO contact (name, email, comments) VALUES (?, ?, ?)");
mysqli_stmt_bind_param($stmt, 'sss', $name, $email, $comments); 
mysqli_stmt_execute($stmt) or die (mysqli_error($ncx));

mysqli_stmt_close($stmt);
mysqli_close($cnx);
$raspuns = [];
$raspuns['name'] = $name; 
echo json_encode($raspuns);
?>