<?php
	session_start();

		
   function corectez($sir) {
	 $sir = trim($sir);
	 $sir = stripslashes($sir);
	 $sir = htmlspecialchars($sir);
	 return $sir;
   }

   // preiau valorile din campurile formularului (numeletau, parolata)
   $nume = corectez($_POST["numeletau"]);
   $parola = corectez($_POST["parolata"]);
	
   include("conn.php");
	
   $cda = "SELECT nume, parola FROM admin WHERE nume = '$nume' and parola = '$parola'";

   $raspuns = [];
   $raspuns['nume'] = $nume;

	  
   if ($rez=mysqli_query($cnx,$cda)) {
	$rowcount=mysqli_num_rows($rez);
	  
	if ($rowcount != 0) {
	    $raspuns['autentificat'] = 'da';
	    $_SESSION['conectat'] = true;
	} else {
	   $raspuns['autentificat'] = 'nu';
      }
   }
	   
   echo json_encode($raspuns);
?>

