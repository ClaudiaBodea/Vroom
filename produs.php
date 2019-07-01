<?php 
	include ("conn.php");  
	$id = $_POST['id_produs']; 

	$cda= "SELECT * from produse WHERE id_produs = $id";
	$rez=mysqli_query($cnx,$cda) ;
	  // Se preiau liniile pe rand
	  $linie = mysqli_fetch_assoc($rez) ;
	/* Eliberez memoria ocupata de multimea de selectie */
	mysqli_free_result($rez);

	/* Inchid conexiunea cu serverul MySQL */
	mysqli_close($cnx);
	echo json_encode($linie);
?>
