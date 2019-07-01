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
$tel=corectez($_POST["tel"]);
$date_1=corectez($_POST["date_1"]);
$date_2=corectez($_POST["date_2"]);
$car=corectez($_POST["car"]);
// $scaun=corectez($_POST["scaun"]);
// $GPS=corectez($_POST["GPS"]);
$comments=corectez($_POST["comments"]);



$cda = "INSERT INTO form (name, tel, date_1, date_2, car, comments)VALUES (?, ?, ?, ?, ?, ?)";
$stmt = mysqli_prepare($cnx, $cda);
mysqli_stmt_bind_param($stmt, 'ssssss', $name, $tel, $date_1, $date_2, $car, $comments);
mysqli_stmt_execute($stmt) or die (mysqli_error($ncx));

mysqli_stmt_close($stmt);
mysqli_close($cnx);
$raspuns = [];
$raspuns['name'] = $name;
echo json_encode($raspuns);
?>